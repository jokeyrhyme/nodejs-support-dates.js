# nodejs-support-dates [![npm](https://img.shields.io/npm/v/nodejs-support-dates.svg?maxAge=2592000)](https://www.npmjs.com/package/nodejs-support-dates) [![AppVeyor Status](https://ci.appveyor.com/api/projects/status/github/jokeyrhyme/nodejs-support-dates-js?branch=master&svg=true)](https://ci.appveyor.com/project/jokeyrhyme/nodejs-support-dates-js) [![Travis CI Status](https://travis-ci.org/jokeyrhyme/nodejs-support-dates.js.svg?branch=master)](https://travis-ci.org/jokeyrhyme/nodejs-support-dates.js)

calculate planned Node.js support windows based on LTS plans


## What is this?

This project hardcodes a few key dates for past releases,
and otherwise calculates key dates for current and future releases.

The behaviour of this project is based upon:

- upstream Node.js Long-Term Support schedule: https://github.com/nodejs/LTS

-   dates of previous releases: https://github.com/nodejs/node/releases

-   change logs for previous releases: https://github.com/nodejs/node/blob/master/doc/changelogs/

-   official schedule in JSON format: https://github.com/nodejs/LTS/blob/master/schedule.json

The purpose of this project is to allow other tools to make useful and accurate recommendations to Node.js users.


## Usage


### API


#### `datesFromVersion (version)`

-   version: number (major version) | string (e.g. `"1.2.3"`)

-   returns: `{ start: '...', release: '...', end: '...' }` (values are `Date`s)

This will return accurate dates for versions listed at: https://github.com/nodejs/LTS

Other versions will result in incorrect dates set in the distant past,
as this is sufficient for the primary purpose of this library.

Example:

```js
var datesFromVersion = require('nodejs-support-dates').datesFromVersion

JSON.stringify(datesFromVersion(process.version), null, 2)
/* if run within Node.js 6.x, will return
{
  "start": "2016-04-01T00:00:00.000Z", // recommended
  "release": "2016-04-01T00:00:00.000Z", // deprecated
  "end": "2019-04-01T00:00:00.000Z"
}
*/

// example uses `JSON.stringify()` to more easily illustrate the `Date` values
```

**DEPRECATION**: I will remove the "release" property in a future release, so please transition your code to use the "start" property


#### `ltsFromDate (date)`

-   date: string (ISO8601) | `Date`

-   returns: number (major version)

Example:

```js
var ltsFromDate = require('nodejs-support-dates').ltsFromDate

ltsFromDate('2016-04-01') // => 6
ltsFromDate(new Date()) // => 6
```


## Strategy

This package produces results according to the following priority:

1.  refer to built-in schedule data within this package, unless this data is incomplete

  -   `datesFromVersion()` considers this incomplete if the built-in schedule data does not contain a requested version

  -   `ltsFromDate()` always considers this incomplete (for now)

2.  use best-guess algorithms, based upon the general schedule pattern

3.  if appropriate version metadata is still unavailable, then assume a fictional 1970s version of Node.js
