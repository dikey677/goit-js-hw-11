export function renderMarkup(hits) {
  const gallery = document.querySelector('.gallery');

  const markup = hits
    .map(el => {
      return `
      <div class="photo-card">
        <div class="img_box">
            <a class="gallery__item" href="${el.webformatURL}">
            <img class="imgLink"src="${el.webformatURL}" alt="${el.tags}" loading="lazy" width="320"/>
            </a>
        </div>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${el.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${el.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${el.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${el.downloads}
          </p>
        </div>
      </div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
