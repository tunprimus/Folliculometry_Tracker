
import differenceInDays from './date-day-library.js';
import addDaysToDate from './date-day-library.js';
import subDaysFromDate from './date-day-library.js';

// Declare variables and constants
const LUTEAL_PHASE_LENGTH = 14;
const dateLocales = undefined;
const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',};
let cyclesNum;
const menstrualInfo = {dateLMP: '', dateLMPStr: '', longestCycleLength: 0, shortestCycleLength: 0, averageCycleLength: 0, longestDayOvulation: 0, shortestDayOvulation: 0, averageDayOvulation: 0, predictedOvulationDate: '', predictedOvulationDateStr: '',};
const datesCollectorArray = [];
let dateLMP;
let dateLMPStr = '';
let longestCycleLength = 0;
let shortestCycleLength = 0;
let averageCycleLength = 0;
let longestDayOvulation = 0;
let shortestDayOvulation = 0;
let averageDayOvulation = 0;
let predictedOvulationDate;
let predictedOvulationDateStr = '';
let alreadyOvulated = '';
let cycleEndDate;

const sectionCyclesNumElement = document.querySelector('#cycles-form-num');
const sectionCyclesDatesElement = document.querySelector('#cycles-form-date');
const cyclesFormElement = document.querySelector('#form-cycles-num');
// const cyclesSelectElement = document.querySelector('#cycles-num__select');
const datesFormElement = document.querySelector('#form-cycles-date');
const dateListElement = document.querySelector('#cycles-date-list');
const datesResetButtonElement = document.querySelector('#cycles-date__reset');
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

    // Function to get the LMP
    function getLMP(datesArray) {
      while (!datesArray) {
        continue;
      }
      let lastItem = datesArray.slice(-1)[0];
      // console.log(lastItem);
      dateLMP = lastItem;
      // console.log(dateLMP);
      menstrualInfo.dateLMP = dateLMP;
      dateLMPStr = dateLMP.toLocaleString(dateLocales, dateOptions);
      menstrualInfo.dateLMPStr = dateLMP.toLocaleString(dateLocales, dateOptions);
      return dateLMP, dateLMPStr;
    }

    function extractDate() {
      for (const {key, valueAsDate} of event.target) {
        if (valueAsDate) {
          // console.log(valueAsDate);
          datesCollectorArray.push(valueAsDate);
        }
      }
      getLMP(datesCollectorArray);
      return datesCollectorArray;
    }
    
    function getDayDiff() {
      extractDate();
      let dayDiffArray;
      let dayDiffArrayTemp = [];
      for (let i = 0; i < datesCollectorArray.length - 1; i++) {
        dayDiffArrayTemp.push(differenceInDays(datesCollectorArray[i], datesCollectorArray[i + 1]));
      }
      
      dayDiffArray = dayDiffArrayTemp;
      dayDiffArrayTemp = null;
      console.log(dayDiffArray);
      return dayDiffArray;
    }
    
    getDayDiff();
    datesResetButtonElement.click();
    calcMenstrualParameters();

  });
  // sectionCyclesDatesElement.classList.toggle('hidden-all');

  // Process the date inputs
  function calcMenstrualParameters() {
    function longestCycleLengthCalc () {
      menstrualInfo.longestCycleLength = Math.max(datesCollectorArray);
      return longestCycleLength = Math.max(datesCollectorArray);
    }
    longestCycleLengthCalc ();

    function shortestCycleLengthCalc() {
      menstrualInfo.shortestCycleLength = Math.min(datesCollectorArray);
      return shortestCycleLength = Math.min(datesCollectorArray);
    }
    shortestCycleLengthCalc();

    function averageCycleLengthCalc() {
      menstrualInfo.averageCycleLength = datesCollectorArray.reduce((avg, value, _, arr) => avg + (value / arr.length), 0);
      return averageCycleLength = datesCollectorArray.reduce((avg, value, _, arr) => avg + (value / arr.length), 0);
    }
    averageCycleLengthCalc();

    function longestDayToOvulateCalc() {
      menstrualInfo.longestDayOvulation = longestCycleLength - LUTEAL_PHASE_LENGTH;
      return longestDayOvulation = longestCycleLength - LUTEAL_PHASE_LENGTH;
    }
    longestDayToOvulateCalc();

    function shortestDayToOvulateCalc() {
      menstrualInfo.shortestDayOvulation = shortestCycleLength - LUTEAL_PHASE_LENGTH;
      return shortestDayOvulation = shortestCycleLength - LUTEAL_PHASE_LENGTH;
    }
    shortestDayToOvulateCalc();

    function averageDayToOvulateCalc() {
      menstrualInfo.averageDayOvulation = averageCycleLength - LUTEAL_PHASE_LENGTH;
      return averageDayOvulation = averageCycleLength - LUTEAL_PHASE_LENGTH;
    }
    averageDayToOvulateCalc();

    function determineOvulationDate() {
      const todayDate = new Date();

      let predictedBuffer = dateLMP;
      cycleEndDate = addDaysToDate(predictedBuffer, averageCycleLength);

      predictedOvulationDate = subDaysFromDate(cycleEndDate, LUTEAL_PHASE_LENGTH);

      if (differenceInDays(predictedOvulationDate, todayDate) < 1) {
        alreadyOvulated = 'You would have ovulated!';
      }

      menstrualInfo.predictedOvulationDate = predictedOvulationDate;

      predictedOvulationDateStr = predictedOvulationDate.toLocaleString(dateLocales, dateOptions);
      console.log(predictedOvulationDateStr);
      menstrualInfo.predictedOvulationDateStr = predictedOvulationDate.toLocaleString(dateLocales, dateOptions);

      return predictedOvulationDate;
    }
    determineOvulationDate();
  }
}


// Return results to page


// Create charts

createDateInputs();
handleDateSubmit();