class ModalOfGallery {
    constructor(gallery) {
        this.gallery = gallery;
        this.body = document.querySelector('body');
        (this.modalWrap = ''), (this.modal = '');
        this.modalImage = '';
    }

    on() {
        this.gallery.addEventListener('click', this.onGalleryClick);
        console.log(this.gallery);
        this.cteateModal();
        this.modal.addEventListener('click', this.onClickModal);
    }

    // galleryListener() {
    //     this.gallery.addEventListener('click', this.onGalleryClick);
    // }
    // modalListener() {
    //     this.modal.addEventListener('click', this.onClickModal);
    // }
    onClickModal(event) {
        if (event.target.nodeName === 'BUTTON' || event.target.nodeName !== 'IMG') {
            this.removeModalClass();
            this.onModalClose();
        }
    }
    removeModal() {
        this.modalWrap.innerHTML = '';
    }
    onGalleryClick() {
        if (event.target.nodeName !== 'IMG') {
            return;
        }
        ModalOfGallery.onModalOpen();
        ModalOfGallery.addModalClass();
    }
    onModalOpen() {
        console.log('onModalOpen');
        window.addEventListener('keydown', this.listener);
    }
    onModalClose() {
        window.removeEventListener('keydown', this.listener);
    }
    addModalClass() {
        const src = event.target.dataset.source;
        const index = event.target.dataset.index;
        refs.modal.classList.add('is-open');
        refs.modalImage.src = src;
        refs.modalImage.dataset.index = index;
    }
    removeModalClass() {
        this.modal.classList.remove('is-open');
        this.modalImage.src = '/';
        this.modalImage.dataset.index = '';
    }
    listener() {
        if (event.code === 'ArrowLeft' && this.modalImage.dataset.index > 0) {
            this.prevImageOnGallery();
        }
        if (
            event.code === 'ArrowRight' &&
            this.modalImage.dataset.index < indexCount - 1
        ) {
            this.nextImageOnGallery();
        }
        if (event.code === 'Escape') {
            this.removeModalClass();
            this.onModalClose();
        }
    }
    prevImageOnGallery() {
        const index = Number(this.modalImage.dataset.index);
        const images = this.gallery.querySelectorAll('img');
        const prevImageSrc = images[index - 1].dataset.source;
        this.modalImage.src = prevImageSrc;
        this.modalImage.dataset.index = index - 1;
    }
    nextImageOnGallery() {
        const index = Number(this.modalImage.dataset.index);
        const images = this.gallery.querySelectorAll('img');
        const nextImageSrc = images[index + 1].dataset.source;
        this.modalImage.src = nextImageSrc;
        this.modalImage.dataset.index = index + 1;
    }
    cteateModal() {
        const modalWrap = document.createElement('div');
        modalWrap.classList.add('modalWrap');
        modalWrap.innerHTML = `<div class="lightbox js-lightbox">
        <div class="lightbox__overlay"></div>
    
        <div class="lightbox__content">
            <img class="lightbox__image" src="/" alt="" />
        </div>
    
        <button type="button" class="lightbox__button" data-action="close-lightbox"></button>
    </div>`;

        console.log(modalWrap);

        this.body.appendChild(modalWrap);
        this.modalWrap = document.querySelector('.modalWrap');
        this.modal = document.querySelector('.js-lightbox');
        this.modalImage = document.querySelector('.lightbox__image');
    }
}

export default ModalOfGallery;

// function onGalleryClick(event) {
//     if (event.target.nodeName !== 'IMG') {
//         return;
//     }
//     onModalOpen();
//     addModalClass();
// }

// refs.modal.addEventListener('click', event => {
//     if (event.target.nodeName === 'BUTTON' || event.target.nodeName !== 'IMG') {
//         removeModalClass();
//         onModalClose();
//     }
// });

// function listener(event) {
//     if (event.code === 'ArrowLeft' && refs.modalImage.dataset.index > 0) {
//         prevImageOnGallery();
//     }
//     if (
//         event.code === 'ArrowRight' &&
//         refs.modalImage.dataset.index < indexCount - 1
//     ) {
//         nextImageOnGallery();
//     }
//     if (event.code === 'Escape') {
//         removeModalClass();
//         onModalClose();
//     }
// }

// function onModalOpen() {
//     window.addEventListener('keydown', listener);
// }

// function onModalClose() {
//     window.removeEventListener('keydown', listener);
// }

// function addModalClass() {
//     const src = event.target.dataset.source;
//     const index = event.target.dataset.index;
//     refs.modal.classList.add('is-open');
//     refs.modalImage.src = src;
//     refs.modalImage.dataset.index = index;
// }

// function removeModalClass() {
//     refs.modal.classList.remove('is-open');
//     refs.modalImage.src = '/';
//     refs.modalImage.dataset.index = '';
// }

// function prevImageOnGallery() {
//     const index = Number(refs.modalImage.dataset.index);
//     const images = refs.gallery.querySelectorAll('img');
//     const prevImageSrc = images[index - 1].dataset.source;
//     refs.modalImage.src = prevImageSrc;
//     refs.modalImage.dataset.index = index - 1;
// }

// function nextImageOnGallery() {
//     const index = Number(refs.modalImage.dataset.index);
//     const images = refs.gallery.querySelectorAll('img');
//     const nextImageSrc = images[index + 1].dataset.source;
//     refs.modalImage.src = nextImageSrc;
//     refs.modalImage.dataset.index = index + 1;
// }

// function cteateModal() {
//     const modalWrap = document.createElement('div');
//     modalWrap.classList.add('modalWrap');
//     modalWrap.innerHTML = `<div class="lightbox js-lightbox">
//     <div class="lightbox__overlay"></div>

//     <div class="lightbox__content">
//         <img class="lightbox__image" src="/" alt="" />
//     </div>

//     <button type="button" class="lightbox__button" data-action="close-lightbox"></button>
// </div>`;

//     refs.body.insertAdjacentHTML('beforeend', modalWrap);
//     refs.modal = document.querySelector('.js-lightbox');
//     refs.modalImage = document.querySelector('.lightbox__image');
// }

// function removeModal() {
//     modalWrap.innerHTML = '';
// }