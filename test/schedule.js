'use strict'

var test = require('tape')

var lib = require('../lib/schedule.js')
var schedule = require('../lib/schedule.json')

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
