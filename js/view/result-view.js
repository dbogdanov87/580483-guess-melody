import AbstractView from './abstract-view.js';
import {getGameResult} from '../game-result.js';

const statistics = [3, 5, 7, 9, 13];

export default class ResultView extends AbstractView {
  constructor(result) {
    super();
    this.result = result;
    this.resultData = getGameResult(statistics, result);
  }

  get template() {
    return `<section class="result">
        <div class="result__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
        </div>
        <h2 class="result__title">${this.resultData.title}</h2>
        <p class="result__total result__total--fail">${this.resultData.text}</p>
        <button class="result__replay" type="button">Попробовать ещё раз</button>
      </section>`;
  }

  bind() {
    const replayButton = this.element.querySelector(`.result__replay`);
    replayButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onReplayButton(this.state);
    });
  }

  onReplayButton() {
  }
}