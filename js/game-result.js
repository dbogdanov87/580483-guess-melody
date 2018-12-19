export const getDefeatMessage = (results) => {
  const defeatByTimeMessages = {
    title: `Увы и ах!`,
    text: `Время вышло! Вы не успели отгадать все мелодии`
  };
  const defeatByAttemptsMessages = {
    title: `Какая жалость!`,
    text: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
  };
  let messages = {};
  if (results.time <= 0) {
    messages.title = defeatByTimeMessages.title;
    messages.text = defeatByTimeMessages.text;
  } else if (results.attempts <= 0) {
    messages.title = defeatByAttemptsMessages.title;
    messages.text = defeatByAttemptsMessages.text;
  }
  return messages;
};

const getVictoryMessage = (playersResult, score) => {
  const messages = {};
  const results = playersResult.slice();
  results.push(score);
  results.sort((a, b) => b - a);

  const place = results.indexOf(score) + 1;
  const allPlaces = results.length;
  const successRate = Math.round((allPlaces - place) / allPlaces * 100);
  messages.title = `Вы настоящий меломан!`;
  messages.text = `Вы заняли ${place} место из ${allPlaces} игроков. Это лучше, чем у ${successRate}% игроков`;

  return messages;
};

export const getGameResult = (playersResult, currentResult) => {
  if (!Array.isArray(playersResult)) {
    throw new Error(`Результаты игроков должны быть массивом`);
  }

  if (typeof currentResult !== `object`) {
    throw new Error(`Текущий результат должен быть объектом`);
  }

  return (currentResult.score > 0 && currentResult.time > 0 && currentResult.attempts > 0) ? getVictoryMessage(playersResult, currentResult.score) : getDefeatMessage(currentResult);
};
