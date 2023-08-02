function dateObjIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

function dateAsStringIsValid(forDateStr) {
  /* const regexYYYYMMDD = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
  const regexDDMMYYYY = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
  const regexMMDDYYYY = /^\d{2}[./-]\d{2}[./-]\d{4}$/; */

  /* Javascript - Regex to validate date format - https://stackoverflow.com/questions/7388001/javascript-regex-to-validate-date-format */
  const regexYYYYMMDD = /^\d{4}([./-])\d{2}\1\d{2}$/;
  const regexDDMMYYYY = /^\d{2}([./-])\d{2}\1\d{4}$/;
  const regexMMDDYYYY = /^\d{2}([./-])\d{2}\1\d{4}$/;

  let isTrue = false;

  const dateStr = new String(forDateStr);
  /* 
  console.log(dateStr);
  console.log(dateStr.match(regexYYYYMMDD));
  console.log(dateStr.match(regexDDMMYYYY));
  console.log(dateStr.match(regexMMDDYYYY));
 */
  function checkYYYYMMDD(dateStr) {
    if (dateStr.match(regexYYYYMMDD)) {
      const date1 = new Date(dateStr);
  
      const timestamp1 = date1.getTime();
  
      if (typeof timestamp1 !== 'number' || Number.isNaN(timestamp1)) {
        return false;
      }
      return true;
      // return date1.toISOString().startsWith(dateStr);
    }
  }
  
  function checkDDMMYYYY(dateStr) {
    if (dateStr.match(regexDDMMYYYY)) {
      const [day, month, year] = dateStr.split('/');
  
      const isoFormattedStr = `${year}-${month}-${day}`;
  
      const date2 = new Date(isoFormattedStr);
  
      const timestamp2 = date2.getTime();
  
      if (typeof timestamp2 !== 'number' || Number.isNaN(timestamp2)) {
        return false;
      }
      return true;
      // return date2.toISOString().startsWith(dateStr);
    }
  }
  
  function checkMMDDYYYY(dateStr) {
    if (dateStr.match(regexMMDDYYYY)) {
      const [month, day, year] = dateStr.split('/');
  
      const isoFormattedStr = `${year}-${month}-${day}`;
  
      const date3 = new Date(isoFormattedStr);
  
      const timestamp3 = date3.getTime();
  
      if (typeof timestamp3 !== 'number' || Number.isNaN(timestamp3)) {
        return false;
      }
      return true;
      // return date3.toISOString().startsWith(dateStr);
    }
  }

  /* Javascript nested ternary operator - https://stackoverflow.com/questions/44716426/javascript-nested-ternary-operator
    If you were to re-write your if-else statements a bit.
    if (this.engagement === 'social-crm') {
      return item.verified === true;
    } else if (this.engagement === 'social') {
      return item.verified === false;
    } else if (this.engagement === 'all') {
      return item;
    }

    To this:
    if (this.engagement === 'social-crm') { return item.verified === true; }
    else {
      if (this.engagement === 'social') {item.verified === false; }
      else {
        if(this.engagement === 'all') {return item;} 
      }
    }

    Now, ternary operators follow a similar nested fashion.
    cond1 ? val1 : ( val2 )

    Where val2 => cond2 ? val3 : (val4)
    Where val4 => cond3 ? val5 : val6

    So, now you can rewrite your expression like this:
    this.engagement === 'social-crm' ? item.verified === true : 
    (this.engagement === 'social' ? item.verified === false : 
      (this.engagement === 'all' ?  item : null))
    && https://refine.dev/blog/javascript-ternary-operator/
  */
  
  const finalState = isTrue === true ? isTrue
    : isTrue = checkYYYYMMDD(dateStr) ? true
    : isTrue = checkDDMMYYYY(dateStr) ? true
    : isTrue = checkMMDDYYYY(dateStr) ? true
    : false;
  return finalState;
}

/* const myDate = 'joshua';
console.log(dateAsStringIsValid(myDate)); */

function compareLocalAsc(laterDate, earlierDate) {
  if ((dateObjIsValid(laterDate)) && (dateObjIsValid(earlierDate))) {
    const diff = laterDate.getFullYear() - earlierDate.getFullYear() || laterDate.getMonth() - earlierDate.getMonth() || laterDate.getDate() - earlierDate.getDate() || laterDate.getHours() - earlierDate.getHours || laterDate.getMinutes() - earlierDate.getMinutes() || laterDate.getSeconds() - earlierDate.getSeconds() || laterDate.getMilliseconds() - earlierDate.getMilliseconds();

    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1;
    } else {
      return diff;
    }
  }
}

function dateSort(bufDateLeft, bufDateRight) {
  if ((dateObjIsValid(bufDateLeft)) && (dateObjIsValid(bufDateRight))) {
    const dateLeft = bufDateLeft;
    const dateRight = bufDateRight;

    const sign = compareLocalAsc(dateLeft, dateRight);
  }
}

function addDaysToDate(bufDate, bufDays) {
  if ((!dateObjIsValid(bufDate)) && (!dateAsStringIsValid(bufDate))) {
    return;
  }

  /* if (!dateObjIsValid(bufDate)) {
    return;
  } */

  let toUseDate = bufDate;
  let toUseAmount = bufDays;

  if (isNaN(toUseAmount)) {
    return new Date(NaN);
  }

  if (!toUseAmount) {
    return toUseDate;
  }

  let adjustedDate = toUseDate.setDate(toUseDate.getDate() + toUseAmount);
  return new Date(adjustedDate);
}

function subDaysFromDate(bufDate, bufDays) {
  if ((!dateObjIsValid(bufDate)) && (!dateAsStringIsValid(bufDate))) {
    return;
  }

  /* if (!dateObjIsValid(bufDate)) {
    return;
  } */

  let toUseDate = bufDate;
  let toUseAmount = bufDays;

  if (isNaN(toUseAmount)) {
    return new Date(NaN);
  }

  if (!toUseAmount) {
    return toUseDate;
  }

  let adjustedDate = toUseDate.setDate(toUseDate.getDate() - toUseAmount);
  return new Date(adjustedDate);
}

function differenceInDays(bufDateLeft, bufDateRight) {
  if ((dateObjIsValid(bufDateLeft)) && (dateObjIsValid(bufDateRight))) {
    const dateLeft = bufDateLeft;
    const dateRight = bufDateRight;
    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    const sign = compareLocalAsc(dateLeft, dateRight);

    const difference = Math.abs(dateLeft - dateRight);
    const daysDiff = difference / oneDay;
    return daysDiff;
  }
}

/* 
const myDate = new Date('2023-07-07');
console.log(myDate);

let addToMyDate = addDaysToDate(myDate, 50);
console.log(addToMyDate);
let subFromMyDate = subDaysFromDate(myDate, 1050);
console.log(subFromMyDate);
 */

export { dateObjIsValid, dateAsStringIsValid, compareLocalAsc, dateSort, addDaysToDate, subDaysFromDate, differenceInDays, };