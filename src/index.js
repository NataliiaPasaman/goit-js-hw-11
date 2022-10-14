import './css/styles.css';
import refs from './refs';
import { Notify } from 'notiflix';
import { PixabeyImages } from './fetchHendler';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { observer } from './infinity_scroll';
import goSpinner from './spinner';

export const api = new PixabeyImages;
let totalPages = null;

let galleryLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

hideBtnLoadMore();

refs.form.addEventListener('submit', onSearchImage);
refs.btn_load.addEventListener('click', onLoadMore);

// Хендлер - спрацьовує при сабміті форми
function onSearchImage(event) {
  event.preventDefault();

  api.searchQuery = refs.input.value;

  api.resetPage();
  hideBtnLoadMore();
  clearGallery();

  api.fetchImages()
  .then(arrayImages => {
    if (arrayImages.length === 0) {
      showNotifyMessage();
      return;
    }

  showQuantityImages(api.totalImages);
  renderMarkup(arrayImages);
  galleryLightBox.refresh();
  showBtnLoadMore();
  smoothScroll();

  totalPages = Math.ceil(api.totalImages / 40);
  if(api.page >= totalPages) {
    showMessageInEndImages();
  }
})
.catch(error => console.log(error));
}

//Функція по загрузці більшої кількості карток при клікові на кнопку
//Викликаємо цю функцію для безкінечного скрола
function onLoadMore() {
  goSpinner();
  api.page += 1;

  api.fetchImages()
  .then(arrayImages => {
    renderMarkup(arrayImages);
    galleryLightBox.refresh();
    // smoothScroll();

    totalPages = Math.ceil(api.totalImages / 40);
    if(api.page >= totalPages) {
      showMessageInEndImages();
    };

    if(arrayImages.length < 40) {
      observer.unobserve(refs.btn_load);
      return;
    };
  });
}
export { onLoadMore };


// Рендеримо зображення на сторінку
function renderMarkup(images) {
  const imageCard = images
    .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
      <a class="gallery__item" href="${largeImageURL}">
    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="220" height="170" />
    </a>
    <div class="info">
      <p class="info-item">
      Likes <br/>
        <b>${likes}</b>
      </p>
      <p class="info-item">
      Views <br/>
        <b>${views}</b>
      </p>
      <p class="info-item">
      Comments <br/>
        <b>${comments}</b>
      </p>
      <p class="info-item last_item">
      Downloads <br/>
        <b>${downloads}</b>
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

//функція сховати кнопку "Load More"
function hideBtnLoadMore() {
  refs.btn_load.classList.add('visually-hidden');
}

//функція показати кнопку "Load More"
function showBtnLoadMore() {
  refs.btn_load.classList.remove('visually-hidden');
}

//Функція показати повідомлення, коли закінчилась колекція зображень
function showMessageInEndImages() {
  hideBtnLoadMore();
  Notify.warning("We're sorry, but you've reached the end of search results.");
}

// Функція показати повідомлення з кількістю знайдених зображень
function showQuantityImages(quantityImages) {
  Notify.success(`Hooray! We found ${quantityImages} images.`);
}

// Функція плавний скролл
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 1,
    behavior: 'smooth',
  });
}