/*
 * pygments.js: A node.js wrapper for pygments
 *
 * (C) 2011, Pavan Kumar Sunkara
 *
 */

var spawn = require('child_process').spawn,
    exists = require('path').existsSync,
    fs = require('fs');

var pygments = exports;

//
// ### function colorize
// #### @target {String} Target to be highlighted
// #### @lexer {String} Lexer to use for highlighting
// #### @format {String} Format for the output
// #### @opts {Array} Other options
//
pygments.colorize = function(target, lexer, format, options) {
  options = merge_options(options);
  return write(target, (options['force']));
}

var merge_options = function(options) {
  var default_options = {
    'force': false
  }
  for(var option in options)
    default_options[option] = options[option];
  return default_options;
}

var write = function(target, force) {
  force = (force===undefined ? false : force);
  if(exists(target) && !force) {
    var target_stats = fs.statSync(target);
    if(target_stats.isFile()) {
      var target_fd = fs.openSync(target, 'r');
      target = fs.readSync(target_fd, target_stats['size'], null)[0];
      fs.closeSync(target_fd);
    }
  }
  return target;
}
