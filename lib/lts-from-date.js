/* @flow */
/* eslint-disable node/no-unsupported-features */
'use strict'

function getLTSFromYear (year /* : number */) {
  return 2 * (year - 2013)
}

function ltsFromDate (date /* : string | Date */) {
  var month, year
  if (!date) {
    return 0
  }
  if (typeof date === 'string') {
    date = new Date(Date.parse(date))
  }
  // duck-type for what we expect from Date objects
  if (typeof date.getMonth === 'function' && typeof date.getFullYear === 'function') {
    month = date.getMonth()
    year = date.getFullYear()
    if (month >= 4) {
      // special case because 4.x was released later in the cycle
      if (month < 8 && year <= 2015) {
        return 0
      }
      return getLTSFromYear(year)
    }
    return getLTSFromYear(year - 1)
  }
  return 0
}

module.exports = {
  ltsFromDate: ltsFromDate
}
