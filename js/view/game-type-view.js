import AbstractView from './abstract-view.js';

export default class GameTypeView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    return `<section class="game ${this.data.type}">
        <section class="game__screen">
          <h2 class="game__title">${this.data.question}</h2>
        </section>
      </section>`;
  }
}
