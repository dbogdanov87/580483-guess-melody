import {assert} from 'chai';
import {scoring} from '../game-scoring.js';

// все вопросы, но не быстро = 10
const testCase2 = [
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 32}
];
// ответил быстро/не быстро и не на все правильно - 7 баллов
const testCase3 = [
  {answer: false, time: 7},
  {answer: true, time: 30},
  {answer: true, time: 31},
  {answer: true, time: 32},
  {answer: true, time: 7},
  {answer: true, time: 30},
  {answer: false, time: 7},
  {answer: true, time: 10},
  {answer: true, time: 15},
  {answer: true, time: 35}
];

// ответил на все быстро = 20
const testCase4 = [
  {answer: true, time: 7},
  {answer: true, time: 8},
  {answer: true, time: 7},
  {answer: true, time: 9},
  {answer: true, time: 7},
  {answer: true, time: 4},
  {answer: true, time: 7},
  {answer: true, time: 3},
  {answer: true, time: 7},
  {answer: true, time: 7}
];


describe(`Проверка подсчета набранных баллов`, () => {

  it(`Ответил на все вопросы правильно и не быстро(10 баллов)`, () => {
    assert.equal(10, scoring(testCase2));
  });

  it(`Ответил быстро и не быстро и не на все правильно(7 баллов)`, () => {
    assert.equal(7, scoring(testCase3));
  });

  it(`Ответил на все быстро и правильно(20 баллов)`, () => {
    assert.equal(20, scoring(testCase4));
  });

});
