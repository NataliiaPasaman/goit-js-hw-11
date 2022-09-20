import './css/styles.css';
import { Notify } from 'notiflix';
import { fetchImages } from './fetchHendler';

const refs = {
  form: document.getElementById('search-form'),
  input: document.querySelector('[name="searchQuery"]'),
}

refs.form.addEventListener('submit', onSearchImage);

function onSearchImage(event) {
  event.preventDefault();

  const searchQuery = refs.input.value;
  console.log(refs.input.value);

  fetchImages(searchQuery)
.then(dataImages => console.log(dataImages));
}



// fetchImages()
// .then(dataImages => console.log(dataImages));