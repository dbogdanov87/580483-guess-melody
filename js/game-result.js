export const defeatMessages = {
  TIME_IS_OVER: `Время вышло! Вы не успели отгадать все мелодии`,
  ATTEMPTS_IS_OVER: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
};

const getDefeatMessage = (results) => {
  let message = ``;
  if (results.time <= 0) {
    message = defeatMessages.TIME_IS_OVER;
  } else if (results.attempts <= 0) {
    message = defeatMessages.ATTEMPTS_IS_OVER;
  }
  return message;
};

export const getVictoryMessage = (playersResult, score) => {
  const results = playersResult.slice();
  results.push(score);
  results.sort((a, b) => b - a);

  const place = results.indexOf(score) + 1;
  const allPlaces = results.length;
  const successRate = Math.round((allPlaces - place) / allPlaces * 100);

  return `Вы заняли ${place} место из ${allPlaces} игроков. Это лучше, чем у ${successRate}% игроков`;
};

export const gameResult = (playersResult, currentResult) => {
  if (!Array.isArray(playersResult)) {
    throw new Error(`Результаты игроков должны быть массивом`);
  }

  if (typeof currentResult !== `object`) {
    throw new Error(`Текущий результат должен быть объектом`);
  }

  return (currentResult.score > 0 && currentResult.time > 0 && currentResult.attempts > 0) ? getVictoryMessage(playersResult, currentResult.score) : getDefeatMessage(currentResult);
};
