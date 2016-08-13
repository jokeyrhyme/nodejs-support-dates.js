/* @flow */
'use strict'

var datesFromVersion = require('./dates-from-version.js').datesFromVersion
var ltsFromDate = require('./lts-from-date.js').ltsFromDate

module.exports = {
  datesFromVersion: datesFromVersion,
  ltsFromDate: ltsFromDate
}
