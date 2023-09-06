'use strict';
import { geometricMeanLogReduce }  from './geometric_mean.js';
import { arithmeticGeometricMean } from './arithmeticGeometricMean.js';
import { compareLocalAsc, addDaysToDate, subDaysFromDate, differenceInCalendarDays }  from './date-day-library.js';

// Declare variables and constants
const LUTEAL_PHASE_LENGTH = 14;
const MENSES_SHIFT = 1; // Because there is no day 0 on the menstrual cycle
const SHORT_CYCLE_SAMPLE_DAY = 19;
const NORMAL_CYCLE_SAMPLE_DAY = 21;
const LONG_CYCLE_SAMPLE_DAY = 23;
const EXTRA_LONG_CYCLE_SAMPLE_DAY = 'Random day collection';
// const dateLocales = undefined;
const dateLocales = undefined || 'en-GB';
const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',};

let cyclesNum;
const menstrualInfo = {numCyclesGiven: '', dateLMP: '', dateLMPStr: '', longestCycleLength: '', longestCycleLengthStr: '',shortestCycleLength: '', shortestCycleLengthStr: '', averageCycleLength: '', averageCycleLengthStr: '', longestDayOvulation: '', longestDayOvulationStr: '', shortestDayOvulation: '', shortestDayOvulationStr: '', averageDayOvulation: '', averageDayOvulationStr: '', predictedOvulationDate: '', predictedOvulationDateStr: '', currentCycleEndDate: '', currentCycleEndDateStr: '', alreadyOvulated: '', hormonalSampleDayType: '', hormonalSampleDate: '', hormonalSampleDateStr: '',};
const datesCollectorArray = [];
let numCyclesGiven;
let curDateLMP;
let dateLMPStr = '';
let aMean = 0;
let gMean = 0;
let longestCycleLength = 0;
let shortestCycleLength = 0;
let averageCycleLength = 0;
let longestDayOvulation = 0;
let shortestDayOvulation = 0;
let averageDayOvulation = 0;
let predictedOvulationDate;
let predictedOvulationDateStr = '';
let alreadyOvulated = '';
let hormonalSampleDate;
let hormonalSampleDateStr = '';
let currentCycleEndDate;

const sectionCyclesNumElement = document.querySelector('#cycles-form-num');
const sectionCyclesDatesElement = document.querySelector('#cycles-form-date');
const cyclesFormElement = document.querySelector('#form-cycles-num');
const cyclesFormSubmitButtonElement = document.querySelector('#cycles-num__submit');
const datesFormElement = document.querySelector('#form-cycles-date');
const dateListElement = document.querySelector('#cycles-date-list');
const datesFormSubmitButtonElement = document.querySelector('#cycles-date__submit');
const datesResetButtonElement = document.querySelector('#cycles-date__reset');
const sectionResultsElement = document.querySelector('#results');
const resultTableBodyElement = document.querySelector('.result-table__body');
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
  sectionCyclesNumElement.classList.toggle('hide-all');
  return cyclesNum;
});

// Create more date input elements and add to document
function createDateInputs() {
  let numDateInputs = cyclesNum;

  if (isNaN(numDateInputs)) {
    return;
  }

  if (numDateInputs > 2) {
    const fragment1 = document.createDocumentFragment();
    let counter = numDateInputs;
    let item = 2;
    while (counter > 2) {
      let liNum = `${item + 1}`;
      let newDateListElement = document.createElement('li');
      newDateListElement.innerHTML = `
        <label for="cycles-date__input-${liNum}">Start date-${liNum}:</label>
        <input type="date" name="flowstart-${liNum}" class="cycles-date__input input" id="cycles-date__input-${liNum}" data-date="flowstart" required>
      `;
      newDateListElement.id = `cycles-date__item-${liNum}`;
      newDateListElement.class = 'cycles-date__item';
      fragment1.appendChild(newDateListElement);

      item++;
      counter--;
    }
    dateListElement.appendChild(fragment1);
  }
}

// Validate date inputs client side


