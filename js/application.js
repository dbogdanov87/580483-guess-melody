import {changeScreen} from './util.js';
import WelcomeScreen from '../js/screen/welcome-screen.js';
import GameModel from './model/game-model.js';
import GameScreen from '../js/screen/game-screen.js';
import ResultScreen from '../js/screen/result-screen.js';
import SplashScreen from './view/splash-view.js';
import ErrorLoadingView from './view/error-view.js';
import Loader from './loader.js';

let gameData;
let statisticsAllPlayers = [];

export default class Application {

  static start() {
    const splash = new SplashScreen();
    changeScreen(splash.element);
    splash.start();
    Loader.loadData()
      .then((data) => gameData = data)
      .then(() => Application.showWelcome())
      .catch(Application.showError)
      .then(() => splash.stop());
  }

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    changeScreen(welcomeScreen.element);
  }

  static showGame() {
    const model = new GameModel(gameData);
    const gameScreen = new GameScreen(model);
    changeScreen(gameScreen.element);
    gameScreen.startGame();

  }

  static showResult(result) {
    this.result = result;

    if (this.result.score > 0 || this.result.attempts > 0) {
      Loader.saveResults(this.result)
        .then(() => Loader.loadResults())
        .then((data) => (statisticsAllPlayers = data))
        .then(() => {
          const resultScreen = new ResultScreen(statisticsAllPlayers, this.result);
          changeScreen(resultScreen.element);
        })
        .catch(Application.showError);
    } else {
      const resultScreen = new ResultScreen(statisticsAllPlayers, result);
      changeScreen(resultScreen.element);
    }
  }

  static showError(error) {
    const errorView = new ErrorLoadingView(error);
    changeScreen(errorView.element);
  }

}
