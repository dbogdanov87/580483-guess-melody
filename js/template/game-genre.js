import {renderScreen} from '../util.js';
import {changeQuestionScreen, changeAttempts} from '../game-control.js';
import {gameQuestions} from '../game-data.js';

const genreTemplate = (gameQuestion) => `<form class="game__tracks">
  ${gameQuestion.answers.map((answer, item) => `
  <div class="track">
    <button class="track__button track__button--play" type="button"></button>
    <div class="track__status">
      <audio src="${answer.src}"></audio>
    </div>
    <div class="game__answer">
      <input class="game__input visually-hidden" type="checkbox" name="answer" value="${answer.genre}" id="answer-${item}">
      <label class="game__check" for="answer-${item}">Отметить</label>
    </div>
  </div>`).join(``)}
  <button class="game__submit button" type="submit">Ответить</button>
</form>`;

export default (state) => {
  const currentLevel = gameQuestions[state.level];
  const element = renderScreen(genreTemplate(currentLevel));

  const replySubmitButton = element.querySelector(`.game__submit`);
  replySubmitButton.disabled = true;

  const getCheckedAnswers = () => {
    return element.querySelectorAll(`.game__input:checked`);
  };

  const gameTrackForm = element.querySelector(`.game__tracks`);
  gameTrackForm.addEventListener(`click`, () => {
    replySubmitButton.disabled = getCheckedAnswers().length <= 0;
  });

  element.querySelector(`.game__submit`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    let answersUser = [];
    const answersGame = gameQuestions[state.level].melody.map((item) => item.src);
    const answers = Array.from(element.querySelectorAll(`input:checked`));

    answers.forEach((item) => {
      const audioSrc = item.parentElement.parentElement.querySelector(`audio`).src;
      answersUser.push(audioSrc);
    });

    if (answersGame.join(`,`) === answersUser.join(`,`)) {
      state.userAnswers.push({answer: true, time: 30});
      changeQuestionScreen(state);
    } else {
      state.userAnswers.push({answer: false, time: 30});
      changeQuestionScreen(changeAttempts(state, state.attempts - 1));
    }
  });
  return element;
};
