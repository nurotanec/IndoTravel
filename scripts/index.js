import {timer} from './modules/timer.js';
import './modules/acc.js';
import './modules/burger.js';

{
  const init = () => {
    timer();
  };

  window.timerInit = init;
}
