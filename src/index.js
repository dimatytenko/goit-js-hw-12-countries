import './sass/main.scss';
import getRefs from './js/getRefs';
import countriesTemplate from './templates/countries.hbs';
import listCountriesTemplate from './templates/list-countries.hbs';
import fetchCountries from './js/fetchCountries';
const debounce = require('lodash.debounce');

const refs = getRefs();
refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  const query = event.target.value;
  renderCountries(query);
}

const BASE_URL = 'https://restcountries.com/v2';

function renderCountries(searchQuery) {
  fetchCountries(searchQuery).then(countries => {
    if (countries.length === 1) {
      appendCountriesMarkup(countries);
    } else if (countries.length >= 2 && countries.length <= 10) {
      appendListCountries(countries);
    }
  });
}

function appendCountriesMarkup(countries) {
  refs.cardContainer.innerHTML = countriesTemplate(countries);
}

function appendListCountries(countries) {
  refs.cardContainer.innerHTML = listCountriesTemplate(countries);
}
