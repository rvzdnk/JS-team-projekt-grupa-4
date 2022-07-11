
import { fetchEvents } from "./fetchEvents";

const searchForm = document.querySelector(".form");
const searchInput = document.querySelector(".form__search");
const selectDrop = document.querySelector('#countries');
const events = document.querySelector(".events");



export function searchEvents (){
    fetchEvents(searchInput.value, selectDrop.value)
    .then(data =>{
        renderEvents(data)

    })
    .catch(error =>{
        console.log(error);
    });
}

 export function renderEvents(data){

    console.log(data);

    const eventDetail = 
         data._embedded.events.map(
                ({
                name, dates, images, _embedded,
                }) =>  `
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
                
            )
            .join('');
        
            events.innerHTML = eventDetail;
}


searchEvents();