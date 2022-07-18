function renderModal(e) {
  e.currentTarget.classList.add('hide');
  const markup = `<div class="modal">
        <div class="modal__header">
            <img src="${e.target.src}">
        </div>
        <div class="modal__main">
            <img class="event-img">
            <div class="modal__about">
                <span class="modal__about-span">INFO</span>
                ${e.target}
                <span class="modal__about-span">WHEN</span>
                ${e.target}
                <span class="modal__about-span">WHERE</span>
                ${e.target}
                <span class="modal__about-span">WHO</span>
                ${e.target}
                <span class="modal__about-span">PRICES</span>
                ${e.target}
            </div>
        </div>
        <button class="modal__more"> More from this author </button>
    <div>
    </div>`;
}

export { renderModal };
