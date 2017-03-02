const extend = require('extend');

var Segment = function( options ) {
  var self = this;

  var defaults = {
    title: "Untitled Segment",
    url: '',
    timeStart: 0,
    timeEnd: 0,
    interests: {
      interest1: 0.1,
      interest2: 0.2,
    }
  }

  self = extend(self, defaults)
  self = extend(self, options)

  return this;
}

module.exports = Segment;
window.Segment = Segment;
