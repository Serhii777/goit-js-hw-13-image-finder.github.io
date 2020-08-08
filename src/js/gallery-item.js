import spinner from './spinner';
// import buttonScrollTop from './buttonScrollTop';

const refs = {
  galleryRef: document.querySelector('.js-gallery'),
  lightboxRef: document.querySelector('.js-lightbox'),
  largeImage: document.querySelector('.lightbox__image'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  scrollTopBtn: document.querySelector('#scrollTtop-button'),
  closeModalRef: document.querySelector('.lightbox__overlay'),
};

refs.galleryRef.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  spinner.show();
  if (event.target.nodeName !== 'IMG') {
    spinner.hide();
    return;
  }
  spinner.show();

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
  spinner.show();
  refs.scrollTopBtn.classList.add('is-hidden');
  document.documentElement.lastChild.style.overflow = 'hidden';

  if (refs.lightboxRef.classList.contains('is-open')) {
    spinner.hide();
    return;
  }

  refs.lightboxRef.classList.add('is-open');
  setTimeout(spinner.hide, 1500);

  refs.closeModalBtn.addEventListener('click', onCloseModalBtn);
  document.addEventListener('click', onCloseModalRef);
  window.addEventListener('keydown', onPressEscape);
}

function onCloseModal() {
  spinner.hide();
  refs.scrollTopBtn.classList.remove('is-hidden');
  document.getElementsByTagName('body')[0].style.overflow = 'scroll';

  refs.closeModalBtn.removeEventListener('click', onCloseModalBtn);
  document.removeEventListener('click', onCloseModalRef);
  window.removeEventListener('keydown', onPressEscape);
  refs.largeImage.setAttribute('src', ' ');
  refs.largeImage.setAttribute('alt', ' ');

  refs.lightboxRef.classList.remove('is-open');
}

function onCloseModalBtn() {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function onCloseModalRef(event) {
  if (event.target.nodeName === 'IMG') {
    return;
  }
  onCloseModal();
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
