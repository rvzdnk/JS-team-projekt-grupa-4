let pageNr = 0;
let arrayOfPages = [];
let visibleArrayOfPages;
const paginationArray = document.querySelector(".pagination");
function pagination(data) {
  renderPagination(data);
  currentPage(data);
  changePage(data);
  // console.log(data.page.totalElements);
  // console.log(data.page.size);
  // console.log(data.page.totalPages);
  // console.log(data.page.number);
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
  
};

// totalElements = ${page.totalElements} - liczba wszystkich elementów
// size = ${page.size} - liczba elementów na stronie
// totalPages = ${page.totalPages} - liczba wszystkich stron
// number = &{page.number} - aktualna strona

export { pagination, pageNr };