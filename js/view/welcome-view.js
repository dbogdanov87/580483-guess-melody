import AbstractView from './abstract-view.js';

export default class WelcomeView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<section class="welcome">
        <div class="welcome__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
        </div>
        <button class="welcome__button"><span class="visually-hidden">Начать игру</span></button>
        <h2 class="welcome__rules-title">Правила игры</h2>
        <p class="welcome__text">Правила просты:</p>
        <ul class="welcome__rules-list">
          <li>За ${this.state.time / 60} минут нужно ответить на все вопросы.</li>
          <li>Можно допустить ${this.state.attempts} ошибки.</li>
        </ul>
        <p class="welcome__text">Удачи!</p>
      </section>`;
  }

  bind() {
    const welcomeButton = this.element.querySelector(`.welcome__button`);
    welcomeButton.addEventListener(`click`, () => {
      this.onWelcomeButton(this.state);
    });
  }

  onWelcomeButton() {
  }
}
