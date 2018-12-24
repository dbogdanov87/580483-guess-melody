import {changeLevel, changeTime, changeAttempts, changeScore} from '../game-control.js';
import {INITIAL_GAME} from '../game-data.js';
import {scoring} from '../game-scoring.js';

export default class GameModel {
  constructor(data) {
    this.data = data;
    this.restart();

  }

  get state() {
    return Object.freeze(this._state);
  }

  get currentDataQuestion() {
    return this.data[this._state.level];
  }

  switchToNextLevel() {
    this._state = changeLevel(this._state, this._state.level + 1);
  }

  loseAttempt() {
    this._state = changeAttempts(this._state, this._state.attempts - 1);
  }

  getIdCorrectAnswers() {
    const correctSrcAnswers = [];
    this.currentDataQuestion.answers.forEach((answer, item) => {
      if (answer.isCorrect) {
        correctSrcAnswers.push(item);
      }
    });
    return correctSrcAnswers.join(`,`);
  }

  restart() {
    this._state = INITIAL_GAME;
  }

  tick() {
    this._state = changeTime(this._state, this._state.time - 1);
  }

  updateUserAnswers(userAnswer, answerTime) {
    this.state.userAnswers.push({answer: userAnswer, time: Math.abs(INITIAL_GAME.time - answerTime)});
  }

  isGameGenre() {
    return this.currentDataQuestion.type === `genre`;
  }

  updateScore(userAnswers) {
    const result = {};
    result.score = scoring(userAnswers);
    this._state = changeScore(this._state, result.score);
  }
}
