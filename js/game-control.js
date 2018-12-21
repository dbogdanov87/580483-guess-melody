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

export const changeScore = (game, score) => {
  if (typeof score !== `number`) {
    throw new Error(`Очки пользователя должены быть числом`);
  }

  return Object.assign({}, game, {
    score
  });
};
