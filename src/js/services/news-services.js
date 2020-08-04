const baseUrl = 'https://newsapi.org/v2/everything';
export default {
  page: 1,
  query: '',
  fetchArticles() {
    const options = {
      headers: {
        Authorization: '84ab7c17f8f14edf9a0f2b7ee9d89cf1',
      },
    };

    const requestParams = `?q=${this.query}&page=${this.page}&pageSize=10`;

    return (
      fetch(baseUrl + requestParams, options) //* то, что возвратит БЕ
        .then(response => response.json()) //* то,что возвратит Ф. внутри
        //? т.е. fetchArticles теперь возвращает промис, и мы можем перенести
        //? then(data) в файл news-search.js в Ф. searchFormSubmitHandler
        .then(parseResponse => {
          this.incrementPage(); //* вызываем пагинацию
          return parseResponse.articles;
        })
      //* но возьмем тут только articles, а не весь Об.
    );
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },

  incrementPage() {
    //* делаем Мт. для пагинации
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};
