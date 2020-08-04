//* https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

const baseUrl = 'https://pixabay.com/api/';
export default {
  page: 2,
  query: '',
  fetchImages() {
    // const options = {
    //   headers: {
    //     Authorization: '17627900-033e401422c15b0db6e889732',
    //   },
    // };
    const key = '?key=17627900-033e401422c15b0db6e889732';
    const type = '&image_type=photo';
    const orientation = '&orientation=horizontal';
    const requestParams = `&q=${this.query}&page=${this.page}&per_page=12`;

    return (
      fetch(baseUrl + key + type + orientation + requestParams)
        .then(response => response.json())
        .then(data => {
          this.incrementPage();
          return data.hits;
        })
    );
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },

  incrementPage() {  //* делаем Мт. для пагинации
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};
