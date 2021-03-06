import { searchEvents } from './fetchEvents';
import { fetchEvents } from './fetchEvents';
import { renderEvents } from './searchEvent';
const selectDrop = document.querySelector('#countries');

const searchInput = document.querySelector('.form__search');

let countryCode = 'US';
let arrayOfPages = [];
let visibleArrayOfPages;
let page = 0;

const paginationArray = document.querySelector('.pagination');
function pagination(data) {
  renderPagination(data);
  currentPage(data);
  changePage(data);
}

function renderPagination(data) {
  let totalPages = data.page.totalPages;
  if (totalPages > 50) {
    totalPages = 50;
  }
  arrayOfPages = [...Array(totalPages).keys()];

  const currentPage = data.page.number;
  const pageRange = currentPage + 5;

  if (currentPage === 0) {
    let firstFive = arrayOfPages
      .map(
        i =>
          `<li><button type="submit" value=${i} id=${i} class=pagination__btn>${
            i + 1
          }</button></li>`
      )
      .slice(currentPage, pageRange)
      .join('');
    let lastOne = arrayOfPages
      .map(
        i =>
          `<li><button type="submit" value=${i} id=${i} class=pagination__btn>${
            i + 1
          }</button></li>`
      )
      .slice(-1)
      .join('');
    paginationArray.innerHTML = firstFive + '...' + lastOne;
    if (currentPage === 0 && totalPages < 5) {
      paginationArray.innerHTML = firstFive;
    }
  } else if (currentPage === 1) {
    let firstFive2 = arrayOfPages
      .map(
        i =>
          `<li><button type="submit" value=${i} id=${i} class=pagination__btn>${
            i + 1
          }</button></li>`
      )
      .slice(currentPage - 1, pageRange - 1)
      .join('');
    let lastOne = arrayOfPages
      .map(
        i =>
          `<li><button type="submit" value=${i} id=${i} class=pagination__btn>${
            i + 1
          }</button></li>`
      )
      .slice(-1)
      .join('');
    paginationArray.innerHTML = firstFive2 + '...' + lastOne;
    if (currentPage === 1 && totalPages < 5) {
      paginationArray.innerHTML = firstFive2;
    }
  } else if (currentPage === 2) {
    let firstFive2 = arrayOfPages
      .map(
        i =>
          `<li><button type="submit" value=${i} id=${i} class=pagination__btn>${
            i + 1
          }</button></li>`
      )
      .slice(currentPage - 2, pageRange - 2)
      .join('');
    let lastOne = arrayOfPages
      .map(
        i =>
          `<li><button type="submit" value=${i} id=${i} class=pagination__btn>${
            i + 1
          }</button></li>`
      )
      .slice(-1)
      .join('');
    paginationArray.innerHTML = firstFive2 + '...' + lastOne;
    if (currentPage === 2 && totalPages < 5) {
      paginationArray.innerHTML = firstFive2;
    }
  } else if (currentPage === 3) {
    let firstFive2 = arrayOfPages
      .map(
        i =>
          `<li><button type="submit" value=${i} id=${i} class=pagination__btn>${
            i + 1
          }</button></li>`
      )
      .slice(currentPage - 3, pageRange - 3)
      .join('');
    let lastOne = arrayOfPages
      .map(
        i =>
          `<li><button type="submit" value=${i} id=${i} class=pagination__btn>${
            i + 1
          }</button><li>`
      )
      .slice(-1)
      .join('');
    paginationArray.innerHTML = firstFive2 + '...' + lastOne;
    if (currentPage === 3 && totalPages < 5) {
      paginationArray.innerHTML = firstFive2;
    }
  } else if (currentPage >= 4 && currentPage < totalPages - 4) {
    let firstFive3 = arrayOfPages
      .map(
        i =>
          `<li><button type="submit" value=${i} id=${i} class=pagination__btn>${
            i + 1
          }</button></li>`
      )
      .slice(currentPage - 2, pageRange - 2)
      .join('');
    let lastOne = arrayOfPages
      .map(
        i =>
          `<li><button type="submit" value=${i} id=${i} class=pagination__btn>${
            i + 1
          }</button></li>`
      )
      .slice(-1)
      .join('');
    let firstOne = arrayOfPages
      .map(
        i =>
          `<li><button type="submit" value=${i} id=${i} class=pagination__btn>${
            i + 1
          }</button></li>`
      )
      .slice(0, 1)
      .join('');
    paginationArray.innerHTML = firstOne + '...' + firstFive3 + '...' + lastOne;
  } else {
    let lastFive = arrayOfPages
      .map(
        i =>
          `<li><button type="submit" value=${i} id=${i} class=pagination__btn>${
            i + 1
          }</button></li>`
      )
      .slice(-5)
      .join('');
    let firstOne = arrayOfPages
      .map(
        i =>
          `<li><button type="submit" value=${i} id=${i} class=pagination__btn>${
            i + 1
          }</button></li>`
      )
      .slice(0, 1)
      .join('');
    paginationArray.innerHTML = firstOne + '...' + lastFive;
  }
}

function currentPage(data) {
  const currentPage = document.getElementById(data.page.number);
  currentPage.classList.add('pagination__btn--active');
}

function changePage(data) {
  let totalPages = data.page.totalPages;
  if (totalPages > 50) {
    totalPages = 50;
  }
  for (let i = 0; i < totalPages; i++) {
    let newPage = document.getElementById(i);
    if (newPage !== null) {
      newPage.addEventListener('click', handleChangePage);
    }
  }
}

function handleChangePage(event) {
  event.preventDefault();
  page = event.target.value;
  fetchEvents('concert', 'PL', page)
    .then(data => {
      renderEvents(data);
      pagination(data);
    })
    .catch(error => {
      console.log(error);
    });
}
// Pagination After Search
function paginationAfterSearch(data) {
  renderPagination(data);
  currentPage(data);
  changePageAfterSearch(data);
}

function changePageAfterSearch(data) {
  let totalPages = data.page.totalPages;
  if (totalPages > 50) {
    totalPages = 50;
  }
  for (let i = 0; i < totalPages; i++) {
    let newPage = document.getElementById(i);
    if (newPage !== null) {
      newPage.addEventListener('click', handleChangePageAfterSearch);
    }
  }
}
function handleChangePageAfterSearch(event) {
  event.preventDefault();
  page = event.target.value;
  if (selectDrop.value === 'Choose country') {
    selectDrop.value = 'US';
  }
  fetchEvents(searchInput.value, selectDrop.value, page)
    .then(data => {
      renderEvents(data);
      paginationAfterSearch(data);
    })
    .catch(error => {
      console.log(error);
    });
}
// totalElements = ${page.totalElements} - liczba wszystkich element??w
// size = ${page.size} - liczba element??w na stronie
// totalPages = ${page.totalPages} - liczba wszystkich stron
// number = &{page.number} - aktualna strona

export { pagination, paginationAfterSearch, page };
