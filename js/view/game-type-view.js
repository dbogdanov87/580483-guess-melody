import AbstractView from './abstract-view.js';
import {gameQuestions} from '../game-data.js';

export default class GameTypeView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.level = gameQuestions[this.state];
  }

  get template() {
    return `<section class="game ${this.level.type}">
        <section class="game__screen">
          <h2 class="game__title">${this.level.name}</h2>
        </section>
      </section>`;
  }
}
