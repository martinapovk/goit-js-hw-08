import throttle from 'lodash.throttle';

import { load, save } from './storage.js';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('.feedback-form input');
const textareaRef = document.querySelector('.feedback-form textarea');

const FEEDBACK_KEY = 'feedback-form-state';

let feedbackData = load(FEEDBACK_KEY) ?? {};

formFill(feedbackData);

formRef.addEventListener('input', throttle(formInputHendle, 500));
formRef.addEventListener('submit', formSubmitHendle);

function formFill(data) {
  if (data.email) {
    inputRef.value = data.email;
  }
  if (data.message) {
    textareaRef.value = data.message;
  }
}

function formInputHendle(evt) {
  const nameOfAttribute = evt.target.attributes.name.value;
  if (nameOfAttribute === 'email') {
    feedbackData.email = evt.target.value;
  } else if (nameOfAttribute === 'message') {
    feedbackData.message = evt.target.value;
  }
  save(FEEDBACK_KEY, feedbackData);
}

// -----НЕ ЗНАЮ ЯК КРАЩЕ-----

// function formInputHendle(evt) {
//   if (evt.target.nodeName === 'INPUT') {
//     feedbackData.email = evt.target.value;
//   } else if (evt.target.nodeName === 'TEXTAREA') {
//     feedbackData.message = evt.target.value;
//   }
//   save(FEEDBACK_KEY, feedbackData);
// }

function formSubmitHendle(evt) {
  evt.preventDefault();

  if (inputRef.value === '' || textareaRef.value === '') {
    return alert('Заповніть усі поля!!!');
  }

  feedbackData.email = inputRef.value;
  feedbackData.message = textareaRef.value;

  console.log(feedbackData);

  inputRef.value = '';
  textareaRef.value = '';
  feedbackData = {};
  localStorage.removeItem(FEEDBACK_KEY);
}
