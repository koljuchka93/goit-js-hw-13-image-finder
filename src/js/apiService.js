const KEY = '24125132-03a45b117457a16fcdb616627'
const BASE_URL = `https://pixabay.com/api/`;

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  featchImages() {  
    return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`)
      .then(response => response.json())
      .then(data => {
        return data.hits;
      });
  }
  get query() {
  return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  resetPage() {
    this.page = 1;
  }
  incrementPage() {
    this.page += 1;
  }
}