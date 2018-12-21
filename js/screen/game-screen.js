import {changeScreen} from '../util.js';
import HeaderView from '../view/header-view.js';
import GameTypeView from '../view/game-type-view.js';
import ArtistView from '../view/artist-view.js';
import GenreView from '../view/genre-view.js';
import Application from '../application.js';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.viewGameHeader = new HeaderView(this.model.state);
    this.viewGameType = new GameTypeView(this.model.state.level);
    this.viewGameQuestion = (this.model.isGameGenre()) ? new GenreView(this.model.state) : new ArtistView(this.model.state);

    this.viewGameType.element.insertAdjacentElement(`afterbegin`, this.viewGameHeader.element);
    this.viewGameType.element.querySelector(`.game__screen`).insertAdjacentElement(`beforeend`, this.viewGameQuestion.element);

    this._timer = 0;
  }

  get element() {
    return this.viewGameType.element;
  }

  stopTimer() {
    clearInterval(this._timer);
  }

  _tick() {
    this.model.tick();
    this.updateHeader();
    this._timer = setTimeout(() => this._tick(), 1000);
    this.timeIsOver();
  }

  startGame() {
    this._tick();
    this.changeLevel();
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.viewGameType.element.replaceChild(header.element, this.viewGameHeader.element);
    this.viewGameHeader = header;
    this.restart();
  }

  changeLevel() {
    this.viewGameQuestion.onAnswer = () => {
      this.compareAnswers();
      if (this.model.state.level === this.model.state.maxLevel) {
        this.stopTimer();
        this.model.updateScore(this.model.state.userAnswers);
        Application.showResult(this.model.state);
      } else {
        this.model.nextLevel();
        const gameScreen = new GameScreen(this.model);
        this.stopTimer();
        gameScreen.startGame();
        changeScreen(gameScreen.element);
      }
    };
  }

  timeIsOver() {
    if (this.model.state.time === 0) {
      Application.showResult(this.model.state);
      this.stopTimer();
    }
  }

  getUserAnswerArtist() {
    return this.viewGameQuestion.element.querySelector(`img`).src;
  }


  getUserAnswersGenre() {
    const answersUser = [];
    const answers = Array.from(this.viewGameType.element.querySelectorAll(`input:checked`));

    answers.forEach((item) => {
      const audioSrc = item.parentElement.parentElement.querySelector(`audio`).src;
      answersUser.push(audioSrc);
    });
    return answersUser.join(`,`);
  }

  getGameAnswer() {
    return this.model.isGameGenre() ? this.model.getGameAnswerGenre() : this.model.getGameAnswerArtist();
  }

  getUserAnswer() {
    return this.model.isGameGenre() ? this.getUserAnswersGenre() : this.getUserAnswerArtist();
  }

  compareAnswers() {
    const userAnswer = this.getUserAnswer();
    const gameAnswer = this.getGameAnswer();
    const answerUser = userAnswer === gameAnswer;
    this.model.updateUserAnswers(answerUser, this.model.state.time);
    if (!answerUser) {
      this.model.lossAttempt();
    }
    if (this.model.state.attempts === 0) {
      Application.showResult(this.model.state);
      this.stopTimer();
    }
  }

  restart() {
    this.viewGameHeader.gameBackLink = () => Application.showWelcome();
    this.stopTimer();
  }
}
