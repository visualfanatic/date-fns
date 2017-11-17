import toDate from '../toDate/index.js'

/**
 * @name eachWeekOfInterval
 * @category Interval Helpers
 * @summary Return the array of weekly timestamps within the specified time interval.
 *
 * @description
 * Return the array of weekly timestamps within the specified time interval.
 *
 * @param {Interval} interval - the interval. See [Interval]{@link docs/types/Interval}
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date[]} the array with starts of weekly timepoints from the month of the interval start to the month of the interval end
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each weekly timepoint between 17 November 2017 and 16 December 2017:
 * var result = eachDayOfInterval({
 *   start: new Date(2017, 10, 17),
 *   end: new Date(2017, 11, 16)
 * })
 * //=> [
 * //   Fri Nov 17 2017 00:00:00,
 * //   Fri Nov 24 2017 00:00:00,
 * //   Fri Dec 01 2017 00:00:00,
 * //   Fri Dec 08 2017 00:00:00,
 * //   Fri Dec 15 2017 00:00:00,

 * // ]
 */
export default function eachWeekOfInterval(dirtyInterval, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
  }

  var interval = dirtyInterval || {}
  var startDate = toDate(interval.start, dirtyOptions)
  var endDate = toDate(interval.end, dirtyOptions)

  var endTime = endDate.getTime()

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError('Invalid interval')
  }

  var dates = []

  var currentDate = startDate
  currentDate.setHours(0, 0, 0, 0)

  while (currentDate.getTime() <= endTime) {
    dates.push(toDate(currentDate, dirtyOptions))
    currentDate.setDate(currentDate.getDate() + 7)
  }

  return dates
}
