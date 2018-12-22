import {changeLevel, changeTime, changeAttempts, changeScore} from '../game-control.js';
import {INITIAL_GAME, gameQuestions} from '../game-data.js';
import {scoring} from '../game-scoring.js';

const getLevel = (state) => gameQuestions[state.level];

export default class GameModel {
  constructor(data) {
    this.data = data;
    this.restart();

  }

  get state() {
    return Object.freeze(this._state);
  }

  get currentLevel() {
    return getLevel(this._state);
  }

  nextLevel() {
    this._state = changeLevel(this._state, this._state.level + 1);
  }

  lossAttempt() {
    this._state = changeAttempts(this._state, this._state.attempts - 1);
  }

  getGameAnswerGenre() {
    return gameQuestions[this._state.level].melody.map((item) => item.src).join(`,`);
  }

  getGameAnswerArtist() {
    return gameQuestions[this._state.level].melody.image;
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
    return this.currentLevel.type === `game--genre`;
  }

  updateScore(userAnswers) {
    const result = {};
    result.score = scoring(userAnswers);
    this._state = changeScore(this._state, result.score);
  }
}
