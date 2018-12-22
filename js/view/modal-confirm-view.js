import AbstractView from './abstract-view.js';

export default class ModalConfirmView extends AbstractView {

  constructor() {
    super();
  }

  get template() {
    return `<section class="modal">
  <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
  <h2 class="modal__title">Подтверждение</h2>
  <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
<div class="modal__buttons">
  <button id="confirm" class="modal__button button">Ок</button>
  <button id="cancel" class="modal__button button">Отмена</button>
  </div>
  </section>`;
  }

  show() {
    document.body.appendChild(this.element);
  }

  bind() {
    const buttonConfirm = this.element.querySelector(`#confirm`);
    const buttonCancel = this.element.querySelector(`#cancel`);

    buttonConfirm.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onConfirm();
    });

    buttonCancel.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onCancel();
    });
  }

  onConfirm() {
  }

  onCancel() {
  }

}
