const images = [{
        url: 'https://images.pexels.com/photos/140134/pexels-photo-140134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        alt: 'White and Black Long Fur Cat',
    },
    {
        url: 'https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        alt: 'Orange and White Koi Fish Near Yellow Koi Fish',
    },
    {
        url: 'https://images.pexels.com/photos/219943/pexels-photo-219943.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        alt: 'Group of Horses Running',
    },
];

const galleryRef = document.querySelector('#gallery');
console.dir(galleryRef);

const createItemGallery = image => {
    const itemRef = document.createElement('li');
    itemRef.classList.add('galleryItem');

    const imgRef = document.createElement('img');
    imgRef.classList.add('galleryImg');
    imgRef.src = image.url;
    imgRef.alt = image.alt;

    itemRef.appendChild(imgRef);
    galleryRef.appendChild(itemRef);

    return galleryRef;
};

const galleryCards = images.map(image => createItemGallery(image));