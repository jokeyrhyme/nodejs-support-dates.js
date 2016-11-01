/* @flow */
/* eslint-disable node/no-unsupported-features */
'use strict'

var semver = require('semver')

var versions = require('./versions.json')

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
  return {
    release: new Date(Date.parse(releaseYear + '-04-01')),
    end: new Date(Date.parse(endYear + '-04-01'))
  }
}

function getModernDates (version /* : number */) {
  var releaseYear = 2013 + Math.floor(version / 2)
  var endYear = releaseYear + 1
  return {
    release: new Date(Date.parse(releaseYear + '-10-01')),
    end: new Date(Date.parse(endYear + '-07-01'))
  }
}

function getZeroDotDates (version /* : number | string */) {
  if (typeof version === 'number') {
    // make an assumption that 0.10.x is more likely / useful than 0.1.x
    version = version === 0.1 ? '0.10.0' : version + '.0'
  }
  if (version && typeof version === 'string') {
    version = semver.major(version) + '.' + semver.minor(version)
    return {
      release: new Date(Date.parse(versions[version].release)),
      end: new Date(Date.parse(versions[version].end))
    }
  }
}

function datesFromVersion (version /* : number | string */) {
  var dates
  var majorVersion = getMajorVersion(version)
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
  return {
    release: new Date(0), // 1970-01-01
    end: new Date(0) // 1970-01-01
  }
}

module.exports = {
  datesFromVersion: datesFromVersion
}
