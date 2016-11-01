/* @flow */
'use strict'

var test = require('tape')

var datesFromVersion = require('../lib/index.js').datesFromVersion

var testCases = [
  { version: 0.10, expected: { release: '2013-03-12', end: '2016-10-01' } },
  { version: '0.10.1', expected: { release: '2013-03-12', end: '2016-10-01' } },
  { version: 'v0.10.1', expected: { release: '2013-03-12', end: '2016-10-01' } },
  { version: 0.12, expected: { release: '2015-02-07', end: '2016-12-31' } },
  { version: '0.12.1', expected: { release: '2015-02-07', end: '2016-12-31' } },
  { version: 'v0.12.1', expected: { release: '2015-02-07', end: '2016-12-31' } },
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
    t.end()
  })
})
