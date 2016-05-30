var loader = require('../sys/loader');

loader(['dist/eets.test.js'], function (value) {
  run();
});
