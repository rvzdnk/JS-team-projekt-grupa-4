
import { fetchEvents } from "./fetchEvents";

const searchForm = document.querySelector(".form");
const searchInput = document.querySelector(".form__search");
const selectDrop = document.querySelector('#countries');

let pageNumber;

function searchEvents (){
    fetchEvents(searchInput.value, selectDrop.value, pageNumber)
    .then(data =>{
        renderEvents(data)
    })
    .catch(error =>{
        console.log(error);
    });
}



const eventImage = _embedded.events.images[0].url;
const eventName = _embedded.events.name;
const eventDate = _embedded.events.dates.start.localDate;
const eventVenue = _embedded.venues.name;

function renderEvents(_embedded){


    const eventDetail = _embedded
            .map(
                ({
                eventImage,
                eventName,
                eventDate,
                eventVenue
                }) => {
                    return `
                    <div class ="events__item">
                        <a>
                            <img class="event__img" src="${eventImage}"/>
                        </a>
                        <div class="events__info>
                            <p class="events__info-name">
                            ${eventName}
                            </p>
                            <p class="events__info-date">
                            ${eventDate}
                            </p>
                            <p class="events__info-venue">
                            ${eventVenue}
                            </p>
                            
                        </div>
                    </div>
                    ` 
                }
            )
            .join('');
        
            events.insertAdjacentHTML('beforeend', eventDetail);
}

const newSearch = e => {
    e.preventDefault();
    pageNumber = 1;
    events.innerHTML = '';
    console.log(`start: ${pageNumber}`);
    searchEvents();
}

searchForm.addEventListener('submit', newSearch)