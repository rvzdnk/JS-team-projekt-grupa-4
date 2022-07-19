import axios from "axios";
const modalPlace = document.querySelector(".place-for-modal");
const backdrop = document.querySelector(".backdrop");
const eventsList = document.querySelector(".events");
function getEventId(e) {
    if (!e.target.closest('li'))
        return
    else {
        const id = e.target.dataset.index;
        fetchEventsById(id)        
    }   
}
eventsList.addEventListener('click', getEventId);

function renderModal(data) {
    const eventData = {
        ...data,
        smallImg: data.images.find(img => img.width === 305 && img.height === 225),
        largeImg: data.images.find(img => img.width === 1024 && img.height === 683),
    }
    modalPlace.innerHTML =
    `<div class="backdrop">
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
                    <p class="modal__about-text">${data.name}</p>  
                </li>
                <li class="modal__text">
                    <span class="modal__about-span">WHEN</span>
                    <p class="modal__about-text">
                    ${data.dates.start.localDate},</br>
                    ${data.dates.start.localTime} (${data.dates.timezone})</p>
                </li>
                <li class="modal__text">
                    <span class="modal__about-span">WHERE</span>
                    <p class="modal__about-text">${data._embedded.venues[0].city.name}, ${data._embedded.venues[0].country.name},
                ${data._embedded.venues[0].name}</p>
                </li>
                <li class="modal__text">
                    <span class="modal__about-span">WHO</span>
                    <p class="modal__about-text">${data._embedded.attractions[0].name}</p>
                </li>
                <li class="modal__text">
                    <span class="modal__about-span">PRICES</span>
                    <p class="modal__about-price"> Standard: ${data.priceRanges[0].min} ${data.priceRanges[0].currency}</p>
                    <button class="modal__about-btn" type="button" onclick="window.location.href='${data.url}';"> BUY TICKETS </button>
                    <p class="modal__about-price"> VIP: ${data.priceRanges[0].max} ${data.priceRanges[0].currency}</p>
                    <button class="modal__about-btn" type="button" onclick="window.location.href='${data.url}';"> BUY TICKETS </button>
                </li>
                </ul>
            </div>
            <button class="modal__more" type="button"> More from this author </button>
        </div>
    </div>`
    closeModal()
}



async function fetchEventsById(id) {
        const API_KEY = 'fEWnHm1nOc4BRRBNn8aA5fAFLjYDK8YZ';      
        try {
          const response = await axios({
            method: 'get',
            url: `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=${API_KEY}&locale=*`,
          });
          renderModal(response.data)
          
          return response.data;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      }


document.addEventListener("keydown", (e) => {
    if (e.code === 'Escape') {
        modalPlace.innerHTML=''
    } return});

const closeModal = () => {
    if (modalPlace) {
        const modalClose = document.querySelector(".modal__close");
        modalClose.addEventListener("click", clearModal)
} return}

const clearModal = () => modalPlace.innerHTML=``;
export { renderModal };
