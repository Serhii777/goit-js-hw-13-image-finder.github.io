import pixabayService from './services/pixabay-services';
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

  input.value = '';
}

function loadMoreBtnHandler() {
  spinner.show();

  // setTimeout(fetchImages, 5000);
  fetchImages();
  goToUp();
}

//* TODO Сделать скролл на 12 Об. ---> ГОТОВО

function goToUp() {
  const element = refs.galleryList.lastElementChild;
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'center',
  });
}

//* Прокрутка вверх -> ГОТОВО

// TODO Infinite Scroll

//! Отрисовка страницы
function fetchImages() {
  spinner.show();

  pixabayService
    .fetchImages()
    .then(hits => {
      // console.log(hits);
      //* console.log(hits.length);

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

function insertListItems(images) {
  const markupGallery = galleryTemplate(images);
  refs.galleryList.insertAdjacentHTML('beforeend', markupGallery);
}

function clearListItems() {
  refs.galleryList.innerHTML = '';
}
