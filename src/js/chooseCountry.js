// Function which help to select country in header

const selectDrop = document.querySelector('#countries');

export function chooseCountries() {
    return fetch(`https://restcountries.com/v3.1/all`,)
      .then(response => {
        return response.json();
      }).then(data =>{
        let output ="";
        data.sort((a,b)=>a.name.common.localeCompare(b.name.common))
        .forEach(country =>{
            output += 
            `<option value="${country.name.common}">${country.name.common}</option>`;
        })
        selectDrop.innerHTML = output;
      })
      .catch(error => console.log(`${error.name}: ${error.message}`));
  };


selectDrop.addEventListener('click', chooseCountries);