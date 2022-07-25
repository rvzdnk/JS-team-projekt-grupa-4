// imports
import axios from 'axios';
import { searchEvents } from './searchEvent';

// qs
const qs = name => document.querySelector(name);
const modalPlace = qs('.place-for-modal');
const searchInput = qs('.form__search');
const eventsList = qs('.events');
const body = qs('body');
// listeners
eventsList.addEventListener('click', getEventId);

document.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    modalPlace.innerHTML = '';
    body.classList.remove('scroll--lock');
  }
  return;
});

// functions
function getEventId(e) {
  const li = e.target.closest('li');
  const id = li.dataset.index;
  if (id !== undefined) {
    fetchEventsById(id);
  }
  return;
}

const whoFn = data => {
  if (data._embedded.attractions[0].name != undefined) {
    return data._embedded.attractions[0].name;
  } else return data.name;
};

const renderModal = data => {
  body.classList.add('scroll--lock');
  const eventData = {
    ...data,
    smallImg: data.images.find(img => img.width === 305),
    largeImg: data.images.find(img => img.width === 1024),
    who: whoFn(data),
  };
  setTimeout(() => {
    renderData(eventData);
  }, 20);
  setTimeout(() => {
    closeModal();
    localStorage.setItem('event-name', eventData.who);
  }, 500);

  setTimeout(() => {
    try {
      const backdrop = qs('.backdrop');
      backdrop.addEventListener('click', clearModal);
      const moreBtn = qs('.modal__more');
      moreBtn.addEventListener('click', e => {
        searchInput.value = localStorage.getItem('event-name');
        setTimeout(() => searchEvents(e), 500);
      });
    } catch (error) {
      console.log(error.message + ' Backdrop closed sooner than appeared');
    }
  }, 1000);
};

const closeModal = () => {
  try {
    if (modalPlace) {
      const modalClose = qs('.modal__close');
      modalClose.addEventListener('click', clearModal);
    }
  } catch (error) {
    console.log(error.message + ' Backdrop closed sooner than appeared');
  }
  return;
};

const clearModal = () => {
  try {
    modalPlace.innerHTML = ``;
    body.classList.remove('scroll--lock');
  } catch (error) {
    console.log(error);
  }
  return;
};

async function fetchEventsById(id) {
  const API_KEY = 'fEWnHm1nOc4BRRBNn8aA5fAFLjYDK8YZ';
  try {
    const response = await axios({
      method: 'get',
      url: `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=${API_KEY}&locale=*`,
    });
    renderModal(response.data);
    return response.data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

const renderData = eventData => {
  modalPlace.innerHTML = `<div class="backdrop">
        <div class="modal">
            <div class="modal__header">
                <div class="modal__header-img"><img src="${eventData.smallImg.url}" alt="event's icon">
                <a class="modal__close" href=#></a></div>
            </div>
            <div class="modal__main">
                <img class="event-img" src="${eventData.largeImg.url}">
                <ul class="modal__about">
                <li class="modal__text">
                    <span class="modal__about-span">INFO</span>
                    <p class="modal__about-text">${eventData.name}</p>  
                </li>
                <li class="modal__text">
                    <span class="modal__about-span">WHEN</span>
                    <p class="modal__about-text">
                    ${eventData.dates.start.localDate},</br>
                    ${eventData.dates.start.localTime} (${eventData.dates.timezone})</p>
                </li>
                <li class="modal__text">
                    <span class="modal__about-span">WHERE</span>
                    <p class="modal__about-text">${eventData._embedded.venues[0].city.name}, ${eventData._embedded.venues[0].country.name},
                ${eventData._embedded.venues[0].name}</p>
                </li>
                <li class="modal__text">
                    <span class="modal__about-span">WHO</span>
                    <p class="modal__about-text">${eventData.who}</p>
                </li>
                <li class="modal__text">
                    <span class="modal__about-span">PRICES</span>
                    <p class="modal__about-price"> Standard: ${eventData.priceRanges[0].min} ${eventData.priceRanges[0].currency}</p>
                    <button class="modal__about-btn" type="button" onclick="window.location.href='${eventData.url}';"> BUY TICKETS </button>
                    <p class="modal__about-price"> VIP: ${eventData.priceRanges[0].max} ${eventData.priceRanges[0].currency}</p>
                    <button class="modal__about-btn" type="button" onclick="window.location.href='${eventData.url}';"> BUY TICKETS </button>
                </li>
                </ul>
            </div>
            <button class="modal__more" type="button"> More from this author </button>
        </div>
    </div>`;
};

export { renderModal };
