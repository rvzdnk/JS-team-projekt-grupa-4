// Function which help to select country in header
import { countries } from "./countryList";

const selectDrop = document.querySelector('#countries');



export function chooseCountries() {
        const markup = countries.map((country) =>
        `<option value ="${country.countryCode}>${country.name}</option>`).sort()
        .join("");

        selectDrop.insertAdjacentHTML('beforeend',markup);
      }

selectDrop.addEventListener('click', chooseCountries);