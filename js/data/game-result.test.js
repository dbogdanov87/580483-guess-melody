import {assert} from 'chai';
import {getDefeatMessage, getGameResult} from '../game-result.js';

const statistics = [4, 5, 8, 10, 11];

const testCase1 = {
  score: 6,
  attempts: 3,
  time: 100
};

const testCase2 = {
  score: 6,
  attempts: 1,
  time: 0
};

describe(`Проверка вывода результатов игры`, () => {

  it(`Проиграл в игре - закончились попытки`, () => {
    assert.equal(getDefeatMessage(testCase1).text, getGameResult(statistics, testCase1).text);
  });

  it(`Проиграл в игре - закончилось время`, () => {
    assert.equal(getDefeatMessage(testCase2).text, getGameResult(statistics, testCase2).text);
  });
});
