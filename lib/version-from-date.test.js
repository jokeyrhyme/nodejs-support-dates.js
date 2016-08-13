/* @flow */
'use strict'

var test = require('tape')

var versionFromDate = require('./index.js').versionFromDate

test('', function (t) {
  versionFromDate()
  t.end()
})
