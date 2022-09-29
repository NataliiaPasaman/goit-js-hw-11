import './css/styles.css';
import { Notify } from 'notiflix';
import { PixabeyImages } from './fetchHendler';

const api = new PixabeyImages;
// console.log(api);
// largeImageURL - посилання на велике зображення.

const refs = {
  form: document.getElementById('search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  btn_load: document.querySelector('.load-more'),
}
// let totalPage;
hideBtnLoadMore();
let endImages = '';

refs.form.addEventListener('submit', onSearchImage);
refs.btn_load.addEventListener('click', onLoadMore);

// Хендлер - спрацьовує при сабміті форми
function onSearchImage(event) {
  event.preventDefault();

  api.searchQuery = refs.input.value;
  api.resetPage();
  hideBtnLoadMore();
  // removeText();
  clearGallery();

  api.fetchImages()
  .then(arrayImages => {
    if (arrayImages.length === 0) {
      showNotifyMessage();
    }

  renderMarkup(arrayImages);
  showBtnLoadMore();

  const totalPages = api.totalImages / 40;
  if(api.page > totalPages) {
    showTextInEndImages();
  }
  // removeText(endImages);

});

    /** У відповіді бекенд повертає властивість totalHits - загальна кількість зображень, які відповідають 
     * критерію пошуку (для безкоштовного акаунту). Якщо користувач дійшов до кінця колекції, ховай кнопку 
     * і виводь повідомлення з текстом "We're sorry, but you've reached the end of search results.". */
}

function showTextInEndImages() {
    hideBtnLoadMore();
    endImages = document.createElement('p');
    endImages.classList.add('visually-hidden-text')
    endImages.textContent = "We're sorry, but you've reached the end of search results.";

  //   endImages = `<p class="visually-hidden-text">We're sorry, but you've reached the end of search results.</p>`;
  //  return refs.gallery.insertAdjacentHTML('afterend', endImages);
    refs.gallery.after(endImages);
    return endImages;
}

function removeText() {
  endImages.classList.remove('visually-hidden-text');
}

function onLoadMore() {
  api.fetchImages()
  .then(arrayImages => {
    renderMarkup(arrayImages);
  });
}

// Рендеримо зображення на сторінку
function renderMarkup(images) {
  const imageCard = images
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="150" height="100" />
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

// Функція очищення галереї при новому запиті
function clearGallery () {
  refs.gallery.innerHTML = '';
}

// Невалідний запит - показуємо повідомлення
function showNotifyMessage () {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function hideBtnLoadMore() {
  refs.btn_load.classList.add('visually-hidden');
}

function showBtnLoadMore() {
  refs.btn_load.classList.remove('visually-hidden');
}

// function showTextInEndImages(api) {
//   const totalPages = api.totalImages / 40;
//   if(api.page > totalPages) {
//     hideBtnLoadMore();
//     const endImages = "<p>We're sorry, but you've reached the end of search results.</p>";
//     refs.gallery.insertAdjacentHTML('afterend', endImages);
//   }
// }