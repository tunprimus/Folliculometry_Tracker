// Declare variables and constants
const LUTEAL_PHASE_LENGTH = 14;
let cyclesNum;

const cyclesFormElement = document.querySelector('#form-cycles-num');
const cyclesSelectElement = document.querySelector('#cycles-num__select');
const datesFormElement = document.querySelector('#form-cycles-date');
const dateListElement = document.querySelector('#cycles-date-list');
const cycleDateElement = document.querySelector('.cycles-date__item');
const resultsElement = document.querySelector('#calc-result');
const chartsElement = document.querySelector('calc-charts');

/* 
// Handle selecting number of start dates
cyclesFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  // let dataArray = [...data.entries()];
  for (const [name,value] of data) {
    // console.log(name, ":", value);
    cyclesNum = value;
  }
  cyclesNum = parseInt(cyclesNum, 10);
  console.log(cyclesNum);
  return cyclesNum;
});
 */

// 
function getCycleNum(ev) {
  ev.preventDefault();
  // let cyclesNum;
  const data = new FormData(ev.target);
  for (const [name,value] of data) {
    cyclesNum = value;
    cyclesNum = parseInt(cyclesNum, 10);
  }
  console.log(cyclesNum);
  return cyclesNum;
}

cyclesFormElement.addEventListener('submit', getCycleNum());

// Create more date input elements and add to document
function createDateInputs(cyclesNum) {
  let numDateInputs = cyclesNum;
  console.log(numDateInputs);
  if (isNaN(numDateInputs)) {
    return;
  }

  if (numDateInputs > 2) {
    const fragment = document.createDocumentFragment();
    let counter = numDateInputs;
    let i = 2;
    while (counter > 2) {
      let dateInput = cycleDateElement.cloneNode(true);
      i++;
      //
      counter--;
    }
  }
}

// Validate date inputs client side


// Handle dates form submission


// Process the date inputs


// Return results to page


// Create charts
