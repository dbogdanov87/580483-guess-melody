'use strict';

const screenNumbers = {
  welcome: 0,
};

const mainElement = document.querySelector(`section.main`);

const screens = Array.from(document.querySelectorAll(`template`)).map((it) => it.content);

const showScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

let currentScreen = 0;
const selectScreen = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  currentScreen = index;
  showScreen(screens[currentScreen]);
};

selectScreen(screenNumbers.welcome);

