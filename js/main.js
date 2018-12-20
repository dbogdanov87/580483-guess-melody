import {changeScreen} from '../js/util.js';
import {INITIAL_GAME} from '../js/game-data.js';
import {welcomeScreen} from './screen/game-screen.js';

changeScreen(welcomeScreen(INITIAL_GAME).element);
