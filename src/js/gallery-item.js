import spinner from './spinner';
// import buttonScrollTop from './buttonScrollTop';

const refs = {
  galleryRef: document.querySelector('.js-gallery'), //ul
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

  // console.log(event.target);
  // console.log(event.currentTarget);

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

  console.log(event.target);
  console.dir(event.currentTarget); //ul

  // const keydown = window.addEventListener('keydown', setNextImage);
  const keydownRef = window.addEventListener('keydown', scrollingImages);
  // scrollingImage();

  refs.closeModalBtn.addEventListener('click', onCloseModalBtn);
  document.addEventListener('click', onCloseModalRef);
  window.addEventListener('keydown', onPressEscape);
}

// function setNextImage(event) {
//   let currentImage = 0;

//   if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
//     currentImage = 1;
//     console.log('Right', currentImage);
// scrollingImage(currentImage);
//     return currentImage;
//   }
//   if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
//     currentImage = -1;
//     console.log('Left', currentImage);
// scrollingImage(currentImage);
//     return currentImage;
//   }
// hits.index = (hits.index + i) % hits.length;
// repaintBG(Math.abs(hits.index));
// }

// const slides = document.querySelectorAll('#slides .slide');
// const slideInterval = setInterval(nextImage, 2000);

function scrollingImages(event) {
  console.log(event); //кнопка
  console.dir(event.target); //а
  console.dir(event.target.parentElement); //* div
  console.dir(event.target.parentElement); //* li
  console.dir(event.target.parentElement.parentElement); //*ul
  console.log(event.target.children); //img
  console.log(target.dataset.index);
  

  let currentImage = 0;

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    currentImage = 1;
    console.log('Right', currentImage, 'вход');
    // scrollingImage(currentImage);
    // return currentImage;
  }
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    currentImage = -1;
    console.log('Left', currentImage, 'вход');
    // scrollingImage(currentImage);
    // return currentImage;
  }

  let prevElement = this.currentElement;

  console.dir(document);
  console.dir(document.body);
  console.dir(document.images.length);
  // console.log(document.body.currentElement);

  // console.log(prevElement);
  

  console.log(refs.galleryRef.children);
  console.log(refs.galleryRef.children.length);



  let slideIndex = refs.galleryRef.children.length

 slideIndex = (currentImage + 1) % slideIndex;

  console.log(event.target.offsetParent, 'результат--1');

  console.log(slideIndex, 'результат--2');

  // console.log(currentImage, 'результат');

  // refs.galleryRef.children.length[refs.lightboxRef].classList.add('is-open');

  //* var slides = document.querySelectorAll('#slides .slide');
  //* var currentSlide = 0;
  //* var slideInterval = setInterval(nextSlide,2000);

  //* function nextSlide() {
  //*     slides[currentSlide].className = 'slide';
  //*     currentSlide = (currentSlide+1)%slides.length;
  //*     slides[currentSlide].className = 'slide showing';
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
