import {renderScreen} from '../util.js';
import headerTemplate from './header.js';
import genreTemplate from './game-genre.js';
import artistTemplate from './game-artist.js';
import {gameQuestions} from '../game-data.js';

const gameTemplate = (question) => `<section class="game ${question.type}">
    <section class="game__screen">
      <h2 class="game__title">${question.name}</h2>
    </section>
  </section>`;

export default (state) => {
  const currentLevel = gameQuestions[state.level];

  const element = renderScreen(gameTemplate(currentLevel));
  const gameElement = element.querySelector(`.game`);
  const gameScreenElement = gameElement.querySelector(`.game__screen`);
  const questionTemplate = (currentLevel.type === `game--genre`) ? genreTemplate(state) : artistTemplate(state);

  gameElement.insertAdjacentElement(`beforebegin`, headerTemplate(state));
  gameScreenElement.insertAdjacentElement(`beforeend`, questionTemplate);
  return element;
};
