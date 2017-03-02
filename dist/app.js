(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Create a list of Conversation Segment pairs. [ {key, url, title, timeStart, timeEnd, [{interest, score}]}]
const Segment = require('./js/segment.js')
var myFirstSegment = new Segment();

},{"./js/segment.js":2}],2:[function(require,module,exports){
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

},{"extend":3}],3:[function(require,module,exports){
function extend(a, b) {
  a._super = b
  for(var key in b)
      if(b.hasOwnProperty(key))
          a[key] = b[key];
  return a;
}

module.exports = extend;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImpzL3NlZ21lbnQuanMiLCJub2RlX21vZHVsZXMvZXh0ZW5kL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIENyZWF0ZSBhIGxpc3Qgb2YgQ29udmVyc2F0aW9uIFNlZ21lbnQgcGFpcnMuIFsge2tleSwgdXJsLCB0aXRsZSwgdGltZVN0YXJ0LCB0aW1lRW5kLCBbe2ludGVyZXN0LCBzY29yZX1dfV1cbmNvbnN0IFNlZ21lbnQgPSByZXF1aXJlKCcuL2pzL3NlZ21lbnQuanMnKVxudmFyIG15Rmlyc3RTZWdtZW50ID0gbmV3IFNlZ21lbnQoKTtcbiIsImNvbnN0IGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xuXG52YXIgU2VnbWVudCA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdmFyIGRlZmF1bHRzID0ge1xuICAgIHRpdGxlOiBcIlVudGl0bGVkIFNlZ21lbnRcIixcbiAgICB1cmw6ICcnLFxuICAgIHRpbWVTdGFydDogMCxcbiAgICB0aW1lRW5kOiAwLFxuICAgIGludGVyZXN0czoge1xuICAgICAgaW50ZXJlc3QxOiAwLjEsXG4gICAgICBpbnRlcmVzdDI6IDAuMixcbiAgICB9XG4gIH1cblxuICBzZWxmID0gZXh0ZW5kKHNlbGYsIGRlZmF1bHRzKVxuICBzZWxmID0gZXh0ZW5kKHNlbGYsIG9wdGlvbnMpXG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2VnbWVudDtcbndpbmRvdy5TZWdtZW50ID0gU2VnbWVudDtcbiIsImZ1bmN0aW9uIGV4dGVuZChhLCBiKSB7XG4gIGEuX3N1cGVyID0gYlxuICBmb3IodmFyIGtleSBpbiBiKVxuICAgICAgaWYoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kO1xuIl19
