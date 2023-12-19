import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(`.form`);

form.addEventListener(`submit`, startGeneration);

function startGeneration(evt) {
    evt.preventDefault();
    console.dir(evt.currentTarget.elements);
    const delay = evt.currentTarget.elements.delay.value;

    if (evt.currentTarget.elements.state.value === "fulfilled") {
        setTimeout(() => {
            new Promise((resolve) => {
                resolve(delay);
            })
                .then((delay) => {
                iziToast.show({
    theme: 'dark',
    icon: 'icon-person',
    message: `✅ Fulfilled promise in ${delay}ms`,
    position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
    progressBarColor: 'rgb(0, 255, 184)',
});
                console.log(`✅ Fulfilled promise in ${delay}ms`);
            });
        }, delay);
    } else {
        setTimeout(() => {
            new Promise((_, reject) => {
                reject(delay);
            })
                .catch((delay) => {
                iziToast.show({
    theme: 'dark',
    icon: 'icon-person',
    message: `❌ Rejected promise in ${delay}ms`,
    position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
    progressBarColor: 'rgb(0, 255, 184)',
})
                console.log(`❌ Rejected promise in ${delay}ms`);
            });
        }, delay);
    }
}

    
//   let { delay, step, amount } = evt.currentTarget.elements;
//   for (let position = 1; position <= amount.valueAsNumber; position++) {
//     let delayX = position * step.value - step.value + delay.valueAsNumber;
//     createPromise(position, delayX)
//   }



function createPromise(delay) {
  setTimeout(() => {
    new Promise((resolve, reject) => {
      if (evt.currentTarget.elements.state.value = "fulfilled") {
        resolve({ delay });
      } else {
        reject({ delay });
      }
    })
  
    .then(({delay}) => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(({delay}) => {
      console.log(`❌ Rejected promise in ${delay}ms`);
    })
  },
    delay
  );
  
}