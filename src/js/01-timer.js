import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const elements = {
    picker: document.querySelector(`#datetime-picker`),
    startBtn: document.querySelector(`.js-startBtn`),
    timer: document.querySelector(`.timer`),
}
const values = elements.timer.querySelectorAll(`.value`);
let ms;

elements.startBtn.disabled = true;

elements.startBtn.addEventListener(`click`, countdown);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const date = new Date();
        if (selectedDates[0].getTime() < date.getTime()) {
            elements.startBtn.disabled = true;
            // alert(`Please choose a date in the future`);
            iziToast.show({
    theme: 'dark',
    icon: 'icon-person',
    message: 'Please choose a date in the future',
    position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
    progressBarColor: 'rgb(0, 255, 184)',
});
        }
        else {
            elements.startBtn.disabled = false;
        }
        ms = selectedDates[0].getTime() - date.getTime();
  },
};
flatpickr(elements.picker, options);

function countdown() {
    const timerId = setInterval(() =>
    {
        const count = convertMs(ms);
    values[0].innerHTML = count.days;
    values[1].innerHTML = count.hours;
    values[2].innerHTML = count.minutes;
    values[3].innerHTML = count.seconds;
        ms = ms - 1000;
        if (ms < 0) {
             clearInterval(timerId);
        }
    },
    1000)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}