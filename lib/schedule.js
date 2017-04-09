/* @flow */
'use strict'

/* :: import type { Metadata, Schedule } from './index.js' */

var DATE_REGEXP = /^\d+-\d{2}-\d{2}$/

function extractDates (data /* : Metadata */) /* : string[] */ {
  var dates = [
    data.start,
    data.end
  ]
  if (data.lts !== void 0 && DATE_REGEXP.test(data.lts)) {
    dates.push(data.lts)
  }
  if (data.maintenance !== void 0 && DATE_REGEXP.test(data.maintenance)) {
    dates.push(data.maintenance)
  }
  return dates
}

function isDateInSchedule (
  date /* : string | Date */,
  schedule /* : Schedule */
) /* : boolean */ {
  var dates = []
  var newest = null
  var oldest = null
  var version

  // Schedule => string[]
  for (version in schedule) {
    if (schedule.hasOwnProperty(version)) {
      dates = dates.concat(extractDates(schedule[version]))
    }
  }
  dates.sort()

  date = new Date(date) // cast to date, just in case
  oldest = new Date(dates[0])
  newest = new Date(dates[dates.length - 1])

  return date > oldest && date < newest
}

function isVersionInSchedule (
  version /* : number | string */,
  schedule /* : Schedule */
) /* : boolean */ {
  return true
}

module.exports = {
  isDateInSchedule: isDateInSchedule,
  isVersionInSchedule: isVersionInSchedule
}
