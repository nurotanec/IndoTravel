const burgerMenu = document.querySelector('.header__menu');

document.addEventListener('click', e => {
  const target = e.target;
  if (target.closest('.header__menu-button')) {
    burgerMenu.classList.toggle('header__menu_active');
  } else {
    burgerMenu.classList.remove('header__menu_active');
  }
});
