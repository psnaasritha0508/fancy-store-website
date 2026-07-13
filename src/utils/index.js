/**
 * cn — class name utility
 * Joins truthy class strings, filtering falsy values.
 * Lightweight alternative to clsx for this project.
 *
 * @param {...string} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * formatCurrency — formats a number as USD currency string
 * @param {number} amount
 * @param {string} currency
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style:    'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * truncate — truncates a string to a given length
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
export function truncate(str, maxLen = 80) {
  if (!str || str.length <= maxLen) return str
  return str.slice(0, maxLen).trimEnd() + '…'
}
