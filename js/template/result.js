import {INITIAL_GAME} from '../game-data.js';
import {changeScreen, renderScreen} from '../util.js';
import {scoring} from '../game-scoring.js';
import {getGameResult} from '../game-result.js';
import welcomeTemplate from '../template/welcome.js';

const resultTemplate = (result) => `<section class="result">
<div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
<h2 class="result__title">${result.title}</h2>
<p class="result__total result__total--fail">${result.text}</p>
<button class="result__replay" type="button">Попробовать ещё раз</button>
</section>`;

const statistics = [3, 5, 7, 9, 13];

export default (state) => {
  const result = {};
  result.score = scoring(state.userAnswers, state.attempts);
  result.attempts = state.attempts;
  result.time = state.time;

  const resultGame = getGameResult(statistics, result);
  const element = renderScreen(resultTemplate(resultGame));

  const replayButton = element.querySelector(`.result__replay`);

  replayButton.addEventListener(`click`, () => {
    changeScreen(welcomeTemplate(INITIAL_GAME));
  });

  return element;
};
