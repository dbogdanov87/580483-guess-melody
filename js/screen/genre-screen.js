import {changeQuestionScreen, changeAttempts} from '../game-control.js';
import GenreView from '../template/genre-view.js';
import {gameQuestions} from '../game-data.js';

export const genreScreen = (state) => {

  const screen = new GenreView(state);
  const currentLevel = gameQuestions[state.level];

  const replySubmitButton = screen.element.querySelector(`.game__submit`);
  replySubmitButton.disabled = true;
  screen.onCheckbox = () => {
    const getCheckedAnswers = () => {
      return screen.element.querySelectorAll(`.game__input:checked`);
    };
    replySubmitButton.disabled = getCheckedAnswers().length <= 0;
  };

  screen.onAnswer = () => {
    const answersUser = [];
    const answersGame = currentLevel.melody.map((item) => item.src);
    const answers = Array.from(screen.element.querySelectorAll(`input:checked`));

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
  };
  return screen;
};
