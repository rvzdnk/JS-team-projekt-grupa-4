import { searchEvents } from './fetchEvents';
import { fetchEvents } from './fetchEvents';
import { renderEvents } from "./searchEvent";
const selectDrop = document.querySelector('#countries');

const searchInput = document.querySelector('.form__search');

let pageNr = 0;
let countryCode = "US";
let arrayOfPages = [];
let visibleArrayOfPages;
const paginationArray = document.querySelector(".pagination");
function pagination(data) {
  renderPagination(data);
  currentPage(data);
  changePage(data);
};

function renderPagination(data) {
  arrayOfPages = [...Array(data.page.totalPages).keys()]
  // console.log(arrayOfPages);
      visibleArrayOfPages = arrayOfPages.map((i) =>
      `<button type="submit" value=${i} id=${i} class=pagination__btn>${i + 1}</button>`).join("");
  paginationArray.innerHTML = visibleArrayOfPages;
}

function currentPage(data) {
  const currentPage = document.getElementById(data.page.number);
  currentPage.classList.add("pagination__btn--active");
}

function changePage(data) {
  for (let i = 0; i < data.page.totalPages; i++) {
    let newPage = document.getElementById(i);
    newPage.addEventListener("click", handleChangePage)
  };
}

function handleChangePage(event) {
  event.preventDefault();
  pageNr = event.target.value;
  console.log(pageNr);
  fetchEvents('concert', 'US', pageNr)
  .then(data => {
    renderEvents(data);
    pagination(data);
  })
  .catch(error => {
    console.log(error);
  });
};

// Pagination After Search
function paginationAfterSearch(data) {
  renderPagination(data);
  currentPage(data);
  changePageAfterSearch(data);
};

function changePageAfterSearch(data) {
  for (let i = 0; i < data.page.totalPages; i++) {
    let newPage = document.getElementById(i);
    newPage.addEventListener("click", handleChangePageAfterSearch)
  };
}

function handleChangePageAfterSearch(event) {
  event.preventDefault();
  pageNr = event.target.value;
  console.log(pageNr);
  if (selectDrop.value === "Choose country") {
    selectDrop.value = 'US';
  }
  fetchEvents(searchInput.value, selectDrop.value, pageNr)
  .then(data => {
    renderEvents(data);
    paginationAfterSearch(data);
  })
  .catch(error => {
    console.log(error);
  });
};
// totalElements = ${page.totalElements} - liczba wszystkich elementów
// size = ${page.size} - liczba elementów na stronie
// totalPages = ${page.totalPages} - liczba wszystkich stron
// number = &{page.number} - aktualna strona

export { pagination, paginationAfterSearch, pageNr };