import ResultView from '../view/result-view.js';
import Application from '../application.js';

export default class resultScreen {
  constructor(result) {
    this.result = result;
    this.view = new ResultView(this.result);
    this.bind();
  }

  get element() {
    return this.view.element;
  }

  bind() {
    this.view.onReplayButton = () => Application.showWelcome();
  }
}
