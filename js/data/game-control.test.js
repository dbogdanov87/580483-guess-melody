import {assert} from 'chai';
import {INITIAL_GAME, changeLevel, changeAttempts, changeTime} from '../game-control.js';

describe(`Проверка изменения уровней`, () => {

  it(`Уровень должен изменяться`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 1).level, 1);
    assert.equal(changeLevel(INITIAL_GAME, 2).level, 2);
    assert.equal(changeLevel(INITIAL_GAME, 10).level, 10);
  });
});

describe(`Проверка изменения времени`, () => {

  it(`Время должен изменяться`, () => {
    assert.equal(changeTime(INITIAL_GAME, 100).time, 100);
    assert.equal(changeTime(INITIAL_GAME, 200).time, 200);
    assert.equal(changeTime(INITIAL_GAME, 1).time, 1);
  });
});

describe(`Проверка изменения попыток`, () => {

  it(`Попытки должен изменяться`, () => {
    assert.equal(changeAttempts(INITIAL_GAME, 1).attempts, 1);
    assert.equal(changeAttempts(INITIAL_GAME, 2).attempts, 2);
    assert.equal(changeAttempts(INITIAL_GAME, 0).attempts, 0);
  });
});
