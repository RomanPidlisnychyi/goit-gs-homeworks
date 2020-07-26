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
    galleryWrap: document.querySelector('.gallery-wrap'),
    gallery: document.querySelector('.gallery'),
    sentinel: document.querySelector('.sentinel'),
    modal: document.querySelector('.js-lightbox'),
    modalImage: document.querySelector('.lightbox__image'),
    modalInfo: document.querySelector('.lightbox__info'),
    closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
    prevImageBtn: document.querySelector('button[data-action="prev-image"]'),
    nextImageBtn: document.querySelector('button[data-action="next-image"]'),
};

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
    const markup = images.map(image => cardTemplate(image)).join('');

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
        apiService.last_page = false;
        refs.gallery.innerHTML = '';

        createGridSizer();

        createGalleryList();

        setTimeout(() => {
            io.observe(refs.sentinel);
        }, 1000);

        event.target.value = '';
    }
}

refs.gallery.addEventListener('click', onGalleryClick);

refs.modal.addEventListener('click', onModalClick);

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
    if (
        event.target === refs.closeModalBtn ||
        (event.target.nodeName !== 'IMG' && event.target.nodeName !== 'BUTTON')
    ) {
        removeModalClass();
        onModalClose();
    }
    if (event.target === refs.prevImageBtn) {
        prevImageOnGallery();
    }
    if (event.target === refs.nextImageBtn) {
        nextImageOnGallery();
    }
}

function listener(event) {
    if (event.code === 'ArrowLeft' && refs.modalImage.dataset.index > 0) {
        prevImageOnGallery();
    }

    if (
        event.code === 'ArrowRight' &&
        refs.modalImage.dataset.index < refs.gallery.children.length - 4
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
    const images = refs.gallery.querySelectorAll('img');
    let index;
    const src = event.target.dataset.source;
    refs.modal.classList.add('is-open');
    refs.modalImage.src = src;
    images.forEach((image, i) => {
        if (image.dataset.source === refs.modalImage.src) {
            index = i;
        }
    });

    refs.modalImage.dataset.index = index;
    refs.modalInfo.textContent = `${Number(index) + 1}/${images.length}`;
}

function removeModalClass() {
    refs.modal.classList.remove('is-open');
    refs.modalImage.src = '/';
    refs.modalImage.dataset.index = '';
}

function prevImageOnGallery() {
    refs.modalImage.src = '';
    refs.modalImage.classList.remove('slidein_prev');
    refs.modalImage.classList.remove('slidein_next');
    setTimeout(() => {
        refs.modalImage.classList.add('slidein_prev');
        const index = Number(refs.modalImage.dataset.index);
        const images = refs.gallery.querySelectorAll('img');
        const prevImageSrc = images[index - 1].dataset.source;
        refs.modalImage.src = prevImageSrc;
        refs.modalImage.dataset.index = index - 1;
        refs.modalInfo.textContent = `${index}/${images.length}`;
    }, 1);
}

function nextImageOnGallery() {
    refs.modalImage.src = '';
    refs.modalImage.classList.remove('slidein_next');
    refs.modalImage.classList.remove('slidein_prev');
    setTimeout(() => {
        refs.modalImage.classList.add('slidein_next');
        const index = Number(refs.modalImage.dataset.index);
        const images = refs.gallery.querySelectorAll('img');
        const nextImageSrc = images[index + 1].dataset.source;
        refs.modalImage.src = nextImageSrc;
        refs.modalImage.dataset.index = index + 1;
        refs.modalInfo.textContent = `${index + 2}/${images.length}`;
    }, 1);
}