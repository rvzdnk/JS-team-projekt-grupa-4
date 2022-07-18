const preloader = document.querySelector('#preloader');

preloader.classList.add('show-preloader');

window.addEventListener('load', function () {
  preloader.classList.remove('show-preloader');
});


import { chooseCountries } from "./js/chooseCountry";
import { fetchEvents } from "./js/fetchEvents";
import { countryList } from "./js/countryList";
import { searchEvents} from "./js/searchEvent";
import { renderEvents } from "./js/searchEvent";
import { pagination } from "./js/pagination";

