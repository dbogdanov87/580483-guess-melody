import {changeScreen} from './util.js';
import WelcomeScreen from '../js/screen/welcome-screen.js';
import GameModel from './model/game-model.js';
import GameScreen from '../js/screen/game-screen.js';
import ResultScreen from '../js/screen/result-screen.js';
import SplashScreen from './view/splash-view.js';
import ErrorLoadingView from './view/error-view.js';
import {adaptServerData} from './adaptive-data.js';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let questData;

export default class Application {

  static start() {
    const splash = new SplashScreen();
    changeScreen(splash.element);
    splash.start();
    window.fetch(`https://es.dump.academy/guess-melody/questions`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => this.data = adaptServerData(data)).
      then((response) => Application.showWelcome()).
      catch(Application.showError).

      then(() => splash.stop());
    console.log(questData);

  }

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    changeScreen(welcomeScreen.element);
  }

  static showGame(data) {
    const model = new GameModel();
    const gameScreen = new GameScreen(data, model);
    changeScreen(gameScreen.element);
    gameScreen.startGame();

  }

  static showResult(stats) {
    const resultScreen = new ResultScreen(stats);
    changeScreen(resultScreen.element);
  }

  static showError(error) {
    const errorView = new ErrorLoadingView(error);
    changeScreen(errorView.element);
  }

}
