(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Create a list of Conversation Segment pairs. [ {key, url, title, timeStart, timeEnd, [{interest, score}]}]
const Segment = require('./js/Segment.js')
var myFirstSegment = new Segment();

},{"./js/Segment.js":2}],2:[function(require,module,exports){
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
      interest2: 0.2
    }
  }

  self = extend(self, defaults)
  self = extend(self, options)

  return this;
}

module.exports = Segment;
window.Segment = Segment;

},{"extend":3}],3:[function(require,module,exports){
function extend(a, b) {
  a._super = b
  for(var key in b) {
    if(b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
    // Does the property have a custom getter or setter?
    if (typeof b.__lookupGetter__(key) == "function") {
      // console.log('found a getter for ' + key);
      a.__defineGetter__(key, b.__lookupGetter__(key))
    }
    if (typeof b.__lookupSetter__(key) == "function") {
      // console.log('found a setter for ' + key);
      a.__defineSetter__(key, b.__lookupSetter__(key))
    }

  }

  return a;
}

module.exports = extend;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImpzL1NlZ21lbnQuanMiLCJub2RlX21vZHVsZXMvZXh0ZW5kL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gQ3JlYXRlIGEgbGlzdCBvZiBDb252ZXJzYXRpb24gU2VnbWVudCBwYWlycy4gWyB7a2V5LCB1cmwsIHRpdGxlLCB0aW1lU3RhcnQsIHRpbWVFbmQsIFt7aW50ZXJlc3QsIHNjb3JlfV19XVxuY29uc3QgU2VnbWVudCA9IHJlcXVpcmUoJy4vanMvU2VnbWVudC5qcycpXG52YXIgbXlGaXJzdFNlZ21lbnQgPSBuZXcgU2VnbWVudCgpO1xuIiwiY29uc3QgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XG5cbnZhciBTZWdtZW50ID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgdGl0bGU6IFwiVW50aXRsZWQgU2VnbWVudFwiLFxuICAgIHVybDogJycsXG4gICAgdGltZVN0YXJ0OiAwLFxuICAgIHRpbWVFbmQ6IDAsXG4gICAgaW50ZXJlc3RzOiB7XG4gICAgICBpbnRlcmVzdDE6IDAuMSxcbiAgICAgIGludGVyZXN0MjogMC4yXG4gICAgfVxuICB9XG5cbiAgc2VsZiA9IGV4dGVuZChzZWxmLCBkZWZhdWx0cylcbiAgc2VsZiA9IGV4dGVuZChzZWxmLCBvcHRpb25zKVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlZ21lbnQ7XG53aW5kb3cuU2VnbWVudCA9IFNlZ21lbnQ7XG4iLCJmdW5jdGlvbiBleHRlbmQoYSwgYikge1xuICBhLl9zdXBlciA9IGJcbiAgZm9yKHZhciBrZXkgaW4gYikge1xuICAgIGlmKGIuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgICAvLyBEb2VzIHRoZSBwcm9wZXJ0eSBoYXZlIGEgY3VzdG9tIGdldHRlciBvciBzZXR0ZXI/XG4gICAgaWYgKHR5cGVvZiBiLl9fbG9va3VwR2V0dGVyX18oa2V5KSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdmb3VuZCBhIGdldHRlciBmb3IgJyArIGtleSk7XG4gICAgICBhLl9fZGVmaW5lR2V0dGVyX18oa2V5LCBiLl9fbG9va3VwR2V0dGVyX18oa2V5KSlcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBiLl9fbG9va3VwU2V0dGVyX18oa2V5KSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdmb3VuZCBhIHNldHRlciBmb3IgJyArIGtleSk7XG4gICAgICBhLl9fZGVmaW5lU2V0dGVyX18oa2V5LCBiLl9fbG9va3VwU2V0dGVyX18oa2V5KSlcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZDtcbiJdfQ==
