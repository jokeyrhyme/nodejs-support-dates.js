/* @flow */
'use strict'

var test = require('ava')

var datesFromVersion = require('./index.js').datesFromVersion

var testCases = [
  { version: 4, expected: { release: '2015-04-01', end: '2018-04-01' } },
  { version: '4.2.3', expected: { release: '2015-04-01', end: '2018-04-01' } },
  { version: 'v4.2.3', expected: { release: '2015-04-01', end: '2018-04-01' } },
  { version: 5, expected: { release: '2015-10-01', end: '2016-07-01' } },
  { version: 6, expected: { release: '2016-04-01', end: '2019-04-01' } },
  { version: '6.3.0', expected: { release: '2016-04-01', end: '2019-04-01' } },
  { version: 'v6.3.0', expected: { release: '2016-04-01', end: '2019-04-01' } },
  { version: 7, expected: { release: '2016-10-01', end: '2017-07-01' } },
  { version: 8, expected: { release: '2017-04-01', end: '2020-04-01' } }
]

testCases.forEach(function (testCase) {
  test('version = ' + testCase.version, function (t) {
    var result = datesFromVersion(testCase.version)
    var expected = {
      release: new Date(Date.parse(testCase.expected.release)),
      end: new Date(Date.parse(testCase.expected.end))
    }
    t.deepEqual(result, expected)
  })
})
