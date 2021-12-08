import bcrypt from "bcrypt";

/**
 * @description it helps to hash the password
 * @param {String} password password to hash
 * @return {string} sends the hashed password
 */
export const hashing = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

/**
 * @description it helps to compare hashed password and non-hashed password
 * @param {string} OldPassword old password
 * @param {string} NewPassword new password
 * @return {boolean} on success returns true else false
 */
export const comparePassword = async (newPassword, oldPassword) => {
  return await bcrypt.compare(newPassword, oldPassword);
};
