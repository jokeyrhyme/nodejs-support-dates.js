/* @flow */
/* eslint-disable node/no-unsupported-features */
'use strict'

var semver = require('semver')

/* :: import type { Schedule } from './index.js' */

var versions /* : Schedule */ = require('./schedule.json')

function getMajorVersion (version /* : number | string */) {
  if (typeof version === 'number') {
    return Math.floor(version)
  }
  if (version && typeof version === 'string') {
    return semver.major(version)
  }
  return 0
}

function isLTS (version /* : number */) {
  return version % 2 === 0
}

function isModern (version /* : number */) {
  return version >= 4
}

function getModernLTSDates (version /* : number */) {
  var releaseYear = 2013 + (version / 2)
  var endYear = releaseYear + 3
  var start = new Date(Date.parse(releaseYear + '-04-01'))
  return {
    start: start,
    release: start, // TODO: deprecated
    end: new Date(Date.parse(endYear + '-04-01'))
  }
}

function getModernDates (version /* : number */) {
  var releaseYear = 2013 + Math.floor(version / 2)
  var endYear = releaseYear + 1
  var start = new Date(Date.parse(releaseYear + '-10-01'))
  return {
    start: start,
    release: start, // TODO: deprecated
    end: new Date(Date.parse(endYear + '-07-01'))
  }
}

function getZeroDotDates (version /* : number | string */) {
  var start
  if (typeof version === 'number') {
    // make an assumption that 0.10.x is more likely / useful than 0.1.x
    version = version === 0.1 ? '0.10.0' : version + '.0'
  }
  if (version && typeof version === 'string') {
    version = 'v' + semver.major(version) + '.' + semver.minor(version)
    start = new Date(Date.parse(versions[version].start))
    return {
      start: start,
      release: start, // TODO: deprecated
      end: new Date(Date.parse(versions[version].end))
    }
  }
}

function datesFromVersion (version /* : number | string */) {
  var dates
  var majorVersion = getMajorVersion(version)
  var epoch

  if (isModern(majorVersion)) {
    if (isLTS(majorVersion)) {
      return getModernLTSDates(majorVersion)
    }
    return getModernDates(majorVersion)
  }

  dates = getZeroDotDates(version)
  if (dates) {
    return dates
  }

  // by default, return oldest dates
  epoch = new Date(0) // 1970-01-01
  return {
    start: epoch,
    release: epoch,
    end: epoch
  }
}

module.exports = {
  datesFromVersion: datesFromVersion
}
