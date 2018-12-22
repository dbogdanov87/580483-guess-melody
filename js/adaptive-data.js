const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

const answersMap = (genre, answers) => answers.map((answer) => {
  return {
    src: answer.src,
    genre: answer.genre,
    isCorrect: answer.genre === genre
  };
});

export const adaptServerData = (data) => {
  for (const level of data) {
    if (level.type === QuestionType.GENRE) {
      level.answers = answersMap(level.genre, level.answers);
    }
  }
  return data;
};
