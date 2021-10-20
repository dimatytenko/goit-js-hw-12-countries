import './sass/main.scss';
import getRefs from './js/getRefs';
import countriesTemplate from './templates/countries.hbs';
import listCountriesTemplate from './templates/list-countries.hbs';
import fetchCountries from './js/fetchCountries';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const debounce = require('lodash.debounce');

const refs = getRefs();
refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  const query = event.target.value;
  if (query === '') {
    refs.cardContainer.innerHTML = '';
    return;
  }
  renderCountries(query);
}

function renderCountries(searchQuery) {
  fetchCountries(searchQuery).then(countries => {
    if (countries.length > 10) {
      tooManyMatches();
    } else if (countries.length === 1) {
      appendCountriesMarkup(countries);
    } else if (countries.length >= 2 && countries.length <= 10) {
      appendListCountries(countries);
    } else notFound();
  });
}

function appendCountriesMarkup(countries) {
  refs.cardContainer.innerHTML = countriesTemplate(countries);
}

function appendListCountries(countries) {
  refs.cardContainer.innerHTML = listCountriesTemplate(countries);
}

function tooManyMatches() {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 2000,
  });
}
function notFound() {
  error({
    text: 'Not Found!',
    delay: 2000,
  });
  refs.cardContainer.innerHTML = '';
}
