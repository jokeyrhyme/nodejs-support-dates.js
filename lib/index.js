/* @flow */
'use strict'

/* ::
export type SupportDates = {
  start: Date,
  end: Date
}

export type Metadata = {
  start: string,
  end: string,

  lts?: string,
  maintenance?: string,
  codename?: string
}

export type Schedule = { [id:string]: Metadata }
*/

var datesFromVersion = require('./dates-from-version.js').datesFromVersion
var ltsFromDate = require('./lts-from-date.js').ltsFromDate

module.exports = {
  datesFromVersion: datesFromVersion,
  ltsFromDate: ltsFromDate
}
