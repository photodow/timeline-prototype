/**
 * Returns the last day in the month
 * e.g. 30 days in june, 30 would be returned
 * @returns returns integer
 */
export const getTotalDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Takes two dates and determines how many months are inbetween
 * @returns returns an integer of months
 */
export const monthsBetween = (startDate, endDate, offset) => {

  const totalDays = getTotalDaysInMonth(startDate);
  let offsetByDays = 0;

  if (offset) {
    offsetByDays += (endDate.getDate()) / totalDays;
  } else {
    if (startDate.getMonth() !== endDate.getMonth()) {
      offsetByDays += (totalDays - startDate.getDate()) / totalDays; // first month days
      const totalDaysLastMonth = getTotalDaysInMonth(endDate);
      offsetByDays += ((endDate.getDate()) / getTotalDaysInMonth(endDate)) - 1; // last month days
    } else {
      offsetByDays += (endDate.getDate() - startDate.getDate()) / totalDays;
    }
  }

  if (!offsetByDays) {
    offsetByDays = 1 / totalDays;
  }

  return (endDate.getMonth() - startDate.getMonth()
      + (12 * (endDate.getFullYear() - startDate.getFullYear())))
      + offsetByDays;
}
