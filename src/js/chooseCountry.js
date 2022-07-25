// Function which help to select country in header
import { countries } from "./countryList";

const selectDrop = document.querySelector('#countries');



export function chooseCountries(e) {
        const markup = countries
        .sort((a,b)=> (a.name.localeCompare(b.name)))
        .map((country) =>
        `<option value ="${country.countryCode}">${country.name}</option>`)
        .join("");

        selectDrop.insertAdjacentHTML('beforeend',markup);
       }

      chooseCountries();

   