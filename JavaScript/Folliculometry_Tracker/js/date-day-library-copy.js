function dateObjIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

function dateAsStringIsValid(forDateStr) {
  const regexYYYYMMDD = /^\d{4}[./-]\d{2}[./-]\d{2}$/g;
  const regexDDMMYYYY = /^\d{2}[./-]\d{2}[./-]\d{4}$/g;
  const regexMMDDYYYY = /^\d{2}[./-]\d{2}[./-]\d{4}$/g;

  const dateStr = new String(forDateStr);
  console.log(dateStr);
  /* 
  console.log(dateStr.match(regexYYYYMMDD));
  console.log(dateStr.match(regexDDMMYYYY));
  console.log(dateStr.match(regexMMDDYYYY));
 */

  if ((dateStr.match(regexYYYYMMDD) === null) || (dateStr.match(regexDDMMYYYY) === null) || (dateStr.match(regexMMDDYYYY) === null)) {
    return false;
  }

  console.log(dateStr.match(regexYYYYMMDD));
  console.log(dateStr.match(regexDDMMYYYY));
  console.log(dateStr.match(regexMMDDYYYY));

  if (dateStr.match(regexYYYYMMDD)) {
    const date1 = new Date(dateStr);
    console.log(date1);

    const timestamp1 = date1.getTime();

    if (typeof timestamp1 !== 'number' || Number.isNaN(timestamp1)) {
      return false;
    }
    return true;
    // return date1.toISOString().startsWith(dateStr);
  }

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

const myDate = '2023-04-04';
console.log(dateAsStringIsValid(myDate));

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
  /* if ((!dateObjIsValid(bufDate)) || (!dateAsStringIsValid(bufDate))) {
    return;
  } */

  if (!dateObjIsValid(bufDate)) {
    return;
  }

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
  /* if ((!dateObjIsValid(bufDate)) || (!dateAsStringIsValid(bufDate))) {
    return;
  } */

  if (!dateObjIsValid(bufDate)) {
    return;
  }

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