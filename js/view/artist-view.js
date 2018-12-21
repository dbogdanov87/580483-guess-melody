import AbstractView from './abstract-view.js';
import {gameQuestions} from '../game-data.js';

export default class ArtistView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.level = gameQuestions[state.level];
  }

  get template() {
    return `<div class="game__track">
    <button class="track__button track__button--play" type="button"></button>
     <audio src="${this.level.melody.src}"></audio>
    </div>
    <form class="game__artist">
      ${this.level.answers.map((answer, item) => `<div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${item}" id="answer-${item}">
        <label class="artist__name" for="answer-${item}">
          <img class="artist__picture" src="${answer.image}" alt="${answer.artist}">
          ${answer.artist}
        </label>
      </div>`).join(``)}
    </form>`;
  }

  bind() {
    this.element.querySelectorAll(`.artist`).forEach((answer) => {
      answer.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.onAnswer(answer);
      });
    });
  }

  onAnswer() {
  }
}
