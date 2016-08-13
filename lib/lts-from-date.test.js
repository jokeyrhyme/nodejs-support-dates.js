'use strict'

var test = require('tape')

var ltsFromDate = require('./index.js').ltsFromDate

var testCases = [
  { date: '2015-05-01', expected: 0 },
  { date: '2015-09-01', expected: 4 },
  { date: new Date(Date.parse('2015-09-01')), expected: 4 },
  { date: '2015-11-01', expected: 4 },
  { date: '2016-05-01', expected: 6 },
  { date: new Date(Date.parse('2016-05-01')), expected: 6 },
  { date: '2016-11-01', expected: 6 },
  { date: '2017-05-01', expected: 8 },
  { date: '2017-11-01', expected: 8 }
]

testCases.forEach(function (testCase) {
  test('date = ' + testCase.date, function (t) {
    var result = ltsFromDate(testCase.date)
    t.equal(result, testCase.expected)
    t.end()
  })
})
