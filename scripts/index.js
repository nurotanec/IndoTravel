import {timer} from './modules/timer.js';
import './modules/acc.js';
import './modules/burger.js';
import './modules/fly.js';
import './modules/fetchData.js';

{
  const init = () => {
    timer();
  };

  window.timerInit = init;
}
