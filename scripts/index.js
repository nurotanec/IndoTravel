import {timer} from './modules/timer.js';
import './modules/acc.js';
import './modules/burger.js';
import './modules/fly.js';

{
  const init = () => {
    timer();
  };

  window.timerInit = init;
}
