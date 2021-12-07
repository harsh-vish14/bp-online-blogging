/**
 *
 * @param {Date} dateISO date ISO string
 * @returns {String} return date in DD-MM-YYYY format
 */
export const dateFormate = (dateISO) => {
  const date = new Date(dateISO);
  return `${date.toLocaleDateString().split("/").join("-")}`;
};
