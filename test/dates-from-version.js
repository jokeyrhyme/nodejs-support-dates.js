/* @flow */
'use strict'

var test = require('tape')

var datesFromVersion = require('../lib/index.js').datesFromVersion

var testCases = [
  { version: 0.10, expected: { start: '2013-03-11', release: '2013-03-11', end: '2016-10-31' } },
  { version: '0.10.1', expected: { start: '2013-03-11', release: '2013-03-11', end: '2016-10-31' } },
  { version: 'v0.10.1', expected: { start: '2013-03-11', release: '2013-03-11', end: '2016-10-31' } },
  { version: 0.12, expected: { start: '2015-02-06', release: '2015-02-06', end: '2016-12-31' } },
  { version: '0.12.1', expected: { start: '2015-02-06', release: '2015-02-06', end: '2016-12-31' } },
  { version: 'v0.12.1', expected: { start: '2015-02-06', release: '2015-02-06', end: '2016-12-31' } },
  { version: 4, expected: { start: '2015-09-08', release: '2015-09-08', end: '2018-04-01' } },
  { version: '4.2.3', expected: { start: '2015-09-08', release: '2015-09-08', end: '2018-04-01' } },
  { version: 'v4.2.3', expected: { start: '2015-09-08', release: '2015-09-08', end: '2018-04-01' } },
  { version: 5, expected: { start: '2015-10-29', release: '2015-10-29', end: '2016-06-30' } },
  { version: 6, expected: { start: '2016-04-26', release: '2016-04-26', end: '2019-04-01' } },
  { version: '6.3.0', expected: { start: '2016-04-26', release: '2016-04-26', end: '2019-04-01' } },
  { version: 'v6.3.0', expected: { start: '2016-04-26', release: '2016-04-26', end: '2019-04-01' } },
  { version: 7, expected: { start: '2016-10-01', release: '2016-10-01', end: '2017-07-01' } },
  { version: 8, expected: { start: '2017-04-01', release: '2017-04-01', end: '2020-04-01' } }
]

function fromJSON (data /* : Object */) {
  return {
    start: new Date(Date.parse(data.release)),
    release: new Date(Date.parse(data.release)),
    end: new Date(Date.parse(data.end))
  }
}

testCases.forEach(function (testCase) {
  test('datesFromVersion() ' + testCase.version, function (t) {
    var result = datesFromVersion(testCase.version)
    t.deepEqual(result, fromJSON(testCase.expected))
    t.end()
  })
})
