import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};
let timerId = null;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else if (selectedDates[0] > new Date()) {
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', () => {
        startCount(selectedDates[0]);
      });
    }
  },
};

flatpickr('#datetime-picker', options);

function startCount(selectedDate) {
  timerId = setInterval(() => {
    const delta = new Date(selectedDate) - new Date();
    const time = convertMs(delta);

    refs.startBtn.disabled = true;
    updateClock(time);
    if (delta <= 0) {
      clearInterval(timerId);
      refs.daysValue.textContent = `00`;
      refs.hoursValue.textContent = `00`;
      refs.minutesValue.textContent = `00`;
      refs.secondsValue.textContent = `00`;
      Notiflix.Report.success('It is time!');
    }
  }, 1000);
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
};

function updateClock({ days, hours, minutes, seconds }) {
  refs.daysValue.textContent = `${days}`;
  refs.hoursValue.textContent = `${hours}`;
  refs.minutesValue.textContent = `${minutes}`;
  refs.secondsValue.textContent = `${seconds}`;
};
