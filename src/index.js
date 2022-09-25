import './css/styles.css';
import { Notify } from 'notiflix';
import { fetchImages } from './fetchHendler';

const refs = {
  form: document.getElementById('search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
}

refs.form.addEventListener('submit', onSearchImage);

// Хендлер - спрацьовує при сабміті форми
function onSearchImage(event) {
  event.preventDefault();

  const searchQuery = refs.input.value;

/** Під час пошуку за новим ключовим словом необхідно повністю очищати вміст галереї, 
 * щоб не змішувати результати. */

  fetchImages(searchQuery)
  .then(dataImages => {
    const arrayImages = dataImages.hits;
    console.log(arrayImages);

    if (arrayImages.length === 0) {
      showNotifyMessage();
    }

    renderMarkup(arrayImages);
  });
}

// Рендеримо зображення на сторінку
function renderMarkup(images) {
  const imageCard = images
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="250" />
    <div class="info">
      <p class="info-item">
        <b>${likes} Likes</b>
      </p>
      <p class="info-item">
        <b>${views} Views</b>
      </p>
      <p class="info-item">
        <b>${comments} Comments</b>
      </p>
      <p class="info-item">
        <b>${downloads} Downloads</b>
      </p>
    </div>
  </div>`;
    })
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', imageCard);
}
// largeImageURL - посилання на велике зображення.


// Функція очищення галереї при новому запиті
function clearGallery () {
  refs.gallery.innerHTML = '';
}

function showNotifyMessage () {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}