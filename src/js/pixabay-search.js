import pixabayService from './services/pixabayAsync-services';
import pixabayGallery from './gallery-item';
import spinner from './spinner';
import galleryTemplate from '../templates/photoGallery.hbs';
import { noticeError, mySuccess } from './services/notices';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('#gallery-list'),
  galleryItem: document.querySelector('.gallery__item'),
  searchImageBtn: document.querySelector('button[data-action="search-image"]'),
  clearImageBtn: document.querySelector('button[data-action="clear-image"]'),
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.clearImageBtn.addEventListener('click', clearListItems);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function searchFormSubmitHandler(event) {
  event.preventDefault();
  spinner.show();

  const form = event.currentTarget;
  const input = form.elements.query;

  clearListItems();

  pixabayService.resetPage();
  pixabayService.searchQuery = input.value;
  // console.log(input.value);

  fetchImages();
  // getImages();

  input.value = '';
}

function loadMoreBtnHandler() {
  spinner.show();

  fetchImages();
  goToUp();
}

//* Скролл на 12 Об.

function goToUp() {
  const element = refs.galleryList.lastElementChild;
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'center',
  });
}

// TODO Infinite Scroll

function fetchImages() {
  spinner.show();

  pixabayService
    .fetchImages()
    .then(hits => {
      if (hits.length === 0) {
        spinner.hide();
        return noticeError();
      } else {
        spinner.hide();
        insertListItems(hits);
        mySuccess();
      }
    })
    .catch(error => {
      noticeError();
      console.warn(error);
    });
}

// function insertListItems(images) {
//   const markupGallery = galleryTemplate(images);
//   refs.galleryList.insertAdjacentHTML('beforeend', markupGallery);
// }

async function insertListItems(images) {
  const markupGallery = await galleryTemplate(images);
  refs.galleryList.insertAdjacentHTML('beforeend', markupGallery);
}

function clearListItems() {
  refs.galleryList.innerHTML = '';
}
