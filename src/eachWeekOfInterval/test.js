// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import eachWeekOfInterval from '.'

describe('eachWeekOfInterval', function () {

  it('returns an array with starts of weekly dates from the day of the start date to the day of the end date', function () {
    var result = eachWeekOfInterval({
      start: new Date(2017, 10 /* Nov */, 17),
      end: new Date(2017, 11 /* Dec */, 16)
    })
    assert.deepEqual(result, [
      new Date(2017, 10 /* Nov */, 17),
      new Date(2017, 10 /* Nov */, 24),
      new Date(2017, 11 /* Dec */, 1),
      new Date(2017, 11 /* Dec */, 8),
      new Date(2017, 11 /* Dec */, 15)
    ])
  })

  it('accepts strings', function () {
    var result = eachWeekOfInterval({
      start: new Date(2017, 10 /* Oct */, 17).toISOString(),
      end: new Date(2017, 11 /* Oct */, 16).toISOString()
    })
    assert.deepEqual(result, [
      new Date(2017, 10 /* Nov */, 17),
      new Date(2017, 10 /* Nov */, 24),
      new Date(2017, 11 /* Dec */, 1),
      new Date(2017, 11 /* Dec */, 8),
      new Date(2017, 11 /* Dec */, 15)
    ])
  })

  it('accepts timestamps', function () {
    var result = eachWeekOfInterval({
      start: new Date(2017, 10 /* Oct */, 17).getTime(),
      end: new Date(2017, 11 /* Oct */, 16).getTime()
    })
    assert.deepEqual(result, [
      new Date(2017, 10 /* Nov */, 17),
      new Date(2017, 10 /* Nov */, 24),
      new Date(2017, 11 /* Dec */, 1),
      new Date(2017, 11 /* Dec */, 8),
      new Date(2017, 11 /* Dec */, 15)
    ])
  })

  it('handles the dates that are not starts of days', function () {
    var result = eachWeekOfInterval({
      start: new Date(2017, 10 /* Oct */, 17, 6, 35),
      end: new Date(2017, 11 /* Oct */, 16, 22, 15)
    })
    assert.deepEqual(result, [
      new Date(2017, 10 /* Nov */, 17),
      new Date(2017, 10 /* Nov */, 24),
      new Date(2017, 11 /* Dec */, 1),
      new Date(2017, 11 /* Dec */, 8),
      new Date(2017, 11 /* Dec */, 15)
    ])
  })

  it('returns one day if the both arguments are on the same day', function () {
    var result = eachWeekOfInterval({
      start: new Date(2017, 10 /* Nov */, 17, 14),
      end: new Date(2017, 10 /* Nov */, 17, 15)
    })
    assert.deepEqual(result, [
      new Date(2017, 10 /* Nov */, 17)
    ])
  })

  it('returns one day if the both arguments are the same', function () {
    var result = eachWeekOfInterval({
      start: new Date(2017, 10 /* Nov */, 17, 14),
      end: new Date(2017, 10 /* Nov */, 17, 14)
    })
    assert.deepEqual(result, [
      new Date(2017, 10 /* Nov */, 17)
    ])
  })

  it('throws an exception if the start date is after the end date', function () {
    var block = eachWeekOfInterval.bind(
      null,
      {
        start: new Date(2014, 9 /* Oct */, 12),
        end: new Date(2014, 9 /* Oct */, 6)
      }
    )
    assert.throws(block, RangeError)
  })

  it('throws an exception if the start date is `Invalid Date`', function () {
    var block = eachWeekOfInterval.bind(
      null,
      {
        start: new Date(NaN),
        end: new Date(2014, 9 /* Oct */, 6)
      }
    )
    assert.throws(block, RangeError)
  })

  it('throws an exception if the end date is `Invalid Date`', function () {
    var block = eachWeekOfInterval.bind(
      null,
      {
        start: new Date(2014, 9 /* Oct */, 12),
        end: new Date(NaN)
      }
    )
    assert.throws(block, RangeError)
  })

  it('throws an exception if the interval is undefined', function () {
    var block = eachWeekOfInterval.bind(
      null,
      // $ExpectedMistake
      undefined
    )
    assert.throws(block, RangeError)
  })

  it('throws `RangeError` if `options.additionalDigits` is not convertable to 0, 1, 2 or undefined', function () {
    var block = eachWeekOfInterval.bind(null, {
      start: new Date(2014, 9 /* Oct */, 6),
      end: new Date(2014, 9 /* Oct */, 12)
      // $ExpectedMistake
    }, { additionalDigits: NaN })
    assert.throws(block, RangeError)
  })

  it('throws TypeError exception if passed less than 1 argument', function () {
    assert.throws(eachWeekOfInterval.bind(null), TypeError)
  })
})
