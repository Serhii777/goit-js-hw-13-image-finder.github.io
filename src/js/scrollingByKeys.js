// import { insertListItems } from './pixabay-search';
import pixabaySearch from './pixabay-search';

const refs = {
  // demo: document.querySelector('.demo'),
  // list: document.querySelector('.list'),
  lightboxRef: document.querySelector('.js-lightbox'),
  largeImage: document.querySelector('.lightbox__image'),
};

const counter = {
  index: 0,
};

// const html = hits.map((e, i) => `<li class="js-gallery__item" data-index="${i}" style="background-color: ${e};"> Click me! </li> `).join('\n');

// refs.largeImage.insertAdjacentHTML('afterbegin', html);
// refs.largeImage.insertAdjacentHTML('afterbegin', pixabaySearch.insertListItems);

const repaintBG = i => {
  refs.lightboxRef.src = hits[i];
  console.log(refs.lightboxRef.src);
};

function setImage({ largeImageURL }) {
  counter.index = +target.dataset.index;
  repaintBG(counter.index);
}

refs.largeImage.addEventListener('click', setImage);

function setNextImage(event) {
  let i = 0;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    i = 1;
  }
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    i = -1;
  }
  hits.index = (hits.index + i) % hits.length;
  repaintBG(Math.abs(hits.index));
}

window.addEventListener('keydown', setNextImage);
