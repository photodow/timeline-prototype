/**
 * Takes two dates and determines how many days are inbetween.
 * @returns returns an integer of days
 */
export const daysBetween = (startDate, endDate) => {
  return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
}
