export function dateObjIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

export function dateAsStringIsValid(dateStr) {
  const regexYYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;
  const regexDDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/;

  if ((dateStr.match(regexYYYYMMDD) === null) || (dateStr.match(regexDDMMYYYY) === null)) {
    return false;
  }

  if (dateStr.match(regexYYYYMMDD)) {
    const date1 = new Date(dateStr);

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
}

export function compareLocalAsc(laterDate, earlierDate) {
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

export function dateSort(bufDateLeft, bufDateRight) {
  if ((dateObjIsValid(bufDateLeft)) && (dateObjIsValid(bufDateRight))) {
    const dateLeft = bufDateLeft;
    const dateRight = bufDateRight;

    const sign = compareLocalAsc(dateLeft, dateRight);
  }
}

export function differenceInDays(bufDateLeft, bufDateRight) {
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

export function addDaysToDate(bufDate, bufDays) {
  if ((!dateObjIsValid(bufDate)) || (!dateAsStringIsValid(bufDate))) {
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

  toUseDate.setDate(toUseDate.getDate() + toUseAmount);
  return toUseDate;
}

export function subDaysFromDate(bufDate, bufDays) {
  if ((!dateObjIsValid(bufDate)) || (!dateAsStringIsValid(bufDate))) {
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

  toUseDate.setDate(toUseDate.getDate() - toUseAmount);
  return toUseDate;
}

// module.exports = { differenceInDays, dateObjIsValid, dateAsStringIsValid, compareLocalAsc, dateSort, addDaysToDate, subDaysFromDate, };

export default differenceInDays;