/* @flow */
'use strict'

var test = require('tape')

var lib = require('../lib/schedule.js')

var schedule = lib.read()

test('isDateInSchedule() should be false', function (t) {
  t.equal(lib.isDateInSchedule('2010-01-01', schedule), false)
  t.equal(lib.isDateInSchedule(new Date('9000-01-01'), schedule), false)
  t.end()
})

test('isDateInSchedule() should be true', function (t) {
  t.equal(lib.isDateInSchedule('2014-01-01', schedule), true)
  t.equal(lib.isDateInSchedule(new Date('2015-01-01'), schedule), true)
  t.end()
})

;[
  { input: 0.6, expected: false },
  { input: '0.6.6', expected: false },
  { input: 'v0.6.6', expected: false },
  { input: 0.1, expected: true },
  { input: '0.10.1', expected: true },
  { input: 'v0.10.1', expected: true }
].forEach(function (testCase) {
  var desc = typeof testCase.input + ' ' + testCase.input
  test('isVersionInSchedule() ' + desc, function (t) {
    var result = lib.isVersionInSchedule(testCase.input, schedule)
    t.equal(result, testCase.expected)
    t.end()
  })
})

;[
  { input: 0.1, expected: 'v0.10' },
  { input: '0.10.1', expected: 'v0.10' },
  { input: 'v0.10.1', expected: 'v0.10' },
  { input: 0.12, expected: 'v0.12' },
  { input: '0.12.2', expected: 'v0.12' },
  { input: 'v0.12.2', expected: 'v0.12' },
  { input: 4, expected: 'v4' },
  { input: 4.2, expected: 'v4' },
  { input: '4.2', expected: 'v4' },
  { input: 'v4.2.3', expected: 'v4' }
].forEach(function (testCase) {
  var desc = typeof testCase.input + ' ' + testCase.input
  test('normalizeVersion() ' + desc, function (t) {
    t.equal(lib.normalizeVersion(testCase.input), testCase.expected)
    t.end()
  })
})

