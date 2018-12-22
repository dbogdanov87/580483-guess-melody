import AbstractView from './abstract-view.js';

export default class ErrorLoadingView extends AbstractView {

  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `<section class="modal">
        <h2 class="modal__title">Произошла ошибка!</h2>
        <p class="modal__text">Текст ошибки: ${this.error.message}. Пожалуйста, перезагрузите страницу.</p>
      </section>`;
  }
}
