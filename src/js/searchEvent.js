
import { fetchEvents } from "./fetchEvents";

const searchForm = document.querySelector(".form");
const searchInput = document.querySelector(".form__search");
const selectDrop = document.querySelector('#countries');
const events = document.querySelector(".events");



function searchEvents (){
    fetchEvents(searchInput.value, selectDrop.value)
    .then(data =>{
        renderEvents(data)
    })
    .catch(error =>{
        console.log(error);
    });
}

function renderEvents(data){

    const eventDetail = data
            .map(
                ({
                name, dates, images, _embedded
                }) => {
                    return `
                    <div class ="events__item">
                        <a>
                            <img class="event__img" src="${images[0].url}"/>
                        </a>
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
                    </div>
                    ` 
                }
            )
            .join('');
        
            events.innerHTML = eventDetail;
}


searchEvents();