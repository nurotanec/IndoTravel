export const timer = () => {
  const timerBlockDay = document.querySelector('.timer__count_days');
  const timerBlockHour = document.querySelector('.timer__count_hours');
  const timerBlockMin = document.querySelector('.timer__count_minutes');
  const timerUnitDay = document.querySelector('.timer__units_days');
  const timerUnitHour = document.querySelector('.timer__units_hours');
  const timerUnitMin = document.querySelector('.timer__units_minutes');

  const getTime = (timeRemaining) => {
    const newDay = Math.floor(timeRemaining / 1000 / 60 / 60 / 24 % 31);
    const newHour = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const newMin = Math.floor(timeRemaining / 1000 / 60 % 60);
    return {newDay, newHour, newMin};
  };

  const setNewTime = ({newDay, newHour, newMin}) => {
    timerBlockDay.textContent = newDay;
    timerBlockHour.textContent = newHour < 10 ? `0${newHour}` : newHour;
    timerBlockMin.textContent = newMin < 10 ? `0${newMin}` : newMin;

    if (newDay === 1) {
      timerUnitDay.textContent = 'день';
    } else if (newDay < 5) {
      timerUnitDay.textContent = 'дня';
    } else {
      timerUnitDay.textContent = 'дней';
    }
    if (newHour === 1) {
      timerUnitHour.textContent = 'час';
    } else if (newHour < 5) {
      timerUnitHour.textContent = 'часа';
    } else {
      timerUnitHour.textContent = 'часов';
    }
    if (newMin === 1) {
      timerUnitMin.textContent = 'минута';
    } else if (newMin < 5) {
      timerUnitMin.textContent = 'минуты';
    } else {
      timerUnitMin.textContent = 'минут';
    }
  };

  const getTimeRemaining = () => {
    const timer = document.querySelector('.timer');
    const deadline = timer.getAttribute('data-timer-deadline');
    const [day, month, year] = deadline.split('/');
    const dateStop = new Date(year, month, day).getTime();
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    setNewTime(getTime(timeRemaining));

    const intervalId = setTimeout(getTimeRemaining, 1000);

    if (timeRemaining <= 0) {
      clearTimeout(intervalId);
      const heroText = document.querySelector('.hero__text');
      const heroTimer = document.querySelector('.hero__timer');

      heroText.remove();
      heroTimer.remove();
    }
  };

  getTimeRemaining();
};
