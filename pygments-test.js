/*
 * pygments.js: A node.js wrapper for pygments
 *
 * (C) 2011, Pavan Kumar Sunkara
 *
 */

var vows = require('vows'),
    assert = require('assert'),
    fs = require('fs');

var pygments = require('./pygments');

vows.describe('Pygments Test').addBatch({
  'Pygments': {
    topic: pygments,
    'trivial': function (pygments) {
       assert.isTrue (true);
    },
    'colorize': {
      'dirname': function (pygments) {
        assert.equal (pygments.colorize('..', 'ruby', 'html'), '..');
      },
      'filename': function (pygments) {
        var fd = fs.openSync('package.json', 'r');
        assert.equal (pygments.colorize('package.json', 'ruby', 'html'), fs.readSync(fd, fs.statSync('package.json')['size'], null)[0]);
        fs.closeSync(fd);
      },
      'filename force': function (pygments) {
        assert.equal (pygments.colorize('package.json', 'ruby', 'html', {'force': true}), 'package.json');
      },
      'text': function (pygments) {
        assert.equal (pygments.colorize('puts "Pygments"', 'ruby', 'html'), 'puts "Pygments"');
      }
    }
  }
}).export(module);
