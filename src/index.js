import './sass/main.scss';
import getRefs from './js/getRefs';
import countriesTemplate from './templates/countries.hbs';

const refs = getRefs();

function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.com/v2/name/${searchQuery}`)
    .then(responce => responce.json())
    .then(countries => {
      // return countries;
      appendCountriesMarkup(countries);
    });
}
console.log(fetchCountries('ukraine'));

function appendCountriesMarkup(countries) {
  refs.cardContainer.innerHTML = countriesTemplate(countries);
}
