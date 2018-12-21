import {changeScreen} from './util.js';
import WelcomeScreen from '../js/screen/welcome-screen.js';
import GameModel from './model/game-model.js';
import GameScreen from '../js/screen/game-screen.js';
import ResultScreen from '../js/screen/result-screen.js';

export default class Application {

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    changeScreen(welcomeScreen.element);
  }

  static showGame() {
    const model = new GameModel();
    const gameScreen = new GameScreen(model);
    changeScreen(gameScreen.element);
    gameScreen.startGame();

  }

  static showResult(stats) {
    const resultScreen = new ResultScreen(stats);
    changeScreen(resultScreen.element);
  }

}
