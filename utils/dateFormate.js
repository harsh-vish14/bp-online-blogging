/**
 *
 * @param {Date} dateISO date ISO string
 * @returns {Number} return date in DD-MM-YYYY format
 */
export const dateFormate = (dateISO) => {
  const date = new Date(Number(dateISO));
  return `${date.toLocaleDateString().split("/").join("-")}`;
};
