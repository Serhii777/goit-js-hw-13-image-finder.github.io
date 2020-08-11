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
  const keydownRef = window.addEventListener('keydown', scrollingImages);
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

// function scrollingImages(event) {
// console.log(event); //* кнопка
// console.dir(event.target); //* а
// console.log(event.target.children); //* img
// console.dir(event.target.parentElement); //* div
// console.dir(event.target.parentElement.parentElement); //* li
// console.dir(event.target.parentElement.parentElement.parentElement); //*ul

const counter = {
  index: 0,
};

console.log(refs.galleryRef);
// console.dir(refs.galleryRef.children);






let currentImage = refs.galleryRef.children;
console.log(currentImage);


const openNextImage = i => {
  // refs.demo.style.backgroundColor = colors[i];
  // refs.lightboxRef.classList.add('is-open') = currentImage[i];

  console.log(currentImage[i].children);
  
};

// function setBG ({target}) {
//   counter.index = +target.dataset.index;
//   repaintBG(counter.index)
// }

function scrollingImages(event) {
  let i = 0;

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    i = 1;
    console.log('Right', i, 'вход');
  }
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    i = -1;
    console.log('Left', i, 'вход');
  }
  counter.index = (counter.index + i) % currentImage.length;
  openNextImage(Math.abs(counter.index));
}

// let i;

// console.dir(refs.galleryRef.children);

// let currentImage = refs.galleryRef.children;

// console.log(currentImage.length);
// console.log(currentImage[i]);
// console.log(currentImage[i + indexButtonClick]);

// if (event.key) {
//   console.log('key');
//   refs.lightboxRef.classList.remove('is-open');
// }

// if (refs.lightboxRef.classList.contains('is-open') === true) {
//   console.log('True');
//   refs.lightboxRef.classList.remove('is-open');
//   currentImage[i + indexButtonClick];
//   refs.lightboxRef.classList.add('is-open');
// }

// currentImage.length = currentImage.length%[i + indexButtonClick];

// currentImage
// console.log(currentImage, 'результат');

// console.log(refs.lightboxRef);
// console.log(refs.lightboxRef.parentElement);

// console.log(slideIndex, 'начало');

// slideIndex = slideIndex % (currentImage + 1);

// console.log(event.target.offsetParent, 'результат--1');

// console.log(slideIndex, 'результат');
// slideIndex.classList.add('is-open');
// slideIndex[refs.lightboxRef].classList.add('is-open');
// console.log(currentImage, 'результат');

//* var slides = document.querySelectorAll('#slides .slide');
//* var currentSlide = 0;
//* var slideInterval = setInterval(nextSlide,2000);

//* function nextSlide() {
//*     slides[currentSlide].className = 'slide';
//*     currentSlide = (currentSlide+1)%slides.length;
//*     slides[currentSlide].className = 'slide showing';
// }

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
