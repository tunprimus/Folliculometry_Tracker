
import differenceInDays from './date-day-diff.js';

// Declare variables and constants
const LUTEAL_PHASE_LENGTH = 14;
const dateLocales = undefined;
const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',};
let cyclesNum;
let datesCollectorObj = {};
let datesCollectorArray = [];
let dateLMP;

const sectionCyclesNumElement = document.querySelector('#cycles-form-num');
const sectionCyclesDatesElement = document.querySelector('#cycles-form-date');
const cyclesFormElement = document.querySelector('#form-cycles-num');
// const cyclesSelectElement = document.querySelector('#cycles-num__select');
const datesFormElement = document.querySelector('#form-cycles-date');
const dateListElement = document.querySelector('#cycles-date-list');
// const cycleDateElement = document.querySelector('.cycles-date__item');
const sectionResultsElement = document.querySelector('#results');
const resultCellsElements = document.querySelectorAll('.result-table__value');
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
  
  for (const [name,value] of data) {
    cyclesNum = value;
  }
  cyclesNum = parseInt(cyclesNum, 10);

  createDateInputs();
  cyclesFormElement.reset();
  sectionCyclesNumElement.classList.toggle('hidden-all');
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
    // console.log(event.target);
    if (!event.target.matches('#form-cycles-date')) {
      return;
    }

    function extractDate() {
      for (const {key, valueAsDate} of event.target) {
        if (valueAsDate) {
          // console.log(valueAsDate);
          datesCollectorArray.push(valueAsDate);
        }
      }
      return datesCollectorArray;
    }
    
    function getDayDiff() {
      extractDate();
      const dayDiffArray = [];
      for (let i = 0; i < datesCollectorArray.length - 1; i++) {
        dayDiffArray.push(differenceInDays(datesCollectorArray[i], datesCollectorArray[i + 1]));
      }
      console.log(dayDiffArray);
      return dayDiffArray;
    }

    // Function to get the LMP
    function getLMP(datesArray) {
      const forLMP = [];
      for (const value of Object.values(datesArray)) {
        // console.log(`${value}: ${value.getDate()}`);
        forLMP.push(value.toLocaleString(dateLocales, dateOptions));
      }
      dateLMP = forLMP.pop();
      // console.log(dateLMP);
      return dateLMP;
    }
    getLMP(datesCollectorArray);
    getDayDiff();
    
  });
  // sectionCyclesDatesElement.classList.toggle('hidden-all');
}

// Process the date inputs


// Return results to page


// Create charts

createDateInputs();
handleDateSubmit();