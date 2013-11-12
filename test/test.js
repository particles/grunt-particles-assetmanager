'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.particles = {


  setUp: function(done) {
    // setup here if necessary
    done();
  },

  assemble: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/views/view2.jade');
    var expected = grunt.file.read(__dirname + '/expected/views/view2.jade');
    test.equal(actual, expected, 'should assemble views dirs');

    actual = grunt.file.read('tmp/assets/script.js');
    expected = grunt.file.read(__dirname + '/expected/assets/script.js');
    test.equal(actual, expected, 'should assemble assets dirs');

    test.done();
  },

  recess: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/assets/testless.css');
    var expected = grunt.file.read(__dirname + "/expected/assets/testless.css");
    test.equal(actual, expected, 'should compile less into css');

    test.done();
  },

  linker: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/views/view1.jade');
    var expected = grunt.file.read(__dirname + "/expected/views/view1.jade");
    test.equal(actual, expected, 'should inject scripts and styles into pages');

    test.done();
  }
};
