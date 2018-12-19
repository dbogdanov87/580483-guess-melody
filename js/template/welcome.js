import {renderScreen, changeScreen} from '../util.js';
import gameTemplate from '../template/game.js';


const welcomeTemplate = (gameState) => `<section class="welcome">
<div class="welcome__logo">
  <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
</div>
<button class="welcome__button"><span class="visually-hidden">Начать игру</span></button>
<h2 class="welcome__rules-title">Правила игры</h2>
<p class="welcome__text">Правила просты:</p>
<ul class="welcome__rules-list">
  <li>За ${gameState.time / 60} минут нужно ответить на все вопросы.</li>
  <li>Можно допустить ${gameState.attempts} ошибки.</li>
</ul>
<p class="welcome__text">Удачи!</p>
</section>`;

export default (state) => {
  const element = renderScreen(welcomeTemplate(state));

  element.querySelector(`.welcome__button`).addEventListener(`click`, () => {
    changeScreen(gameTemplate(state));
  });
  return element;
};
