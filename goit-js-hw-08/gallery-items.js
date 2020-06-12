const images = [{
        preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/hokkaido-4202825__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/hokkaido-4202825_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/view-4206785__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/view-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];

const refs = {
    galleryRef: document.querySelector('.js-gallery'),
    modalRef: document.querySelector('.js-lightbox'),
    modalImageRef: document.querySelector('.lightbox__image'),
    closeModalBtnRef: document.querySelector('[data-action=close-lightbox]'),
};

const galleryList = images.map((image, index) => {
    const li = document.createElement('li');
    li.classList.add('gallery__item');

    const a = document.createElement('a');
    a.classList.add('gallery__link');
    a.href = image.original;

    const img = document.createElement('img');
    img.classList.add('gallery__image');
    img.src = image.preview;
    img.dataset.source = image.original;
    img.dataset.index = index;
    img.alt = image.description;

    a.appendChild(img);
    li.appendChild(a);

    return li;
});

refs.galleryRef.append(...galleryList);

refs.galleryRef.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    onModalOpen();
    addModalClass();
});

refs.modalRef.addEventListener('click', event => {
    if (event.target.nodeName === 'BUTTON' || event.target.nodeName !== 'IMG') {
        removeModalClass();
        onModalClose();
    }
});

function onModalOpen() {
    window.addEventListener('keydown', listener);
}

function onModalClose() {
    window.removeEventListener('keydown', listener);
}

function listener(event) {
    if (event.code === 'ArrowLeft' && refs.modalImageRef.index > 0) {
        prevImageOnGallery();
    }
    if (
        event.code === 'ArrowRight' &&
        refs.modalImageRef.index < images.length - 1
    ) {
        nextImageOnGallery();
    }
    if (event.code === 'Escape') {
        removeModalClass();
        onModalClose();
    }
}

function addModalClass() {
    const src = event.target.dataset.source;
    const index = event.target.dataset.index;
    refs.modalRef.classList.add('is-open');
    refs.modalImageRef.src = src;
    refs.modalImageRef.index = index;
}

function removeModalClass() {
    refs.modalRef.classList.remove('is-open');
    refs.modalImageRef.src = '';
    refs.modalImageRef.index = '';
}

function prevImageOnGallery() {
    const index = Number(refs.modalImageRef.index);
    const prevImageSrc = images[index - 1].original;
    refs.modalImageRef.src = prevImageSrc;
    refs.modalImageRef.index = index - 1;
}

function nextImageOnGallery() {
    const index = Number(refs.modalImageRef.index);
    const nextImageSrc = images[index + 1].original;
    refs.modalImageRef.src = nextImageSrc;
    refs.modalImageRef.index = index + 1;
}