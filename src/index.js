import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import GetPixabayAPI from './getPixabay';
import { renderMarkup } from './renderMarkup';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let counterOfTotalPages = 1;
notVisibleBtn();
const getPixabayAPI = new GetPixabayAPI();

searchForm.addEventListener('submit', onSearchForm);
loadMore.addEventListener('click', onLoadMoreBtn);

function onSearchForm(e) {
  e.preventDefault();
  notVisibleBtn();

  getPixabayAPI.query = e.target.searchQuery.value.trim();
  removeMarkup();
  getPixabayAPI.reloadPage();

  if (getPixabayAPI.query === '') {
    Notify.warning('We need to find something. Please, try again!');
    return;
  }

  getPixabayAPI.getImage().then(response => {
    // console.log(response.totalHits);

    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found totalHits images.`);
    }

    counterOfTotalPages += response.hits.length - 1;

    if (response.hits.length === 0) {
      Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      counterOfTotalPages = 1;
      notVisibleBtn();
      return;
    }

    renderMarkup(response.hits);
    visibleBtn();

    const lightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
      captionPosition: 'bottom',
      captionClass: 'center',
    });
  });
}

function onLoadMoreBtn() {
  if (!getPixabayAPI.searchQuery) {
    return;
  }
  getPixabayAPI.getImage().then(response => {
    counterOfTotalPages += response.hits.length;

    setTimeout(() => {
      notVisibleBtn();
      renderMarkup(response.hits);
      loadMore.style.display = 'block';

      const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionPosition: 'bottom',
        captionClass: 'center',
      });

      lightbox.refresh();
    }, 500);

    if (counterOfTotalPages >= response.totalHits) {
      Notify.warning("We're sorry, but you've reached the end of search results.");
      notVisibleBtn();
    }
  });
}

function visibleBtn() {
  setTimeout(() => {
    loadMore.style.display = 'block';
  }, 1000);
}

function notVisibleBtn() {
  return (loadMore.style.display = 'none');
}

function removeMarkup() {
  gallery.innerHTML = '';
}
