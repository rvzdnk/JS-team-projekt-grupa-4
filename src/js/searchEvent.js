import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import { pagination, paginationAfterSearch, page } from './pagination';
import { fetchEvents } from './fetchEvents';
import { renderModal } from './modal';

const searchForm = document.querySelector('.form');
const searchInput = document.querySelector('.form__search');
const selectDrop = document.querySelector('#countries');
const events = document.querySelector('.events');
let pageNr = 0;
// Country selector
let countryCode = 'US';

function selectedCountry() {
  let selectedValue = document.getElementsByTagName('select')[0].value;
  return (countryCode = selectedValue);
}

document
  .getElementsByTagName('select')[0]
  .addEventListener('change', function () {
    pageNr = 0;
    selectedCountry();
    searchEvents(event);
  });

// Search selector

fetchEvents('concert', 'GB', pageNr)
  .then(data => {
    // console.log(data);
    renderEvents(data);
    pagination(data);
  })
  .catch(error => {
    console.log(error);
  });

// Function which search events by selectors

export function searchEvents(event) {
  event.preventDefault();
  fetchEvents(searchInput.value, countryCode, pageNr)
    .then(data => {
      // console.log(data);
      renderEvents(data);
      paginationAfterSearch(data);
    })
    .catch(error => {
      Notify.failure(
        'There is no results for your event. Please try another event or change the country.'
      );
    });
}

export function renderEvents(data) {
  // console.log(data);
  // console.log(data.page);
  Loading.dots({
    svgColor: '#dc56c5',
  });
  Loading.remove(500);
  const eventDetail = data._embedded.events
    .map(
      ({ id, name, dates, images, _embedded }) => `
                    <li class ="events__item" data-index=${id}>
                        
                            <img class="event__img" src="${images
                              .filter(e => e.ratio === '4_3')
                              .map(e => `${e.url}`)}"/>
                        
                        <div class="events__info>
                            <p class="events__info-name">
                            ${name}
                            </p>
                            <p class="events__info-date">
                            ${dates.start.localDate}
                            </p>
                            <p class="events__info-venue">
                            ${_embedded.venues[0].name}
                            </p>
                            
                        </div>
                    </li>
                    `
    )
    .join('');
  events.innerHTML = eventDetail;
}

searchForm.addEventListener('submit', searchEvents);

Notify.init({
  width: '300px',
  distance: '50px',
  rtl: false,
  fontFamily: 'Montserat',
  useFontAwesome: false,
  fontAwesomeIconStyle: 'basic',
  fontAwesomeIconSize: '34px',
  failure: {
    background: 'rgba(205,205,205,0.3)',
    notiflixIconColor: '#939393',
    textColor: '#939393',
  },
});
