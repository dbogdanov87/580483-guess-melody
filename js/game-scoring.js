const MAX_COUNT_ANSWERS = 10;
const TIME_FAST_ANSWER = 29;
const GAME_OVER = -1;

const answerPoints = {
  CORRECT: 1,
  FAST_CORRECT: 2,
  MISTAKE: -2
};

const initScore = {
  START: 0,
};


export const scoring = (userAnswers, quantityNotes) => {
  let score = initScore.START;

  if (!Array.isArray(userAnswers)) {
    throw new Error(`Ответы пользователя должны быть массивом`);
  }

  if ((typeof quantityNotes !== `number`)) {
    throw new Error(`Количество но должно быть типом number`);
  }

  if (userAnswers.length < MAX_COUNT_ANSWERS || quantityNotes === 0) {
    return GAME_OVER;
  }

  userAnswers.forEach((item) => {
    if (!item.answer) {
      score += answerPoints.MISTAKE;
    } else if (item.time <= TIME_FAST_ANSWER) {
      score += answerPoints.FAST_CORRECT;
    } else {
      score += answerPoints.CORRECT;
    }
  });
  return score;
};
