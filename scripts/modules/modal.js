import loadStyle from './loadStyle.js';

const showModal = async(error, data, callback) => {
    await loadStyle('css/modal.css');

    const overlay = document.createElement('div');
    const modalWindow = document.createElement('div');
    const title = document.createElement('h2');
    const description = document.createElement('p');
    const dateText = document.createElement('p');
    const priceText = document.createElement('p');
    const btnWrapper = document.createElement('div');
    const confirmBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    overlay.classList.add('overlay', 'overlay_confirm');
    modalWindow.classList.add('modal');
    title.classList.add('modal__title');
    title.textContent = 'Подтверждение заявки';
    description.classList.add('modal__text');
    description.textContent = `Бронирование путешествия в Индию на ${data.people} человек${data.people > 1 ? 'а': ''}`;
    dateText.classList.add('modal__text');
    dateText.textContent = `В даты: ${data.date}`;
    priceText.classList.add('modal__text');
    priceText.textContent = `Стоимость тура ${data.price}`;
    btnWrapper.classList.add('modal__button');
    confirmBtn.classList.add('modal__btn', 'modal__btn_confirm');
    confirmBtn.textContent = 'Подтверждаю';
    editBtn.classList.add('modal__btn', 'modal__btn_edit');
    editBtn.textContent = 'Изменить данные';

    overlay.append(modalWindow);
    modalWindow.append(title, description, dateText, priceText, btnWrapper);
    btnWrapper.append(confirmBtn, editBtn);
    document.body.append(overlay);

    return new Promise((resolve) => {
        editBtn.addEventListener('click', () => {
            overlay.remove();
            return resolve(false);
        });

        confirmBtn.addEventListener('click', () => {
            callback();
            overlay.remove();
            return resolve(true);
        });
    });
};

export default showModal;