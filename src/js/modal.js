events.addEventListener('click', renderModal);
const wrapper = document.querySelector(".wrapper");

export function renderModal(e) {
    const markup =
    `<div class=backdrop">
        <div class="modal">
            <div class="modal__header">
                <img src=#>
            </div>
            <div class="modal__main">
                <img class="event-img" src=#>
                <ul class="modal__about">
                <li>
                    <span class="modal__about-span">INFO</span>
                    
                </li>
                <li>
                    <span class="modal__about-span">WHEN</span>
                    
                </li>
                <li>
                    <span class="modal__about-span">WHERE</span>
                    
                </li>
                <li>
                    <span class="modal__about-span">WHO</span>
                    
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

}

