const fs=require('fs');
const addMatchers=require('add-matchers');

module.exports=matchers= {
  toBeFile: function (util, equality) {
    return {
      compare: function (actual, expected) {
        var result = {};
        result.pass = fs.existsSync(actual);
        if (result.pass) {
          result.message = 'Expected file ' + actual + ' not to exist';
        } else {
          result.message = 'Expected file' + actual + ' to exist';
        }
        return result;
      }
    }
  },
  toBeVideoWhichContains:  function (util, equality) {
    return {
      compare: function (actual, expected) {
        var result = {};
        result.pass = fs.existsSync(actual);
        if (result.pass) {
          result.message = 'Expected file ' + actual + ' not to exist';
        } else {
          result.message = 'Expected file' + actual + ' to exist';
        }
        return result;
      }
    }
  }
};
addMatchers(matchers);
