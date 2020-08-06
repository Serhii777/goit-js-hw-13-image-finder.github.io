import spinner from './spinner';

const refs = {
   galleryRef: document.querySelector('.js-gallery'),
   lightboxRef: document.querySelector('.js-lightbox'),
   largeImage: document.querySelector('.lightbox__image'),
   closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
   closeModalRef: document.querySelector('.lightbox__overlay'),
};

refs.galleryRef.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
   event.preventDefault();
   spinner.show();
   if (event.target.nodeName !== 'IMG') {
      console.log('Кликнули не по картинке!');
      spinner.hide();
      return;
   }
   spinner.show();
   console.log('Кликнули в картинку!');

   const imageRef = event.target;
   const largeImageUrl = imageRef.dataset.source;
   const largeImageAlt = imageRef.alt;

   setLargeImageSrc(largeImageUrl);
   setLargeImageAlt(largeImageAlt);
   onOpenModal();
   // spinner.hide();
}

function setLargeImageSrc(url) {
   refs.largeImage.src = url;
}

function setLargeImageAlt(alt) {
   refs.largeImage.alt = alt;
}


function onOpenModal() {
   spinner.show();
   if (refs.lightboxRef.classList.contains('is-open')) {
      console.log('Такой класс уже есть!');
      // spinner.hide();
      return;
   }
   console.log('Добавляем класс!');

   refs.lightboxRef.classList.add('is-open');
   refs.closeModalBtn.addEventListener('click', onCloseModalBtn);
   document.addEventListener('click', onCloseModalRef);
   window.addEventListener('keydown', onPressEscape);
   // spinner.hide();
}



function onCloseModal() {
   spinner.hide();
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
