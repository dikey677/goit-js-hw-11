const axios = require('axios');

export default class GetPixabayAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 1;
  }
  async getImage() {
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '25578866-eab48f26650f3d339fe2e0163',
          q: this.searchQuery,
          orientation: 'horizontal',
          image_type: 'photo',
          safesearch: true,
          page: this.page,
          per_page: 40,
        },
      });

      this.addMorePage();

      this.totalHits = response.data.totalHits;
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  addMorePage() {
    this.page += 1;
  }

  reloadPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
