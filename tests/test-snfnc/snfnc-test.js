/*
  Inspired by:
  Testing JavaScript without a (third-party) framework +++>>> https://alexwlchan.net/2023/testing-javascript-without-a-framework/
  Unit Test Your JavaScript Code Without a Framework +++>>> https://javascript.plainenglish.io/unit-test-front-end-javascript-code-without-a-framework-8f00c63eb7d4
*/

'use strict';
  
/**
 * test function
 * @param {string} description
 * @param {function} test_function
 */

export function it(description, test_function) {
  const result = document.createElement('p');
  result.classList.add('test-result');

  try {
    test_function();
    result.classList.add('success');
    result.textContent = description;
    console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + description);
  } catch (err) {
    result.classList.add('failure');
    result.innerHTML = `${description}<br><pre>${err}</pre>`;
    console.log('\n');
    console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + description);
    console.error(err);
  }

  document.body.appendChild(result);
}

export function assertEqual(expected, actual) {
  if (expected === actual || (typeof expected === 'object' && typeof actual === 'object' && expected.length === actual.length && expected.every((element, index) => element === actual[index]))) {
    return;
  } else {
    throw new Error(`${expected} != ${actual}`);
  }
}

export function assertTrue(value) {
  assertEqual(value, true);
}

export function assertFalse(value) {
  assertEqual(value, false);
}

export function assert(isTrue) {
  if (!isTrue) {
    throw new Error();
  }
}

/* Demo */
it('should fail', function() {
  assert(1 !== 1);
});
