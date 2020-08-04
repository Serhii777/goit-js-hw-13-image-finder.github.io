import pixabayService from './services/pixabay-services';
import spinner from './spinner';
import galleryTemplate from '../templates/photoGallery.hbs';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('#gallery-list'),
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
  // console.log(input.value);

  clearListItems();

  pixabayService.resetPage();
  pixabayService.searchQuery = input.value;

  fetchImages();

  input.value = '';
}

function loadMoreBtnHandler() {
  spinner.show();
  fetchImages();
}

function fetchImages() {
  spinner.show();

  pixabayService
    .fetchImages()
    .then(hits => {
      spinner.hide();
      insertListItems(hits);
    })
    .catch(error => {
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
