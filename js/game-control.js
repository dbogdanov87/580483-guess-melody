import {changeScreen} from './util.js';
import {resultScreen, gameTypeScreen} from './screen/game-screen.js';

export const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Уровень должен быть числом`);
  }

  if (level < 0) {
    throw new Error(`Уровень не может быть отрицательным числом`);
  }

  return Object.assign({}, game, {
    level
  });
};

export const changeAttempts = (game, attempts) => {
  if (typeof attempts !== `number`) {
    throw new Error(`Количество попыток должно быть числом`);
  }

  if (attempts < 0) {
    throw new Error(`Количество попыток не может быть отрицательным`);
  }

  return Object.assign({}, game, {
    attempts
  });
};

export const changeTime = (game, time) => {
  if (typeof time !== `number`) {
    throw new Error(`Время должно быть числом`);
  }

  if (time < 0) {
    throw new Error(`Время не может быть отрицательным`);
  }

  return Object.assign({}, game, {
    time
  });
};

export const changeQuestionScreen = (state) => {
  if (state.attempts && state.level < state.maxLevel) {
    const nextState = changeLevel(state, state.level + 1);
    changeScreen(gameTypeScreen(nextState).element);
  } else {
    changeScreen(resultScreen(state).element);
  }
};
