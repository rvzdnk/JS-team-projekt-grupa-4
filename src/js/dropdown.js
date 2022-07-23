const dropdownSelected = document.querySelector(".dropdown__selected");
const dropdownOptions = document.querySelector(".dropdown__options");
const optionList = document.querySelectorAll(".dropdown__option");


export const addClassActive =
dropdownSelected.addEventListener("click", () => {dropdownOptions.classList.toggle("active");})


export const changeCountry = 
    optionList.forEach(option => {
    option.addEventListener("click", () => {
        dropdownSelected.innerHTML = option.querySelector("label").innerHTML;
        dropdownOptions.classList.remove("active")  
        })
    })