// Handle dates form submission
function handleDateSubmit() {
  datesFormElement.addEventListener('submit', event => {
    event.preventDefault();
    
    if (!event.target.matches('#form-cycles-date')) {
      return;
    }

    // Function to get the LMP
    function getLMP(datesArray) {
      while (!datesArray) {
        continue;
      }
      let lastItem = datesArray.slice(-1)[0];
      
      curDateLMP = lastItem;
      
      menstrualInfo.dateLMP = new Date(curDateLMP);
      dateLMPStr = curDateLMP.toLocaleString(dateLocales, dateOptions);
      menstrualInfo.dateLMPStr = curDateLMP.toLocaleString(dateLocales, dateOptions);
      // return curDateLMP, dateLMPStr;
      return menstrualInfo;
    }

    function extractDate() {
      for (const {key, valueAsDate} of event.target) {
        if (valueAsDate) {
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
        dayDiffArrayTemp.push(differenceInCalendarDays(datesCollectorArray[i], datesCollectorArray[i + 1]));
      }
      
      dayDiffArray = dayDiffArrayTemp;
      dayDiffArrayTemp = null;
      
      numCyclesGiven = dayDiffArray.length;
      return dayDiffArray;
    }
    
    let arrDayDiff = getDayDiff();
    menstrualInfo.numCyclesGiven = arrDayDiff.length;
    datesResetButtonElement.click();
    // console.log(arrDayDiff);
    calcMenstrualParameters(arrDayDiff, menstrualInfo);
    
    sectionCyclesDatesElement.classList.toggle('hide-all');

    generateTableResults(resultTableBodyElement, menstrualInfo);
    sectionResultsElement.classList.toggle('hide-all');
  });
  
}

// Process the date inputs

function longestCycleLengthCalc (dayDiffArr, infoObj) {
  if (!Array.isArray(dayDiffArr)) {
    return;
  }
  const arrLen = dayDiffArr.length;
  longestCycleLength = Math.max(...dayDiffArr);
  
  infoObj.longestCycleLength = Math.max(...dayDiffArr);
  infoObj.longestCycleLengthStr = `${infoObj.longestCycleLength} days`;

  // Comparison only if there are 2 or more cycles
  if (arrLen < 2) {
    infoObj.longestCycleLength = '';
    infoObj.longestCycleLengthStr = '';
  }
  
  return infoObj;
}

function shortestCycleLengthCalc(dayDiffArr, infoObj) {
  if (!Array.isArray(dayDiffArr)) {
    return;
  }
  const arrLen = dayDiffArr.length;
  shortestCycleLength = Math.min(...dayDiffArr);
  
  infoObj.shortestCycleLength = Math.min(...dayDiffArr);
  infoObj.shortestCycleLengthStr = `${infoObj.shortestCycleLength} days`;

  // Comparison only if there are 2 or more cycles
  if (arrLen < 2) {
    infoObj.shortestCycleLength = '';
    infoObj.shortestCycleLengthStr = '';
  }
  
  return infoObj;
}

function averageCycleLengthCalc(dayDiffArr, infoObj) {
  if (!Array.isArray(dayDiffArr)) {
    return;
  }
  let ariGeoMean = null;
  aMean = dayDiffArr.reduce((avg, value, _, arr) => avg + (value / arr.length), 0);
  gMean = geometricMeanLogReduce(dayDiffArr);
  ariGeoMean = arithmeticGeometricMean(aMean, gMean);
  
  averageCycleLength = Math.round(ariGeoMean);
  infoObj.averageCycleLength = Math.round(ariGeoMean);
  infoObj.averageCycleLengthStr = `${infoObj.averageCycleLength} days`;

  return infoObj;
}

function longestDayToOvulateCalc(dayDiffArr, infoObj) {
  if (!Array.isArray(dayDiffArr)) {
    return;
  }
  const arrLen = dayDiffArr.length;
  longestDayOvulation = longestCycleLength - LUTEAL_PHASE_LENGTH;
  
  infoObj.longestDayOvulation = longestCycleLength - LUTEAL_PHASE_LENGTH;
  infoObj.longestDayOvulationStr = `Day ${infoObj.longestDayOvulation}`;

  // Comparison only if there are 2 or more cycles
  if (arrLen < 2) {
    infoObj.longestDayOvulation = '';
    infoObj.longestDayOvulationStr = '';
  }

  return infoObj;
}

function shortestDayToOvulateCalc(dayDiffArr, infoObj) {
  if (!Array.isArray(dayDiffArr)) {
    return;
  }
  const arrLen = dayDiffArr.length;
  shortestDayOvulation = shortestCycleLength - LUTEAL_PHASE_LENGTH;

  infoObj.shortestDayOvulation = shortestCycleLength - LUTEAL_PHASE_LENGTH;
  infoObj.shortestDayOvulationStr = `Day ${infoObj.shortestDayOvulation}`;

  // Comparison only if there are 2 or more cycles
  if (arrLen < 2) {
    infoObj.shortestDayOvulation = '';
    infoObj.shortestDayOvulationStr = '';
  }

  return infoObj;
}

function averageDayToOvulateCalc(dayDiffArr, infoObj) {
  averageDayOvulation = averageCycleLength - LUTEAL_PHASE_LENGTH;

  infoObj.averageDayOvulation = averageCycleLength - LUTEAL_PHASE_LENGTH;
  infoObj.averageDayOvulationStr = `Day ${infoObj.averageDayOvulation}`;

  return infoObj;
}

function determineOvulationDate(infoObj) {
  const todayDate = new Date();
  
  let currentLMP = new Date(infoObj.dateLMP);
  let avgCycleLen = averageCycleLength;
  
  let currentCycleEndDate = addDaysToDate(currentLMP, (avgCycleLen - MENSES_SHIFT));
  infoObj.currentCycleEndDate = currentCycleEndDate;
  infoObj.currentCycleEndDateStr = currentCycleEndDate.toLocaleString(dateLocales, dateOptions);
  
  let predictedDate = subDaysFromDate(currentCycleEndDate, LUTEAL_PHASE_LENGTH);

  if (compareLocalAsc(predictedDate, todayDate) < 1) {
    alreadyOvulated = 'You would have ovulated!';
    infoObj.alreadyOvulated = 'You would have ovulated!';
  }

  infoObj.predictedOvulationDate = predictedDate;
  predictedOvulationDateStr = predictedDate.toLocaleString(dateLocales, dateOptions);

  infoObj.predictedOvulationDateStr = predictedDate.toLocaleString(dateLocales, dateOptions);
  
  return infoObj;
}

/* 
function hormonalSampleDateCalc(infoObj) {
  let collectDate;
  
  let indexLMPStr = infoObj.dateLMPStr;
  
  let aggCycLen = infoObj.averageCycleLength;
  let aggCycEndDate = infoObj.currentCycleEndDate;
  
  if (!aggCycLen) {
    return;
  }

  if (infoObj.alreadyOvulated) {
    infoObj.hormonalSampleDateStr = EXTRA_LONG_CYCLE_SAMPLE_DAY;
    return;
  }

  if (aggCycLen > 0 && aggCycLen < 28) {
    infoObj.hormonalSampleType = SHORT_CYCLE_SAMPLE_DAY;
    collectDate = addDaysToDate(indexLMP, (SHORT_CYCLE_SAMPLE_DAY - MENSES_SHIFT));
    infoObj.hormonalSampleDate = collectDate;
    infoObj.hormonalSampleDateStr = collectDate.toLocaleString(dateLocales, dateOptions);
  } else if (aggCycLen < 31) {
    infoObj.hormonalSampleType = NORMAL_CYCLE_SAMPLE_DAY;
    collectDate = addDaysToDate(indexLMP, (NORMAL_CYCLE_SAMPLE_DAY - MENSES_SHIFT));
    infoObj.hormonalSampleDate = collectDate;
    infoObj.hormonalSampleDateStr = collectDate.toLocaleString(dateLocales, dateOptions);
  } else if (aggCycLen < 35) {
    infoObj.hormonalSampleType = LONG_CYCLE_SAMPLE_DAY;
    collectDate = addDaysToDate(indexLMP, (LONG_CYCLE_SAMPLE_DAY - MENSES_SHIFT));
    infoObj.hormonalSampleDate = collectDate;
    infoObj.hormonalSampleDateStr = collectDate.toLocaleString(dateLocales, dateOptions);
  } else {
    infoObj.hormonalSampleType = EXTRA_LONG_CYCLE_SAMPLE_DAY;
    collectDate = null;
    infoObj.hormonalSampleDateStr = EXTRA_LONG_CYCLE_SAMPLE_DAY;
  }

  return infoObj;
}
 */
function calcMenstrualParameters(dayDiffArr, infoObj) {
  if (!Array.isArray(dayDiffArr)) {
    return;
  }
  longestCycleLengthCalc (dayDiffArr, infoObj);
  shortestCycleLengthCalc(dayDiffArr, infoObj);
  averageCycleLengthCalc(dayDiffArr, infoObj);
  longestDayToOvulateCalc(dayDiffArr, infoObj);
  shortestDayToOvulateCalc(dayDiffArr, infoObj);
  averageDayToOvulateCalc(dayDiffArr, infoObj);
  determineOvulationDate(infoObj);
  // hormonalSampleDateCalc(infoObj);
  return infoObj;
}

// Return results to page
function generateTableResults(tbodyDom, infoObj) {
  
  if (!tbodyDom) {
    return;
  }
  const newInnerHTML = `
    <tr class="table__row">
      <td class="result-table__desc table__cell" data-label="Number of cycles: ">Number of cycles: </td>
      <td class="result-table__value table__cell" data-label="Number of cycles: "> ${infoObj.numCyclesGiven}</td>
    </tr>
    <tr class="table__row">
      <td class="result-table__desc table__cell" data-label="Last Menstrual Period: ">Last Menstrual Period: </td>
      <td class="result-table__value table__cell" data-label="Last Menstrual Period: "> ${infoObj.dateLMPStr}</td>
    </tr>
    <tr class="table__row">
      <td class="result-table__desc table__cell" data-label="Longest cycle length: ">Longest cycle length: </td>
      <td class="result-table__value table__cell" data-label="Longest cycle length: "> ${infoObj.longestCycleLengthStr}</td>
    </tr>
    <tr class="table__row">
      <td class="result-table__desc table__cell" data-label="Shortest cycle length: ">Shortest cycle length: </td>
      <td class="result-table__value table__cell" data-label="Shortest cycle length: ">${infoObj.shortestCycleLengthStr}</td>
    </tr>
    <tr class="table__row">
      <td class="result-table__desc table__cell" data-label="Averaged cycle length: ">Averaged cycle length: </td>
      <td class="result-table__value table__cell" data-label="Averaged cycle length: "> ${infoObj.averageCycleLengthStr}</td>
    </tr>
    <tr class="table__row">
      <td class="result-table__desc table__cell" data-label="Longest day of ovulation: ">Longest day of ovulation: </td>
      <td class="result-table__value table__cell" data-label="Longest day of ovulation: "> ${infoObj.longestDayOvulationStr}</td>
    </tr>
    <tr class="table__row">
      <td class="result-table__desc table__cell" data-label="Shortest day of ovulation: ">Shortest day of ovulation: </td>
      <td class="result-table__value table__cell" data-label="Shortest day of ovulation: "> ${infoObj.shortestDayOvulationStr}</td>
    </tr>
    <tr class="table__row">
      <td class="result-table__desc table__cell" data-label="Average day of ovulation: ">Average day of ovulation: </td>
      <td class="result-table__value table__cell alert" data-label="Average day of ovulation: "> ${infoObj.averageDayOvulationStr}</td>
    </tr>
    <tr class="table__row">
      <td class="result-table__desc table__cell" data-label="Predicted Ovulation Date: ">Predicted Ovulation Date: </td>
      <td class="result-table__value table__cell warning result-table__value--predicted" data-label="Predicted Ovulation Date: "> <strong>${infoObj.predictedOvulationDateStr}</strong></td>
    </tr>
    <tr class="table__row">
      <td class="result-table__desc table__cell" data-label="Ovulated?: "></td>
      <td class="result-table__value table__cell alert-message alert" data-label="Ovulated?: "> ${infoObj.alreadyOvulated}</td>
    </tr>
    <tr class="table__row">
      <td class="result-table__desc table__cell" data-label="Hormonal sample date: "> Day ${infoObj.hormonalSampleType} hormonal sample collection</td>
      <td class="result-table__value table__cell" data-label="Hormonal sample date: "> ${infoObj.hormonalSampleDateStr}</td>
    </tr>
  `;
  
  tbodyDom.innerHTML = '';
  tbodyDom.innerHTML += newInnerHTML;
  return tbodyDom;
}

createDateInputs();
handleDateSubmit();

// Create charts
