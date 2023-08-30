/**
 * @function arithmeticGeometricMean
 * @description This finds the Arithmetic-Geometric Mean (AGM) between two numbers.
 * @param {Number} am - The first number.
 * @param {Number} gm - The second number.
 * @return {Number} The AGM of both numbers.
 * @see TheAlgorithms
 */

const arithmeticGeometricMean = (am, gm) => {
  if (am === Infinity && gm === 0) {
    return NaN;
  }

  if (Object.is(am, -0) && !Object.is(gm, -0)) {
    return 0;
  }

  if (am === gm) {
    return am;
  }

  let temp;

  do {
    [am, gm, temp] = [((am + gm) / 2), Math.sqrt(am * gm), am];
  } while (am !== temp && !isNaN(am));

  return am;
};

export { arithmeticGeometricMean };

/* Test
console.log (arithmeticGeometricMean(27, 25)); // => 25.990380166782778
*/
