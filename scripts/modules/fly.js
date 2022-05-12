const docEl = document.documentElement;

const fly = document.createElement('div');

let prevBot = 0;

fly.style.cssText = `
  position: fixed;
  width: 50px;
  height: 50px;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: url('img/fly/airplane.svg') center/contain no-repeat;
`;

document.body.append(fly);

const calcPositionFly = () => {
  const maxBot = docEl.clientHeight - fly.clientHeight;
  const maxScroll = docEl.scrollHeight - docEl.clientHeight;
  const percentScroll = (window.scrollY * 100) / maxScroll;
  const bot = maxBot * (percentScroll / 100);
  if (prevBot > bot) {
    fly.style.transform = `translateY(-${bot}px) rotate(0.5turn)`;
  } else {
    fly.style.transform = `translateY(-${bot}px)`;
  }
  prevBot = bot;
};

const checkWidth = () => {
  if (docEl.scrollWidth < 758) {
    fly.style.opacity = 0;
  } else {
    fly.style.opacity = 1;
  }
};

window.addEventListener('scroll', () => {
  requestAnimationFrame(calcPositionFly);
});

window.addEventListener('resize', () => {
  requestAnimationFrame(checkWidth);
});

calcPositionFly();
checkWidth();
