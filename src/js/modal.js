import axios from "axios";
const modalPlace = document.querySelector(".place-for-modal");
const backdrop = document.querySelector(".backdrop");
function getEventId(e) {
    if (!e.target.closest('li'))
        {console.log(`wrong target`)}
    else {
        const id = e.target.dataset.index;
        console.log(id)
        fetchEventsById(id)
        
    }
    
}
document.addEventListener('click', getEventId);

function renderModal(data) {
    const eventData = {
        ...data,
        smallImg: data.images.find(img => img.width === 305 && img.height === 225),
        largeImg: data.images.find(img => img.width === 1024 && img.height === 683),
    }
    console.log(data)
    modalPlace.innerHTML =
    `<div class="backdrop">
        <div class="modal">
            <div class="modal__header">
                <img src="${eventData.smallImg.url}" alt="event's icon">
            </div>
            <div class="modal__main">
                <img class="event-img" src="${eventData.largeImg.url}">
                <ul class="modal__about">
                <li>
                    <span class="modal__about-span">INFO</span>
                ${data.info}  
                </li>
                <li>
                    <span class="modal__about-span">WHEN</span>
                ${data.dates.start.localDate},
                ${data.dates.start.localTime}, ${data.timezone}
                </li>
                <li>
                    <span class="modal__about-span">WHERE</span>
                ${data._embedded.venues[0].city}, ${data._embedded.venues[0].country},
                ${data._embedded.venues[0].name}
                </li>
                <li>
                    <span class="modal__about-span">WHO</span>
                ${data.name}
                </li>
                <li>
                    <span class="modal__about-span">PRICES</span>
                
                </li>
                </ul>
            </div>
            <button class="modal__more"> More from this author </button>
        </div>
    </div>`
    }


document.addEventListener("keydown", event => {
        if (event.code === 'escape') {
            backdrop.classList.add('is-hidden')
        } else return
});
async function fetchEventsById(id) {
        const API_KEY = 'fEWnHm1nOc4BRRBNn8aA5fAFLjYDK8YZ';      
        try {
          const response = await axios({
            method: 'get',
            url: `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=${API_KEY}&locale=*`,
          });
          console.log(response)
          renderModal(response.data)
          return response.data;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      }