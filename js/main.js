'use strict';

const mainElement = document.querySelector(`section.main`);

const screens = Array.from(document.querySelectorAll(`template`)).map((it) => it.content);

const selectScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

