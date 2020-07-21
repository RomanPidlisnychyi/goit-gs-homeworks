import './styles.css';
import apiService from './apiService';
import 'material-design-icons/iconfont/material-icons.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const galleryWrap = document.querySelector('.gallery-wrap');
const nextPageBtn = document.querySelector('button[name="load-more"]');

const createGalleryList = async() => {
    const images = await apiService.get();

    const markup = images.map(image => {
        const li = document.createElement('li');
        li.classList.add('gallery-item');
        li.innerHTML = `<div class="photo-card">
          <img src="${image.webformatURL}" data-lg="${image.largeImageURL}" alt="${image.tags}" />

          <div class="stats">
            <p class="stats-item">
              <i class="material-icons">thumb_up</i>
              ${image.likes}
            </p>
            <p class="stats-item">
              <i class="material-icons">visibility</i>
              ${image.views}
            </p>
            <p class="stats-item">
              <i class="material-icons">comment</i>
              ${image.comments}
            </p>
            <p class="stats-item">
              <i class="material-icons">cloud_download</i>
              ${image.downloads}
            </p>
          </div>
        </div>`;

        return li;
    });

    gallery.append(...markup);
};

form.addEventListener('keydown', onQuery);
galleryWrap.addEventListener('click', galleryOnClick);

function onQuery(event) {
    apiService.query = event.target.value;

    if (event.key === 'Enter' && apiService.query !== '') {
        event.preventDefault();
        apiService.last_page = false;
        gallery.innerHTML = '';
        createGalleryList();
        nextPageBtn.classList.remove('off');
        nextPageBtn.classList.add('on');
    }
}

function galleryOnClick(event) {
    if (event.target.nodeName === 'IMG') {
        console.log(event.target);
    }

    if (event.target.nodeName === 'BUTTON') {
        console.log(event.target);
        createGalleryList();
    }
}