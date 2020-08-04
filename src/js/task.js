import users from './gallery-items.js';
// console.table(users);
const refs = {
   galleryRef: document.querySelector('.js-gallery'),
   lightboxRef: document.querySelector('.js-lightbox'),
   largeImage: document.querySelector('.lightbox__image'),
   closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
   closeModalRef: document.querySelector('.lightbox__overlay'),
};

const createGallery = item => {
   const itemRef = document.createElement('li');
   itemRef.classList.add('gallery__item');

   const linkRef = document.createElement('a');
   linkRef.classList.add('gallery__link');
   linkRef.setAttribute('href', item.original);

   const imageRef = document.createElement('img');
   imageRef.classList.add('gallery__image');
   imageRef.setAttribute('src', item.preview);
   imageRef.setAttribute('data-source', item.original);
   imageRef.setAttribute('alt', item.description);

   linkRef.append(imageRef);
   itemRef.append(linkRef);
   return itemRef;
};

const galleryItems = users.map(item => createGallery(item));

refs.galleryRef.append(...galleryItems);
console.log(refs.galleryRef);

refs.galleryRef.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
   event.preventDefault();
   if (event.target.nodeName !== 'IMG') {
      console.log('Кликнули не по картинке!');
      return;
   }
   console.log('Кликнули в картинку!');

   const imageRef = event.target;
   const largeImageUrl = imageRef.dataset.source;
   const largeImageAlt = imageRef.alt;

   setLargeImageSrc(largeImageUrl);
   setLargeImageAlt(largeImageAlt);
   onOpenModal();
}

function setLargeImageSrc(url) {
   refs.largeImage.src = url;
}

function setLargeImageAlt(alt) {
   refs.largeImage.alt = alt;
}


function onOpenModal() {
   if (refs.lightboxRef.classList.contains('is-open')) {
      console.log('Такой класс уже есть!');
      return;
   }
   console.log('Добавляем класс!');

   refs.lightboxRef.classList.add('is-open');
   refs.closeModalBtn.addEventListener('click', onCloseModalBtn);
   document.addEventListener('click', onCloseModalRef);
   window.addEventListener('keydown', onPressEscape);
}

function onCloseModal() {
   refs.closeModalBtn.removeEventListener('click', onCloseModalBtn);
   document.removeEventListener('click', onCloseModalRef);
   window.removeEventListener('keydown', onPressEscape);
   refs.largeImage.setAttribute('src', ' ');
   refs.largeImage.setAttribute('alt', ' ');

   refs.lightboxRef.classList.remove('is-open');
}

function onCloseModalBtn() {
   if (event.target === event.currentTarget) {
      console.log('Кликнули по кнопке. Закрываем модалку!');
      onCloseModal();
   }
}

function onCloseModalRef(event) {
   if (event.target.nodeName === 'IMG') {
      console.log('Кликнули не по темному!');
      return;
   }
   console.log('Кликнули по темному, модалка закрывается!');
   onCloseModal();
}

function onPressEscape(event) {
   if (event.code === 'Escape') {
      onCloseModal();
      console.log('Нажали ESC, модалка закрывается');
   }
}
