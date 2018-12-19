import {changeScreen} from '../js/util.js';
import {INITIAL_GAME} from '../js/game-data.js';
import welcomeTemplate from '../js/template/welcome.js';

changeScreen(welcomeTemplate(INITIAL_GAME));
