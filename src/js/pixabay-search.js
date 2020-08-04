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

  clearListItems();

  pixabayService.resetPage();
  pixabayService.searchQuery = input.value;

  fetchImages();

  input.value = '';
}

function loadMoreBtnHandler() {
  spinner.show();
  fetchImages();
  // element.scrollTo({
  // window.scrollIntoView({
    // top: 1000,
    // block: 'center',
    // behavior: 'smooth',
  // });
  // window.scrollTo(0, 500);
  // window.scrollTo(pageX,pageY)
  // document.documentElement.clientHeight;
  // document.documentElement.scrollHeight;

  // var hiddenElement = document.getElementById("box");
  // var btn = document.querySelector('.btn');
  // function handleButtonClick() {
  //    hiddenElement.scrollIntoView({block: "center", behavior: "smooth"});
  // }
  // btn.addEventListener('click', handleButtonClick);

  // window.scroll(0,findPos(document.getElementById("divFirst")));

  // const y = element.getBoundingClientRect().top + window.scrollY;
  // window.scroll({
  //   top: y,
  //   behavior: 'smooth',
  // });

  // var scrollDiv = document.getElementById("myDiv").offsetTop;
//   let scrollDiv = refs.galleryList.offsetTop;
// window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
scrollIntoView()
}

function scrollIntoView(selector, offset = 0) {
  // window.scroll(0, document.querySelector(selector).offsetTop - offset);
  window.scroll(0, refs.galleryList.offsetTop + offset);
}

function fetchImages() {
  spinner.show();

  pixabayService
    .fetchImages()
    .then(hits => {
      console.log(hits);

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
