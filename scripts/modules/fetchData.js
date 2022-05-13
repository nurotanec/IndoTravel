/* eslint-disable max-len */
const tourDates = document.querySelector('#tour__date');
const reserveDates = document.querySelector('#reservation__date');
const tourPeople = document.querySelector('#tour__people');
const reservePeople = document.querySelector('#reservation__people');
const reservationPrice = document.querySelector('.reservation__price');
const reservationData = document.querySelector('.reservation__data');

const numberOfPeople = {};
const prices = {};
let currentPrice = 0;
let currentPeople = 0;
let currentDate = '';

tourDates.replaceChildren();
reserveDates.replaceChildren();

const spellPeople = () => {
  if (currentPeople === 1 || currentPeople >= 5) {
    return `, ${currentPeople} человек`;
  } else if (currentPeople >= 2) {
    return `, ${currentPeople} человека`;
  } else {
    return '';
  }
};

const spellDate = () => {
  if (currentDate !== '') {
    const dates = [];
    currentDate.split('-').map(d => {
      const split = d.split('.');
      dates.push((new Date(`${split[1]}.${split[0]}`)).toLocaleDateString('ru-RU', {month: 'long', day: '2-digit'}));
    });
    return `${dates[0]} - ${dates[1]}`;
  } else {
    return '';
  }
};

const updateInfo = () => {
  reservationData.textContent = `${spellDate()}${spellPeople()}`;
  const priceText = (currentPrice * currentPeople).toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'});
  reservationPrice.textContent = priceText;
};

const defaultOption = document.createElement('option');
defaultOption.classList.add('tour__option');
defaultOption.textContent = 'Выбери дату';
defaultOption.value = '';
tourDates.append(defaultOption);

const defaultOption2 = defaultOption.cloneNode();
defaultOption2.textContent = 'Дата путешествия';
reserveDates.append(defaultOption2);

const loadTours = async (cb) => {
  const result = await fetch('data.json');
  const data = await result.json();
  return data;
};

const tours = await loadTours();

tours.forEach(tour => {
  const option = document.createElement('option');
  option.classList.add('tour__option');
  option.textContent = tour.date;
  option.value = tour.date;
  tourDates.append(option);
  const clone = option.cloneNode(true);
  clone.classList.add('reservation__option');
  reserveDates.append(clone);
  numberOfPeople[tour.date] = [tour['min-people'], tour['max-people']];
  prices[tour.date] = tour.price;
});

const updateList = (value, reserve) => {
  if (value) {
    const [min, max] = numberOfPeople[value];
    (reserve ? reservePeople : tourPeople).replaceChildren();
    const defaultOption = document.createElement('option');
    defaultOption.classList.add('tour__option');
    defaultOption.textContent = 'Количество человек';
    (reserve ? reservePeople : tourPeople).append(defaultOption);

    for (let i = min; i <= max; i++) {
      const option = document.createElement('option');
      option.classList.add('tour__option');
      option.textContent = i;
      option.value = i;
      if (reserve) {
        option.classList.add('reservation__option');
        reservePeople.append(option);
      } else {
        tourPeople.append(option);
      }
    }

    currentPrice = prices[value];
    currentDate = value;
  } else {
    currentPrice = 0;
    currentDate = '';
  }
  currentPeople = 0;
  updateInfo();
};

tourDates.addEventListener('change', e => {
  if (e.target.value) {
    updateList(e.target.value);
  } else {
    updateList(null);
  }
});

reserveDates.addEventListener('change', e => {
  if (e.target.value) {
    updateList(e.target.value, true);
  } else {
    updateList(null, true);
  }
});

reservePeople.addEventListener('change', e => {
  if (Number(e.target.value)) {
    console.log('e.target.value: ', Number(e.target.value));
    currentPeople = Number(e.target.value);
    console.log('currentPeople: ', currentPeople);
    console.log('currentPeople: ', typeof currentPeople);
  } else {
    currentPeople = 0;
  }
  updateInfo();
});

updateInfo();
