import './styles.css';
import apiService from './apiService';
import cardTemplate from './cardTemplate.hbs';
import gridSizerTemplate from './gridSizerTemplate.hbs';
import '@pnotify/core/dist/PNotify.css';
import { defaults } from '@pnotify/core';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

const refs = {
    body: document.querySelector('body'),
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    galleryWrap: document.querySelector('.gallery-wrap'),
    nextPageBtn: document.querySelector('button[name="load-more"]'),
    sentinel: document.querySelector('.sentinel'),
    modal: document.querySelector('.js-lightbox'),
    modalImage: document.querySelector('.lightbox__image'),
    modalInfo: document.querySelector('.lightbox__info'),
};

let indexCount = 0;

defaults.styling = 'material';
defaults.icons = 'material';
defaults.delay = 2000;

const options = {
    rootMargin: '200px',
    threshold: 1.0,
};

const onEntry = (entries, observer) => {
    entries.forEach(entry => {
        if (apiService.last_page) {
            return;
        }

        if (entry.isIntersecting) {
            createGalleryList();
        }
    });
};

const io = new IntersectionObserver(onEntry, options);

const masonryInstance = new Masonry(refs.gallery, {
    columnWidth: '.grid-sizer',
    percentPosition: true,
    stagger: 30,
    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
});

const createGalleryList = async() => {
    const images = await apiService.get();
    const markup = images
        .map(image => {
            image.index = indexCount;
            indexCount += 1;
            return cardTemplate(image);
        })
        .join('');

    const imageList = document.createElement('ul');
    imageList.innerHTML = markup;

    const imageListItems = imageList.querySelectorAll('li');

    refs.gallery.append(...imageListItems);

    const imagesLoadedInstance = imagesLoaded(refs.gallery);

    imagesLoadedInstance.on('progress', () => {
        masonryInstance.layout();
    });

    masonryInstance.appended(imageListItems);

    pnotifyMessage(1);
    if (apiService.last_page) {
        lastPage();
    }
};

refs.form.addEventListener('keydown', onQuery);

function onQuery(event) {
    apiService.query = event.target.value;

    if (event.key === 'Enter' && apiService.query !== '') {
        event.preventDefault();
        apiService.page = 1;
        indexCount = 0;
        apiService.last_page = false;
        refs.gallery.innerHTML = '';

        if (typeof refs.modalWrap === 'object') {
            removeModal();
        }
        cteateModal();

        refs.gallery.addEventListener('click', onGalleryClick);

        refs.modal.addEventListener('click', onModalClick);

        createGridSizer();

        createGalleryList();

        setTimeout(() => {
            io.observe(refs.sentinel);
        }, 1000);

        event.target.value = '';
    }
}

function createGridSizer() {
    const columnValue = [1, 2, 3];

    const markup = columnValue.map(li => gridSizerTemplate(li)).join('');

    const proxyEl = document.createElement('div');
    proxyEl.innerHTML = markup;

    const items = proxyEl.querySelectorAll('.grid-sizer');

    refs.gallery.append(...items);

    masonryInstance.appended(items);
}

function lastPage() {
    const proxyEl = document.createElement('p');
    proxyEl.classList.add('infinite-scroll-last');
    proxyEl.textContent = 'End of content. No more pages to load';
    refs.gallery.appendChild(proxyEl);
}

function pnotifyMessage(e) {
    if (e === 1) {
        const mySuccess =
            apiService.page === 2 || (apiService.page === 1 && apiService.last_page) ?
            success({
                text: `Yor ${apiService.query} loaded Success!`,
            }) :
            success({
                text: 'The Scrolling Success!',
            });
    }

    if (apiService.last_page) {
        success({
            text: 'End of content. No more pages to load',
        });
    }
}

function onGalleryClick(event) {
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    onModalOpen();
    addModalClass();
}

function onModalClick(event) {
    if (event.target.nodeName === 'BUTTON' || event.target.nodeName !== 'IMG') {
        removeModalClass();
        onModalClose();
    }
}

function listener(event) {
    if (event.code === 'ArrowLeft' && refs.modalImage.dataset.index > 0) {
        prevImageOnGallery();
    }
    if (
        event.code === 'ArrowRight' &&
        refs.modalImage.dataset.index < indexCount - 1
    ) {
        nextImageOnGallery();
    }
    if (event.code === 'Escape') {
        removeModalClass();
        onModalClose();
    }
}

function onModalOpen() {
    window.addEventListener('keydown', listener);
}

function onModalClose() {
    window.removeEventListener('keydown', listener);
}

function addModalClass() {
    const src = event.target.dataset.source;
    const index = event.target.dataset.index;
    refs.modal.classList.add('is-open');
    refs.modalImage.src = src;
    refs.modalImage.dataset.index = index;
    const images = refs.gallery.querySelectorAll('img');
    refs.modalInfo.textContent = `${Number(index) + 1}/${images.length}`;
}

function removeModalClass() {
    refs.modal.classList.remove('is-open');
    refs.modalImage.src = '/';
    refs.modalImage.dataset.index = '';
}

function prevImageOnGallery() {
    const index = Number(refs.modalImage.dataset.index);
    const images = refs.gallery.querySelectorAll('img');
    const prevImageSrc = images[index - 1].dataset.source;
    refs.modalImage.src = prevImageSrc;
    refs.modalImage.dataset.index = index - 1;
    refs.modalInfo.textContent = `${index}/${images.length}`;
}

function nextImageOnGallery() {
    const index = Number(refs.modalImage.dataset.index);
    const images = refs.gallery.querySelectorAll('img');
    const nextImageSrc = images[index + 1].dataset.source;
    refs.modalImage.src = nextImageSrc;
    refs.modalImage.dataset.index = index + 1;
    refs.modalInfo.textContent = `${index + 2}/${images.length}`;
}

function cteateModal() {
    refs.modalWrap = document.createElement('div');
    refs.modalWrap.classList.add('modalWrap');
    refs.modalWrap.innerHTML = `<div class="lightbox js-lightbox">
    <div class="lightbox__overlay"></div>

    <div class="lightbox__content">
        <img class="lightbox__image" src="/" alt="" />
    </div>

    <button type="button" class="lightbox__button" data-action="close-lightbox"></button>
    <span class="lightbox__info"></span>
</div>`;
    refs.body.appendChild(refs.modalWrap);
    refs.modal = document.querySelector('.js-lightbox');
    refs.modalImage = document.querySelector('.lightbox__image');
    refs.modalInfo = document.querySelector('.lightbox__info');
}

function removeModal() {
    refs.body.removeChild(refs.modalWrap);
}