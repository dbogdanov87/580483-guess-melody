export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`AbstractView должен обязательно наследоваться`);
    }
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  get template() {
    throw new Error(`Шаблон - обязательный метод`);
  }

  bind() {
  }

  render() {
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = this.template.trim();
    return wrapper;
  }
}
