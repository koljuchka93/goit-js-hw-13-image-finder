const debounce = require('lodash.debounce');

import error from './pnotify';
import { refs } from './refs';
import NewsApiService from './apiService';
import imageMarkupTMPT from '../templates/imageCardMarkup.hbs';
import { onGalleryElClick } from './modal';
import LoadMoreBtn from './loadMoreBtn';

const newsApiService = new NewsApiService();
const loadButton = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.form.addEventListener('submit', onSearch)
loadButton.refs.button.addEventListener('click', onLoadMore)
refs.gallery.addEventListener('click', onGalleryElClick);

function onSearch(e) {
  e.preventDefault();
  
  loadButton.show();
  newsApiService.query = e.currentTarget.elements.query.value;
  newsApiService.resetPage();

  resetImagesList();
  fetchImages();

  if (newsApiService.query === '') {
    loadButton.disable();
    return noResults();
  }
}
  
function onLoadMore() {
  newsApiService.incrementPage();

  fetchImages();
}

function appendImagesMarkup(hits) {
  refs.galleryList.insertAdjacentHTML('beforeend', imageMarkupTMPT(hits));
}
function resetImagesList(hits) {
  refs.galleryList.innerHTML = '';
} 
function noResults() {
  error({
    text: 'Введите что нибудь!',
    delay: 2000,
  });
}

function noMatchesFound() {
  error({
    text: 'К сожалению нет совпадений. Попробуйте другой запрос!',
    delay: 2500,
  });
}

function fetchImages(hits) {
  loadButton.disable();
  newsApiService.featchImages().then(hits => {
    appendImagesMarkup(hits);
    loadButton.enable();
    if (hits.length === 0) {
      loadButton.hide();
      noMatchesFound();
    }
  })
  .catch(err => alert(err))
}