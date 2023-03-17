const refs = {
  startBtn: document.querySelector("[data-start]"),
  stopBtn: document.querySelector("[data-stop]"),
  body: document.querySelector("body"),
};
let timerId = null;

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function randomiseColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
};

function onStartBtnClick() {
  timerId = setInterval(randomiseColor, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
};

function onStopBtnClick() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
};