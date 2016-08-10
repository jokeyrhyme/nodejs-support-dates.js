/* @flow */
'use strict'

var semver = require('semver')

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

function datesFromVersion (version /* : number | string */) {
  var majorVersion = getMajorVersion(version)
  if (isModern(majorVersion)) {
    if (isLTS(majorVersion)) {
      return getModernLTSDates(majorVersion)
    }
    return getModernDates(majorVersion)
  }
}

module.exports = {
  datesFromVersion
}
