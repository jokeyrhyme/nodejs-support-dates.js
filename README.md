# nodejs-support-dates.js [![npm](https://img.shields.io/npm/v/nodejs-support-dates.js.svg?maxAge=2592000)](https://www.npmjs.com/package/nodejs-support-dates.js) [![AppVeyor Status](https://ci.appveyor.com/api/projects/status/github/jokeyrhyme/nodejs-support-dates.js?branch=master&svg=true)](https://ci.appveyor.com/project/jokeyrhyme/nodejs-support-dates.js) [![Travis CI Status](https://travis-ci.org/jokeyrhyme/nodejs-support-dates.js.svg?branch=master)](https://travis-ci.org/jokeyrhyme/nodejs-support-dates.js)

calculate planned Node.js support windows based on LTS plans


## What is this?

This project hardcodes a few key dates for past releases,
and otherwise calculates key dates for current and future releases.

The behaviour of this project is based upon:

- upstream Node.js Long-Term Support schedule: https://github.com/nodejs/LTS

- dates of previous releases: https://github.com/nodejs/node/releases

- change logs for previous releases: https://github.com/nodejs/node/blob/master/doc/changelogs/

The purpose of this project is to allow other tools to make useful and accurate recommendations to Node.js users.


## Usage


### API


#### `datesFromVersion (version)`

- version: number (major version) | string (e.g. `"1.2.3"`)

- returns: `{ release: '...', maintenance: '...', end: '...' }` (ISO8601 string values)


#### `majorVersionFromDate (date)`

- date: string (ISO8601) | `Date`

- returns: number
