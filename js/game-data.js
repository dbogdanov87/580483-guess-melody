import {melodies} from '../js/melodies.js';

export const INITIAL_GAME = Object.freeze({
  level: 0,
  maxLevel: 9,
  attempts: 3,
  score: 0,
  time: 300,
  userAnswers: []
});

export const gameQuestions = [
  {
    type: `game--genre`,
    name: `Выберите ${melodies[2].genre} треки`,
    melody: [melodies[2]],
    answers: [melodies[3], melodies[1], melodies[1], melodies[2]],
  },
  {
    type: `game--genre`,
    name: `Выберите ${melodies[0].genre} треки`,
    melody: [melodies[0]],
    answers: [melodies[3], melodies[1], melodies[2], melodies[0]],
  },
  {
    type: `game--genre`,
    name: `Выберите ${melodies[3].genre} треки`,
    melody: [melodies[3]],
    answers: [melodies[0], melodies[1], melodies[2], melodies[3]],
  },
  {
    type: `game--genre`,
    name: `Выберите ${melodies[2].genre} треки`,
    melody: [melodies[2]],
    answers: [melodies[3], melodies[1], melodies[0], melodies[2]],
  },
  {
    type: `game--genre`,
    name: `Выберите ${melodies[4].genre} треки`,
    melody: [melodies[4]],
    answers: [melodies[3], melodies[1], melodies[2], melodies[4]],
  },
  {
    type: `game--artist`,
    name: `Кто исполняет эту песню?`,
    melody: melodies[4],
    answers: [melodies[1], melodies[0], melodies[4]],
  },
  {
    type: `game--artist`,
    name: `Кто исполняет эту песню?`,
    melody: melodies[3],
    answers: [melodies[1], melodies[0], melodies[3]],
  },
  {
    type: `game--artist`,
    name: `Кто исполняет эту песню?`,
    melody: melodies[5],
    answers: [melodies[2], melodies[1], melodies[5]],
  },
  {
    type: `game--artist`,
    name: `Кто исполняет эту песню?`,
    melody: melodies[3],
    answers: [melodies[1], melodies[2], melodies[3]],
  },
  {
    type: `game--artist`,
    name: `Кто исполняет эту песню?`,
    melody: melodies[2],
    answers: [melodies[4], melodies[0], melodies[2]],
  },
];
