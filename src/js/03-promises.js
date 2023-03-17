import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector(".form"),
  inputDelay: document.querySelector("input[name=delay]"),
  inputStep: document.querySelector("input[name=step]"),
  inputAmount: document.querySelector("input[name=amount]"),
};

refs.form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let delayVal = Number(refs.inputDelay.value);
  let delayStep = Number(refs.inputStep.value);
  let amount = Number(refs.inputAmount.value);
  
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayVal)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  })
    delayVal += delayStep;
  };
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};
