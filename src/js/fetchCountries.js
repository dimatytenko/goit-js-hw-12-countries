const BASE_URL = 'https://restcountries.com/v2';

export default function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}/name/${searchQuery}`)
    .then(responce => responce.json())
    .then(countries => {
      return countries;
    });
}
