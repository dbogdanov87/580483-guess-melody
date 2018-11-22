'use strict';

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

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

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case LEFT_ARROW:
      selectScreen(currentScreen - 1);
      break;
    case RIGHT_ARROW:
      selectScreen(currentScreen + 1);
      break;
  }
});

const divArrowButton = document.createElement(`div`);
divArrowButton.innerHTML = `<div class="arrows__wrap">
                                <style>
                                  .arrows__wrap {
                                    position: absolute;
                                    top: 135px;
                                    left: 50%;
                                    margin-left: -56px;
                                  }
                                  .arrows__btn {
                                    background: none;
                                    border: 2px solid black;
                                    padding: 5px 20px;
                                  }
                                </style>
                                <button class="arrows__btn"><-</button>
                                <button class="arrows__btn">-></button>
                            </div>`;

mainElement.parentNode.insertBefore(divArrowButton, mainElement.nextSibling);

document.querySelector(`.arrows__wrap`).addEventListener(`click`, (evt) => {
  switch (evt.target.innerText) {
    case `->`:
      selectScreen(currentScreen - 1);
      break;
    case `<-`:
      selectScreen(currentScreen + 1);
      break;
  }
});
