import AbstractView from './abstract-view.js';
import {gameQuestions} from '../game-data.js';

export default class GenreView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.level = gameQuestions[state.level];
  }

  get template() {
    return `<form class="game__tracks">
      ${this.level.answers.map((answer, item) => `
      <div class="track">
        <button class="track__button track__button--play" type="button"></button>
        <div class="track__status">
          <audio src="${answer.src}"></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value="${item}" id="answer-${item}">
          <label class="game__check" for="answer-${item}">Отметить</label>
        </div>
      </div>`).join(``)}
      <button class="game__submit button" type="submit">Ответить</button>
    </form>`;
  }

  bind() {
    const gameTrackForm = this.element.querySelector(`.game__tracks`);
    gameTrackForm.addEventListener(`click`, () => {
      this.onCheckbox();
    });

    const gameSubmitButton = this.element.querySelector(`.game__submit`);
    gameSubmitButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onAnswer();
    });
  }

  onAnswer() {
  }

  onCheckbox() {
  }
}
