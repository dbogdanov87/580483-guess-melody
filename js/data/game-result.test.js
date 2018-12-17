import {assert} from 'chai';
import {defeatMessages, gameResult} from '../game-result.js';

const statistics = [4, 5, 8, 10, 11];

const testCase1 = {
  score: 12,
  attempts: 2,
  time: 50
};

const testCase2 = {
  score: 7,
  attempts: 3,
  time: 80
};

const testCase3 = {
  score: 6,
  attempts: 0,
  time: 100
};

const testCase4 = {
  score: 6,
  attempts: 1,
  time: 0
};

describe(`Проверка вывода результатов игры`, () => {

  it(`Победил в игре и занял 1 место`, () => {
    assert.equal(`Вы заняли 1 место из 6 игроков. Это лучше, чем у 83% игроков`, gameResult(statistics, testCase1));
  });

  it(`Победил в игре и занял 4 место`, () => {
    assert.equal(`Вы заняли 4 место из 6 игроков. Это лучше, чем у 33% игроков`, gameResult(statistics, testCase2));
  });

  it(`Проиграл в игре - закончились попытки`, () => {
    assert.equal(defeatMessages.ATTEMPTS_IS_OVER, gameResult(statistics, testCase3));
  });

  it(`Проиграл в игре - закончилось время`, () => {
    assert.equal(defeatMessages.TIME_IS_OVER, gameResult(statistics, testCase4));
  });
});
