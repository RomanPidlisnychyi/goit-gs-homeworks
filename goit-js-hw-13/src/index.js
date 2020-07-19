import './styles.css';
import apiService from './apiService';
import cardTemplate from './cardTemplate.hbs';
import gridSizerTemplate from './gridSizerTemplate.hbs';
import InfiniteScroll from 'infinite-scroll';
import '@pnotify/core/dist/PNotify.css';
import { defaults } from '@pnotify/core';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { data } from 'infinite-scroll/js/core';
import throttle from 'lodash.throttle';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const galleryWrap = document.querySelector('.gallery-wrap');

function getPath() {
    return `${apiService.proxy}${apiService.baseUrl}?key=${apiService.key}&q=${apiService.query}&page=${apiService.page}&per_page=${apiService.per_page}`;
}

const masonryInstance = new Masonry(gallery, {
    columnWidth: '.grid-sizer',
    percentPosition: true,
    stagger: 30,
    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
});

defaults.styling = 'material';
defaults.icons = 'material';
defaults.delay = 2000;

const infScroll = new InfiniteScroll(gallery, {
    // options
    responseType: 'text',
    path() {
        return getPath();
    },
    history: false,
    outlayer: masonryInstance,
    loadOnScroll: true,
});

infScroll.on('load', throttle(getImages, 100));

function getImages(response) {
    const result = JSON.parse(response);
    const images = result.hits;

    if (images.length === 0) {
        lastPage();
        return;
    }

    addElementsInDOM(images);

    pnotifyMessage(1);

    apiService.page += 1;
}

function addElementsInDOM(images) {
    const markup = images.map(image => cardTemplate(image)).join('');

    const proxyEl = document.createElement('div');
    proxyEl.innerHTML = markup;

    const items = proxyEl.querySelectorAll('.grid-item');

    infScroll.appendItems(items);

    const imagesLoadedInstance = imagesLoaded(gallery);

    imagesLoadedInstance.on('progress', () => {
        masonryInstance.layout();
    });

    masonryInstance.appended(items);
}

function lastPage() {
    infScroll.options.loadOnScroll = false;
    const proxyEl = document.createElement('p');
    proxyEl.classList.add('infinite-scroll-last');
    proxyEl.textContent = 'End of content. No more pages to load';
    gallery.appendChild(proxyEl);
    pnotifyMessage();
}

function pnotifyMessage(e) {
    if (e === 1) {
        const mySuccess =
            apiService.page === 1 ?
            success({
                text: `Yor ${apiService.query} loaded Success!`,
            }) :
            success({
                text: 'The Scrolling Success!',
            });
    } else {
        success({
            text: 'End of content. No more pages to load',
        });
    }
}

gallery.addEventListener('click', event => {
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    const instance = basicLightbox.create(`
    <div class="modal">
        <div class="modal-content">
            <img class="modal-img" src="${event.target.dataset.lg}" alt="${event.target.alt}">
        </div>
    </div>
`);

    instance.show();
});

form.addEventListener('keydown', e => {
    apiService.query = e.target.value;

    if (e.key === 'Enter' && apiService.query !== '') {
        event.preventDefault();

        gallery.innerHTML = '';

        infScroll.options.loadOnScroll = true;

        apiService.page = 1;

        const columnValue = [1, 2, 3];

        const markup = columnValue.map(li => gridSizerTemplate(li)).join('');

        const proxyEl = document.createElement('div');
        proxyEl.innerHTML = markup;

        const items = proxyEl.querySelectorAll('.grid-sizer');

        gallery.append(...items);

        masonryInstance.appended(items);

        infScroll.options.path = getPath;

        infScroll.loadNextPage();

        e.target.value = '';
    }
});