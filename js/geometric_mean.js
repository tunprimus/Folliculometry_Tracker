/* Geometric mean (Two Methods) +++>>> https://www.geeksforgeeks.org/geometric-mean-two-methods/ */

/* 
  array.reduce(function(accumulator, currentValue, currentIndex, arr), initialValue);

  array.reduce((accumulator, currentValue, currentIndex, arr) => {}, initialValue);
*/

// Simple, time complexity O(n), auxiliary space O(1)
// High risk of stack overflow
/* 
function geometricMeanForLoop(array, num) {
  let product = 1;
  
  for (let i = 0; i < num; i++) {
      product = product * array[i];
  }
  
  let geoMean = Math.pow(product, 1 / num);
  return geoMean;
} */

function geometricMeanDirectReduce(array, storeObj = null) {
  let product = array.reduce((accumulator, currentValue) => {
    return accumulator * currentValue;
  }, 1);

  let geoMean = Math.pow(product, (1 / array.length));
  return geoMean;
}

// Better, time complexity O(n), auxiliary space O(1)
// Low risk of stack overflow
/* 
function geometricMeanLog(array, num) {
  let sum = 0;
  
  for (let i = 0; i < num; i++) {
      sum = sum + Math.log(array[i]);
  }
  
  let avgSum = sum / num;
  return Math.exp(avgSum);
} */

function geometricMeanLogReduce(array, storeObj = null) {
  let avgSum = array.reduce((accumulator, currentValue, currentIndex, arr) => {
    return (accumulator + Math.log(array[currentIndex]) / arr.length);
  }, 0);

  return Math.exp(avgSum);
}

/* Test */
/* 
const testArray = [2, 3, 4, 5, 6];
console.log(geometricMeanForLoop(testArray, testArray.length));
console.log(geometricMeanDirectReduce(testArray));
console.log(geometricMeanLog(testArray, testArray.length));
console.log(geometricMeanLogReduce(testArray));
 */

export { geometricMeanDirectReduce, geometricMeanLogReduce, };
