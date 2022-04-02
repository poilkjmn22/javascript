"use strict";

var _util = require("./util.js");

test('replace string at index', () => {
  expect((0, _util.replaceStrAt)('abc', 1, 'd')).toBe('adc');
});