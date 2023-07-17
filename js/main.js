// Declare variables and constants
const LUTEAL_PHASE_LENGTH = 14;
let cyclesNum;
let datesCollector = {};

const sectionCyclesNumElement = document.querySelector('#cycles-form-num');
const sectionCyclesDatesElement = document.querySelector('#cycles-form-date');
const cyclesFormElement = document.querySelector('#form-cycles-num');
const cyclesSelectElement = document.querySelector('#cycles-num__select');
const datesFormElement = document.querySelector('#form-cycles-date');
const dateListElement = document.querySelector('#cycles-date-list');
const cycleDateElement = document.querySelector('.cycles-date__item');
const sectionResultsElement = document.querySelector('#results');
const sectionChartsElement = document.querySelector('#charts');
const resultsElement = document.querySelector('#calc-result');
const chartsElement = document.querySelector('calc-charts');


// Handle selecting number of start dates
cyclesFormElement.addEventListener('submit', function handleCyclesFormSubmit(event) {
  event.preventDefault();
  if (!event.target.matches('#form-cycles-num')) {
    return;
  }
  const data = new FormData(event.target);
  // let dataArray = [...data.entries()];
  for (const [name,value] of data) {
    // console.log(name, ":", value);
    cyclesNum = value;
  }
  cyclesNum = parseInt(cyclesNum, 10);

  createDateInputs();
  cyclesFormElement.reset();
  sectionCyclesNumElement.classList.toggle('hide');
  return cyclesNum;
});

// Create more date input elements and add to document
function createDateInputs() {
  let numDateInputs = cyclesNum;

  if (isNaN(numDateInputs)) {
    return;
  }

  if (numDateInputs > 2) {
    const fragment = document.createDocumentFragment();
    let counter = numDateInputs;
    let item = 2;
    while (counter > 2) {
      /* 
      let dateInput = cycleDateElement.cloneNode(true);
      let temp = dateInput.id;
      let temp2 = temp.slice(0, -1) + `${item + 1}`;
      dateInput.id = temp2;
      console.log(dateInput);
      // console.log(dateInput.childNodes);
      // console.log(dateInput.children);
      */
      let liNum = `${item + 1}`;
      let newDateListElement = document.createElement('li');
      newDateListElement.innerHTML = `
        <label for="cycles-date__input-${liNum}">Start date-${liNum}:</label>
        <input type="date" name="flowstart-${liNum}" class="cycles-date__input" id="cycles-date__input-${liNum}" data-date="flowstart" required>
      `;
      newDateListElement.id = `cycles-date__item-${liNum}`;
      newDateListElement.class = 'cycles-date__item';
      fragment.appendChild(newDateListElement);

      item++;
      counter--;
    }
    dateListElement.appendChild(fragment);
  }
}

// Validate date inputs client side


// Handle dates form submission
function handleDateSubmit() {
  datesFormElement.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event.target);
    if (!event.target.matches('#form-cycles-date')) {
      return;
    }
    for (const {key, valueAsDate} of event.target) {
      if (valueAsDate) {
        console.log(valueAsDate);
      }
    }
  });
}

// Process the date inputs


// Return results to page


// Create charts
createDateInputs();
handleDateSubmit();