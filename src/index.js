const preloader = document.querySelector('#preloader');

const timeout = () => setTimeout(preload, 500);

window.addEventListener('load', timeout);

function preload() {
  preloader.classList.remove('show-preloader');
}
import { chooseCountries } from './js/chooseCountry';
import { countrySelector } from './js/searchEvent';
import { addClassActive } from './js/dropdown';
import { changeCountry } from './js/dropdown';
import { fetchEvents } from './js/fetchEvents';
import { countryList } from './js/countryList';
import { searchEvents } from './js/searchEvent';
import { renderEvents } from './js/searchEvent';
import { pagination } from './js/pagination';
import { modal } from './js/modal';
