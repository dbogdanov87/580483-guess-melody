import {changeScreen} from '../util.js';
import HeaderView from '../view/header-view.js';
import GameTypeView from '../view/game-type-view.js';
import ArtistView from '../view/artist-view.js';
import GenreView from '../view/genre-view.js';
import Application from '../application.js';
import ModalConfirmView from '../view/modal-confirm-view.js';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.viewModalConfirm = new ModalConfirmView();
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
    this.viewGameHeader.gameBackLink = () => {
      this.viewModalConfirm.show();
    };
    this.stopTimer();
  }

  audioPleer(button, audio) {
    if (button.classList.contains(`track__button--play`)) {
      audio.play();
    } else {
      audio.pause();
    }
    button.classList.toggle(`track__button--play`);
    button.classList.toggle(`track__button--pause`);
  }

  audioAdd(button, audio) {
    this.audio = audio;
    this.button = button;
  }

  audioDelete() {
    delete this.audio;
    delete this.button;
  }

  audioSwitch(button, audio) {
    if (this.audio && this.audio === audio) {
      this.audioPleer(this.button, this.audio);
      this.audioDelete();
    } else {
      if (this.audio && this.audio !== audio) {
        this.audioPleer(this.button, this.audio);
        this.audioAdd(button, audio);
        this.audioPleer(this.button, this.audio);
      } else {
        this.audioAdd(button, audio);
        this.audioPleer(this.button, this.audio);
      }
    }
  }

  bind() {

    this.viewGameQuestion.onPlayPause = (button, audio) => {
      this.audioSwitch(button, audio);
    };

    this.viewGameQuestion.onAnswer = (element) => {
      this.stopTimer();
      this.compareAnswers(element);

      if (this.model.state.attempts === 0) {
        this.stopTimer();
        Application.showResult(this.model.state);
      } else {
        this.model.nextLevel();
        const gameScreen = new GameScreen(this.model);
        changeScreen(gameScreen.element);
        gameScreen.startGame();
        this.audioDelete();
      }
    };

    this.viewGameQuestion.onCheckbox = () => {
      this.element.querySelector(`.game__submit`).disabled = this.getUserAnswersGenre().length <= 0;
    };

    this.viewModalConfirm.onCancel = () => {
      this.startGame();
      this.viewModalConfirm.element.remove();
    };

    this.viewModalConfirm.onConfirm = () => {
      this.viewModalConfirm.element.remove();
      Application.start();
    };
  }
}
