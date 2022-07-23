// Function which help to select country in header
import { countries } from "./countryList";

const selectDrop = document.querySelector(".dropdown__options");


export function chooseCountries(e) {
        const markup = countries
        .sort((a,b)=> (a.name.localeCompare(b.name)))
        .map((country) =>
        `<div class="dropdown__option">
                <input type="radio" 
                        class="dropdown__input" 
                        id="${country.name}" 
                        name="country"
                        value="${country.countryCode}"
                        />
                <label for="${country.countryCode}">${country.name}</label>  
         </div>`)
        .join("");

        selectDrop.insertAdjacentHTML('beforeend',markup);
       }

      chooseCountries();

   