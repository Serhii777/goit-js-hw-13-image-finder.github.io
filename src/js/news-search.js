import newsService from './services/news-services';
import spinner from './spinner';
import articleListItemsTemplate from '../templates/article-list-items.hbs';

const refs = {
  searchForm: document.querySelector('#search-form'),
  articleList: document.querySelector('#article-list'),
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function searchFormSubmitHandler(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const input = form.elements.query;

  clearListItems();

  newsService.resetPage();
  newsService.searchQuery = input.value;

  //? spinner.show();

  // newsService.fetchArticles(searchQuery).then(data => { //* возьмем только articles

  // newsService.fetchArticles().then(articles => { //* меняем articles на insertListItems

  // console.log(articles);
  // const markup = buildListItemsMarkup(articles); //* теперь ее удаляем
  //* т. к. эти две операции всегда идут вместе (build и insert) - мы можем их
  //* объединить
  // console.log(markup);
  // insertListItems(markup); //* меняем markup на articles
  // insertListItems(articles); //* это анонимная Ф. и мы ее можем передать
  //* как колбек (ссылку) вместо articles (в строку 28), а потом -- удалить
  // });
  //! И вот результат нашего улучшения:
  //? newsService
  //?   .fetchArticles()
  //?   .then(articles => {
  //?     spinner.hide();
  //?     insertListItems(articles);
  //?   })
  //?   .catch(error => {
  //?     console.warn(error);
  //?   });

  //? И вызовем эту Ф.:
  fetchArticles();

  input.value = '';
}

function loadMoreBtnHandler() {
  // newsService.fetchArticles().then(articles => { //* меняем articles на insertListItems
  // console.log(articles);

  // const markup = buildListItemsMarkup(articles); //* теперь ее удаляем
  // console.log(markup);

  // insertListItems(markup); //* меняем markup на articles
  // insertListItems(articles); //* это анонимная Ф. и мы ее можем передать
  //* как колбек (ссылку) вместо articles (в строку 44), а потом -- удалить
  // });
  //? spinner.show();

  //   //! И вот результат нашего улучшения:
  //?   newsService
  //?     .fetchArticles()
  //?     .then(articles => {
  //?       spinner.hide();
  //?       insertListItems(articles);
  //?     })
  //?     .catch(error => {
  //?       console.warn(error);
  //?     });

  //? И вызовем эту Ф.:
  fetchArticles();
}

//! Получилось два одинаковых куска кода, поэтому вынесем его
//! в отдельню Ф.
function fetchArticles() {
  spinner.show();

  newsService
    .fetchArticles()
    .then(articles => {
      spinner.hide();
      insertListItems(articles);
    })
    .catch(error => {
      console.warn(error);
    });
}

function insertListItems(items) {
  //* и тут
  const markup = articleListItemsTemplate(items);

  refs.articleList.insertAdjacentHTML('beforeend', markup);
}

// function buildListItemsMarkup(items) {  //* и тут
//   return articleListItemsTemplate(items);
// }

function clearListItems() {
  refs.articleList.innerHTML = '';
}
