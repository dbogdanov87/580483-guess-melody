import {changeScreen} from '../util.js';
import {INITIAL_GAME, gameQuestions} from '../game-data.js';
import WelcomeView from '../template/welcome-view.js';
import GameTypeView from '../template/game-type-view.js';
import {artistScreen} from '../screen/artist-screen.js';
import {genreScreen} from '../screen/genre-screen.js';
import GameHeaderView from '../template/header-view.js';
import ResultView from '../template/result-view.js';

export const welcomeScreen = () => {
  const screen = new WelcomeView(INITIAL_GAME);

  screen.onWelcomeButton = (state) => {
    changeScreen(gameTypeScreen(state).element);
  };

  return screen;
};

export const gameHeader = (state) => {
  const screen = new GameHeaderView(state);

  screen.onGameBackBtn = () => {
    changeScreen(welcomeScreen(INITIAL_GAME).element);
  };
  return screen;
};

export const gameTypeScreen = (state) => {
  const screen = new GameTypeView(state);

  const currentLevel = gameQuestions[state.level];
  const content = (currentLevel.type === `game--genre`) ? genreScreen(state).element : artistScreen(state).element;

  screen.element.insertAdjacentElement(`afterbegin`, gameHeader(state).element);
  screen.element.querySelector(`.game__screen`).insertAdjacentElement(`beforeend`, content);

  return screen;
};

export const resultScreen = (state) => {
  const screen = new ResultView(state);

  screen.onReplayButton = () => {
    changeScreen(welcomeScreen(INITIAL_GAME).element);
  };

  return screen;
};
