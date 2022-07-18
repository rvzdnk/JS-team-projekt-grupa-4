const wrapper = document.querySelector(".wrapper");
const backdrop = document.querySelector(".backdrop");

const modalHandler = (e) => {
    if (!e.target.closest('li'))
    return;
    else {
    const id = e.target.dataset.index;
    fetchEventsById(id)
}};

function renderModal(data) {
    const event = {
        ...data,
        authorName: data.name.split(' ').slice(0, 2).join(' '),
        info: data.info,
        when: data.dates.start.localDate,
        time: data.dates.start.localTime,
        timezone: data.dates.timezone,
        place: data._embedded.venues[0].name,
        cite: _embedded.venues[0].city,
        country: _embedded.venues[0].country,
        smallImgSrc: data.images.find(img => img.width === 305 && img.height === 225) ,
        largeImgSrc: data.images.find(img => img.width === 1024 && img.height === 683),
        ticketVIPprice: data.priceRanges[1]? 1 : 0,
        urlPrice: data.url,
    }
    const markup =
    `<div class="backdrop">
        <div class="modal">
            <div class="modal__header">
                <img src="${event.smallImgSrc}" alt="event's icon">
            </div>
            <div class="modal__main">
                <img class="event-img" src="${img.largeImgSrc}">
                <ul class="modal__about">
                <li>
                    <span class="modal__about-span">INFO</span>
                ${event.info}  
                </li>
                <li>
                    <span class="modal__about-span">WHEN</span>
                ${event.when},
                ${event.time}, ${event.timezone}
                </li>
                <li>
                    <span class="modal__about-span">WHERE</span>
                ${event.city}, ${event.country},
                ${event.place}
                </li>
                <li>
                    <span class="modal__about-span">WHO</span>
                ${event.authorName}
                </li>
                <li>
                    <span class="modal__about-span">PRICES</span>
                    
                </li>
                </ul>
            </div>
            <button class="modal__more"> More from this author </button>
        </div>
    </div>`;
    wrapper.insertAdjacentHTML("beforebegin", markup);
    };



document.addEventListener("keydown", event => {
        if (event.code === 'escape') {
            backdrop.classList.add('is-hidden')
        } else return
});
async function fetchEventsById(id) {   
    try {
        const API_KEY= `fEWnHm1nOc4BRRBNn8aA5fAFLjYDK8YZ`;
        const result = fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`)
        const data = result.data;
        renderModal(data);
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

wrapper.addEventListener('click', modalHandler);
