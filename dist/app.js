(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Create a list of Conversation Segment pairs. [ {key, url, title, timeStart, timeEnd, [{interest, score}]}]
const Segment = require('./segment.js')
var myFirstSegment = new Segment();

},{"./segment.js":3}],2:[function(require,module,exports){
function extend(a, b) {
  a._super = b
  for(var key in b)
      if(b.hasOwnProperty(key))
          a[key] = b[key];
  return a;
}

module.exports = extend;

},{}],3:[function(require,module,exports){
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

},{"extend":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9leHRlbmQvaW5kZXguanMiLCJzZWdtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gQ3JlYXRlIGEgbGlzdCBvZiBDb252ZXJzYXRpb24gU2VnbWVudCBwYWlycy4gWyB7a2V5LCB1cmwsIHRpdGxlLCB0aW1lU3RhcnQsIHRpbWVFbmQsIFt7aW50ZXJlc3QsIHNjb3JlfV19XVxuY29uc3QgU2VnbWVudCA9IHJlcXVpcmUoJy4vc2VnbWVudC5qcycpXG52YXIgbXlGaXJzdFNlZ21lbnQgPSBuZXcgU2VnbWVudCgpO1xuIiwiZnVuY3Rpb24gZXh0ZW5kKGEsIGIpIHtcbiAgYS5fc3VwZXIgPSBiXG4gIGZvcih2YXIga2V5IGluIGIpXG4gICAgICBpZihiLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgICAgYVtrZXldID0gYltrZXldO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQ7XG4iLCJjb25zdCBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcblxudmFyIFNlZ21lbnQgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHZhciBkZWZhdWx0cyA9IHtcbiAgICB0aXRsZTogXCJVbnRpdGxlZCBTZWdtZW50XCIsXG4gICAgdXJsOiAnJyxcbiAgICB0aW1lU3RhcnQ6IDAsXG4gICAgdGltZUVuZDogMCxcbiAgICBpbnRlcmVzdHM6IHtcbiAgICAgIGludGVyZXN0MTogMC4xLFxuICAgICAgaW50ZXJlc3QyOiAwLjIsXG4gICAgfVxuICB9XG5cbiAgc2VsZiA9IGV4dGVuZChzZWxmLCBkZWZhdWx0cylcbiAgc2VsZiA9IGV4dGVuZChzZWxmLCBvcHRpb25zKVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlZ21lbnQ7XG53aW5kb3cuU2VnbWVudCA9IFNlZ21lbnQ7XG4iXX0=
