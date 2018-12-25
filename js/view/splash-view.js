import AbstractView from '../view/abstract-view.js';

const splashSettings = {
  cursor: 0,
  splashSwitchingTime: 50 // в милесекундах
};

export default class SplashScreen extends AbstractView {
  constructor() {
    super();
    this.cursor = 0;
    this.symbolsSeq = `/—\\|`;
  }

  get template() {
    return `<div></div>`;
  }

  start() {
    this.cursor = ++this.cursor >= this.symbolsSeq.length ? splashSettings.cursor : this.cursor;
    this.element.textContent = this.symbolsSeq[this.cursor];
    this.timeout = setTimeout(() => this.start(), splashSettings.splashSwitchingTime);
  }

  stop() {
    clearTimeout(this.timeout);
  }
}
