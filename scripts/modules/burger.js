const duration = 1000;

const burgerMenu = document.querySelector('.header__menu');

burgerMenu.style.transition = `opacity ${duration}ms ease-out`;

document.addEventListener('click', e => {
  const target = e.target;
  if (target.closest('.header__menu-button')) {
    burgerMenu.classList.toggle('header__menu_active');
  } else {
    burgerMenu.classList.remove('header__menu_active');
  }
});
