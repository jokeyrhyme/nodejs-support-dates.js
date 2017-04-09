/* @flow */
/* eslint-disable node/no-unsupported-features */
'use strict'

var semver = require('semver')

/* :: import type {
  Metadata, Schedule, SupportDates
} from './index.js' */

var schedule = require('./schedule.js')

function createDefaultDates () /* : SupportDates */ {
  // by default, return oldest dates
  var epoch = new Date(0) // 1970-01-01
  return {
    start: epoch,
    release: epoch,
    end: epoch
  }
}

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

function toSupportDates (data /* : Metadata */) /* : SupportDates */ {
  var start = new Date(Date.parse(data.start))
  return {
    start: start,
    release: start, // TODO: deprecated
    end: new Date(Date.parse(data.end))
  }
}

function datesFromVersion (version /* : number | string */) {
  var id = schedule.normalizeVersion(version)
  var majorVersion
  var versions

  versions = schedule.read()
  if (schedule.isValidMetadata(versions[id])) {
    return toSupportDates(versions[id])
  }

  majorVersion = getMajorVersion(version)
  if (isModern(majorVersion)) {
    if (isLTS(majorVersion)) {
      return getModernLTSDates(majorVersion)
    }
    return getModernDates(majorVersion)
  }

  return createDefaultDates()
}

module.exports = {
  datesFromVersion: datesFromVersion
}
