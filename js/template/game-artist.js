import {renderScreen} from '../util.js';
import {changeQuestionScreen, changeAttempts} from '../game-control.js';
import {gameQuestions} from '../game-data.js';

const artistTemplate = (gameQuestion) => `<div class="game__track">
<button class="track__button track__button--play" type="button"></button>
 <audio src="${gameQuestion.melody.src}"></audio>
</div>
<form class="game__artist">
  ${gameQuestion.answers.map((answer, item) => `<div class="artist">
    <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${item}" id="answer-${item}">
    <label class="artist__name" for="answer-${item}">
      <img class="artist__picture" src="${answer.image}" alt="${answer.artist}">
      ${answer.artist}
    </label>
  </div>`).join(``)}
</form>`;

export default (state) => {
  const currentLevel = gameQuestions[state.level];
  const element = renderScreen(artistTemplate(currentLevel));

  element.querySelectorAll(`.artist`).forEach((answer) => {
    answer.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (answer.querySelector(`img`).src === currentLevel.melody.image) {
        state.userAnswers.push({answer: true, time: 30});
        changeQuestionScreen(state);
      } else {
        state.userAnswers.push({answer: false, time: 30});
        changeQuestionScreen(changeAttempts(state, state.attempts - 1));
      }
    });
  });
  return element;
};
