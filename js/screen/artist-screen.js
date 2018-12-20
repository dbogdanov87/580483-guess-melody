import {changeQuestionScreen, changeAttempts} from '../game-control.js';
import ArtistView from '../template/artist-view.js';
import {gameQuestions} from '../game-data.js';

export const artistScreen = (state) => {

  const screen = new ArtistView(state);
  const currentLevel = gameQuestions[state.level];

  screen.onAnswer = (answer) => {
    if (answer.querySelector(`img`).src === currentLevel.melody.image) {
      state.userAnswers.push({answer: true, time: 30});
      changeQuestionScreen(state);
    } else {
      state.userAnswers.push({answer: false, time: 30});
      changeQuestionScreen(changeAttempts(state, state.attempts - 1));
    }
  };
  return screen;
};
