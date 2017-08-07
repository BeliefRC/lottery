'use strict';

var PluginError = require('gulp-util').PluginError;
var map = require('map-stream');

var timeout;

function until(param) {
  var wait = 100;
  var func;

  if (!param) {
    return result();
  }

  if (typeof param === 'function') {
    return result(param);
  }

  if (typeof param.check === 'function') {
    func = param.check;
  }

  if (typeof param.wait === 'number') {
    wait = param.wait;
  }

  return result(func, wait);
};

function check(func, wait, file, cb) {
  if (timeout) {
    clearTimeout(timeout);
  }

  let condition = func();

  if (condition === true) {
    return cb(null, file);
  }

  if (condition !== false) {
    return(cb(error('The evaluation function has to explicitly return true or false.')));
  }

  timeout = setTimeout(function() {
    check(func, wait, file, cb);
  }, wait);
}

function error(message) {
  return new PluginError('gulp-until', {
    message: message || 'Sorry, that\'s all we know.'
  })
}

function result(func, wait) {
  return map(function(file, cb) {
    if (!func) {
      return cb(error('No evaluation function passed.'));
    }

    check(func, wait, file, cb);
  });
}

module.exports = until;
