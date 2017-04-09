/* @flow */
'use strict'

var semver = require('semver')

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

  // Schedule => string[]
  Object.keys(schedule).forEach(function (version) {
    dates = dates.concat(extractDates(schedule[version]))
  })
  dates.sort()

  date = new Date(date) // cast to date, just in case
  oldest = new Date(dates[0])
  newest = new Date(dates[dates.length - 1])

  return date > oldest && date < newest
}

function normalizeVersion (
  version /* : number | string */
) /* : string */ {
  var major

  // convert number to string
  if (typeof version === 'number') {
    if (version === 0.1) {
      // assume that 0.10.x is more likely / useful than 0.1.x
      version = '0.10'
    } else {
      version = '' + version
    }
  }

  // ensure we have valid 1.2.3 format
  while ((version.match(/\./g) || []).length < 2) {
    version += '.0'
  }

  major = semver.major(version)
  if (major >= 1) {
    return 'v' + major
  }
  return 'v' + major + '.' + semver.minor(version)
}

function isVersionInSchedule (
  version /* : number | string */,
  schedule /* : Schedule */
) /* : boolean */ {
  return !!(schedule[normalizeVersion(version)])
}

module.exports = {
  isDateInSchedule: isDateInSchedule,
  isVersionInSchedule: isVersionInSchedule,
  normalizeVersion: normalizeVersion
}
