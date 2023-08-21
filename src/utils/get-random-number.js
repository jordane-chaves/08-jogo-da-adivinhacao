/**
 * Generate random integer number between min and max.
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function getRandomNumber(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)

  const randomNumber = Math.random() * (max - min) + min
  return Math.round(randomNumber)
}