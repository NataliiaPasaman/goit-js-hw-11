import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const listCountries = document.querySelector('.country-list');
const infoCountries = document.querySelector('.country-info');
const fieldSearch = document.querySelector('#search-box');

fieldSearch.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));


function onSearchCountry(event) {
  const searchName = event.target.value.trim();

  if (!searchName) {
    resetCountries();
    return;
  }

  fetchCountries(searchName)
    .then(countries => {
      if (countries.length > 10) {
        showMessage();
      } else if (countries.length >= 2 && countries.length < 10) {
        findLessTenCountries(countries);
      } else {
        findOneCountry(countries);
      }
    })
    .catch(error => showError());
}

function showMessage() {
  resetCountries();
  Notify.info('Too many matches found. Please enter a more specific name.');
  return;
}


function findOneCountry(argsCountries) {
  resetCountries();
  renderInfoCountry(argsCountries);
  return;
}


function findLessTenCountries(argsCountries) {
  resetCountries();
  renderListCountries(argsCountries);
  return;
}


function showError() {
  resetCountries();
  Notify.failure('Oops, there is no country with that name');
  return;
}


function renderListCountries(countriesArray) {
  const list = countriesArray
    .map(({ name: { common }, flags: { svg } }) => {
      return `<li class='item'>
        <img class='country-img' src='${svg}' width="30" height="20"/>
        <h2 class='country-name'>${common}</h2>
        </li>`;
    })
    .join('');

  listCountries.insertAdjacentHTML('beforeend', list);
}


function renderInfoCountry(countriesArray) {
  const markup = countriesArray
    .map(({ name, capital, languages, population, flags }) => {
      return `<div class='country-box'>
        <img class='country-img' src='${flags.svg}' width="50" height="40"/>
        <h3 class='country-title'>${name.common}</h3>
        </div>
        <p><b>Capital: </b>${capital}</p>
        <p><b>Population: </b>${population}</p>
        <p><b>Languages: </b>${Object.values(languages).join(', ')}</p>`;
    })
    .join('');

  infoCountries.insertAdjacentHTML('beforeend', markup);
}


function resetCountries() {
  listCountries.innerHTML = '';
  infoCountries.innerHTML = '';
}


