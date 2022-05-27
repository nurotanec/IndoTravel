import showModal from './modal.js';

const url = 'https://jsonplaceholder.typicode.com/posts';
const reservationName = document.querySelector('#reservation__name');
const reservationPhone = document.querySelector('#reservation__phone');
const reservePeople = document.querySelector('#reservation__people');
const reserveDates = document.querySelector('#reservation__date');
const reservationPrice = document.querySelector('.reservation__price');
const reservationData = document.querySelector('.reservation__data');

const httpRequest = (url, {
    method = 'get',
    callback,
    body = {},
    headers,
}) => {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        if (headers) {
            for (const [key, value] of Object.entries(headers)) {
                xhr.setRequestHeader(key, value);
            }
        }

        xhr.addEventListener('load', () => {
            if (xhr.status < 200 || xhr.status >= 300) {
                callback(new Error(xhr.status), xhr.response);
                return;
            }

            const data = JSON.parse(xhr.response);
            if (callback) callback(null, data);
        });

        xhr.addEventListener('error', () => {
            callback(new Error(xhr.status), xhr.response);
        });

        xhr.send(JSON.stringify(body));
    } catch (err) {
        callback(new Error(err));
    }
};

export const reserve = () => {
    httpRequest(url, {
        method: 'POST',
        body: {
            'fullname': reservationName.value,
            'phone': reservationPhone.value,
            'date': reserveDates.value,
            'people': Number(reservePeople.value),
        },
        callback(err, data) {
            if (err) {
                console.log('error reserving: ', err);
                alert(`Произошла ошибка! Попробуйте еще!`);
            } else {
                console.log('data', data);
                alert('Бронирование прошло успешно!');
            }
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
};

const checkValidity = () => {
    if (reservationName.value !== '' &&
        reservationPhone.value !== '' &&
        reserveDates.value !== '' &&
        Number(reservePeople.value) !== 0) {
        return true;
    } else {
        alert('Заполните поля!');
        return false;
    }
};

const disableForm = () => {
    reserveDates.disabled = true;
    reservePeople.disabled = true;
    reservationName.disabled = true;
    reservationPhone.disabled = true;
    reservationButton.disabled = true;
};

const reservationButton = document.querySelector('.reservation__button');
reservationButton.addEventListener('click', async e => {
    e.preventDefault();
    if (checkValidity()) {
        const data = {
            'price': reservationPrice.textContent,
            'date': reservationData.textContent.split(',')[0],
            'people': reservePeople.value,
        };
        const res = await showModal('error', data, reserve);

        if (res) disableForm();
    }
});

const footerButton = document.querySelector('.footer__button');
const footerInput = document.querySelector('.footer__input');
const footerTitle = document.querySelector('.footer__form-title');
const footerText = document.querySelector('.footer__text');
const footerWrap = document.querySelector('.footer__input-wrap');

const contactManager = (email) => {
    httpRequest(url, {
        method: 'POST',
        body: {
            email,
        },
        callback(err, data) {
            if (err) {
                console.log('error reserving: ', err);
                alert(`Произошла ошибка! Попробуйте еще!`);
            } else {
                console.log('data', data);
                const tempTitle = footerTitle.textContent;
                const tempText = footerText.textContent;
                footerTitle.textContent = 'Ваша заявка успешно отправлена';
                footerText.textContent =
                    `Наши менеджеры свяжутся с вами в течении 3-х дней`;
                footerWrap.style.visibility = 'hidden';
                setTimeout(() => {
                    footerTitle.textContent = tempTitle;
                    footerText.textContent = tempText;
                    footerWrap.style.visibility = 'visible';
                    footerInput.value = '';
                }, 5000);
            }
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
};

footerButton.addEventListener('click', e => {
    e.preventDefault();
    if (footerInput.value !== '') {
        contactManager(footerInput.value);
    } else {
        alert('Заполните поле');
    }
});