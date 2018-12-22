import {changeScreen} from '../util.js';
import HeaderView from '../view/header-view.js';
import GameTypeView from '../view/game-type-view.js';
import ArtistView from '../view/artist-view.js';
import GenreView from '../view/genre-view.js';
import Application from '../application.js';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.viewGameHeader = new HeaderView(this.model.currentDataQuestion);
    this.viewGameType = new GameTypeView(this.model.currentDataQuestion);
    this.viewGameQuestion = (this.model.isGameGenre()) ? new GenreView(this.model.currentDataQuestion) : new ArtistView(this.model.currentDataQuestion);

    this.viewGameType.element.insertAdjacentElement(`afterbegin`, this.viewGameHeader.element);
    this.viewGameType.element.querySelector(`.game__screen`).insertAdjacentElement(`beforeend`, this.viewGameQuestion.element);

    this._timer = 0;
    this.bind();
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
    if (this.model.state.level === this.model.state.maxLevel) {
      this.stopTimer();
      this.model.updateScore(this.model.state.userAnswers);
      Application.showResult(this.model.state);
    }
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.viewGameType.element.replaceChild(header.element, this.viewGameHeader.element);
    this.viewGameHeader = header;
    this.restart();
  }

  timeIsOver() {
    if (this.model.state.time === 0) {
      Application.showResult(this.model.state);
      this.stopTimer();
    }
  }

  getUserAnswerArtist(element) {
    return element.querySelector(`input`).getAttribute(`value`);
  }


  getUserAnswersGenre() {
    const answersUser = [];
    const answers = Array.from(this.viewGameType.element.querySelectorAll(`input:checked`));

    answers.forEach((item) => {
      const inputId = item.getAttribute(`value`);
      answersUser.push(inputId);
    });
    return answersUser.join(`,`);
  }

  getUserAnswer(element) {
    return this.model.isGameGenre() ? this.getUserAnswersGenre() : this.getUserAnswerArtist(element);
  }

  compareAnswers(element) {
    const userAnswer = this.getUserAnswer(element);
    const gameAnswer = this.model.getIdCorrectAnswers();

    const answerUser = userAnswer === gameAnswer;
    this.model.updateUserAnswers(answerUser, this.model.state.time);
    if (!answerUser) {
      this.model.lossAttempt();
    }
  }

  restart() {
    this.viewGameHeader.gameBackLink = () => Application.showWelcome();
    this.stopTimer();
  }

  bind() {
    this.viewGameQuestion.onAnswer = (element) => {
      this.stopTimer();
      this.compareAnswers(element);
      if (this.model.state.attempts === 0) {
        this.stopTimer();
        Application.showResult(this.model.state);
      }
      this.model.nextLevel();
      const gameScreen = new GameScreen(this.model);
      changeScreen(gameScreen.element);
      gameScreen.startGame();
    };
  }
}
