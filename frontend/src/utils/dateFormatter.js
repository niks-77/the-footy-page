import { format, parseISO, startOfToday, isSameDay, subDays, addDays } from 'date-fns'

/**
 * Formats an ISO date string to HH:mm format
 * @param {string} isoDate 
 * @returns {string}
 */
export const formatTime = (isoDate) => format(parseISO(isoDate), 'HH:mm')

/**
 * Formats a Date object to YYYY-MM-DD
 * @param {Date} date 
 * @returns {string}
 */
export const formatDateToString = (date) => format(date, 'yyyy-MM-dd')

/**
 * Returns the current date at 00:00
 * @returns {Date}
 */
export const today = () => startOfToday()

/**
 * Checks if the given date is yesterday
 * @param {Date} date 
 * @returns {boolean}
 */
export const isYesterday = (date) => isSameDay(date, subDays(today(), 1))

/**
 * Checks if the given date is tomorrow
 * @param {Date} date 
 * @returns {boolean}
 */
export const isTomorrow = (date) => isSameDay(date, addDays(today(), 1))