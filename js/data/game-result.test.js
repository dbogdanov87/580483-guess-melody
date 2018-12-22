import {assert} from 'chai';
import {getDefeatMessage, getGameResult} from '../game-result.js';

const statistics = [4, 5, 8, 10, 11];

const testCase1 = {
  score: 12,
  attempts: 2,
  time: 50
};

const testCase2 = {
  score: 6,
  attempts: 0,
  time: 100
};

const testCase3 = {
  score: 6,
  attempts: 1,
  time: 0
};

describe(`Проверка вывода результатов игры`, () => {

  it(`Победил в игре и занял 1 место`, () => {
    assert.equal(`Вы заняли 1 место из 6 игроков. Это лучше, чем у 83% игроков`, getGameResult(statistics, testCase1).text);
  });

  it(`Проиграл в игре - закончились попытки`, () => {
    assert.equal(getDefeatMessage(testCase2).text, getGameResult(statistics, testCase2).text);
  });

  it(`Проиграл в игре - закончилось время`, () => {
    assert.equal(getDefeatMessage(testCase3).text, getGameResult(statistics, testCase3).text);
  });
});
