import AbstractView from './abstract-view.js';
import {DEBUG, DEBUG_STYLE} from '../settings';

export default class ArtistView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    return `<div class="game__track">
    <button class="track__button track__button--play" type="button"></button>
     <audio src="${this.data.src}"></audio>
    </div>
    <form class="game__artist">
      ${this.data.answers.map((answer, item) => `<div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value="${item}" id="answer-${item}">
        <label class="artist__name" for="answer-${item}">
          <img class="artist__picture" src="${answer.image.url}" alt="${answer.title}" ${(DEBUG && answer.isCorrect) ? DEBUG_STYLE : ``}">
          ${answer.title}
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

    this.element.querySelector(`.track__button`).addEventListener(`click`, (evt) => {
      const button = evt.target;
      const audio = this.element.querySelector(`audio`);

      evt.preventDefault();
      this.onPlayPause(button, audio);
    });
  }

  onAnswer() {
  }

  onPlayPause() {
  }
}
