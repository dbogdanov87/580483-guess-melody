import WelcomeView from '../view/welcome-view.js';
import {INITIAL_GAME} from '../game-data.js';
import Application from '../application.js';

export default class welcomeScreen {
  constructor() {
    this.state = INITIAL_GAME;
    this.gameWelcome = new WelcomeView(this.state);
    this.bind();
  }

  get element() {
    return this.gameWelcome.element;
  }

  bind() {
    this.gameWelcome.onWelcomeButton = () => Application.showGame();
  }
}
