const TIME_FAST_ANSWER = 29;

const answerPoints = {
  CORRECT: 1,
  FAST_CORRECT: 2,
  MISTAKE: -2
};

const initScore = {
  START: 0,
};


export const scoring = (userAnswers) => {
  let score = initScore.START;

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
