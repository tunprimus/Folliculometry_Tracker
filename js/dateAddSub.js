// import { dateObjIsValid, dateAsStringIsValid } from './date-day-diff';

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