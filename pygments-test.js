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
    'stringize': {
      'dirname': function (pygments) {
        assert.equal (pygments.stringize('..'), '..');
      },
      'filename': function (pygments) {
        var fd = fs.openSync('package.json', 'r');
        assert.equal (pygments.stringize('package.json'), fs.readSync(fd, fs.statSync('package.json')['size'], null)[0]);
        fs.closeSync(fd);
      },
      'filename force': function (pygments) {
        assert.equal (pygments.stringize('package.json', true), 'package.json');
      },
    },
    'options': {
      'merge': function(pygments) {
        assert.deepEqual (pygments.merge_options({'f': 'bbcode'}), {'force': false, 'l': 'ruby', 'f': 'bbcode', 'O': 'encoding=utf-8'});
      },
      'convert': function (pygments) {
        assert.deepEqual (pygments.convert_options({'l': 'ruby', 'f': 'html'}), ['-lruby', '-fhtml'])
      }
    },
    'validations': {
      'flag': function (pygments) {
        assert.throws (function() { pygments.convert_options({'l3xer': 'ruby'})}, Error);
      },
      'value': function (pygments) {
        assert.throws (function() { pygments.convert_options({'l': 'r@j'})}, Error);
      }
    }
  }
}).export(module);
