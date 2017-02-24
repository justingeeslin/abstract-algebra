(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const SensiblePieChart = require('./js/SensiblePieChart.js');

},{"./js/SensiblePieChart.js":2}],2:[function(require,module,exports){
function SensiblePieChart( options ) {
  var self = this;

  var defaults = {
    target: $(document.body),
    data: ['Vistors', 100],
    // data: {
    //   'root': [['Visitors', 100]],
    //   'Visitors': [['Mobile', 75],['Desktop', 24]],
    //   'Desktop': [['Windows', 75],['Mac', 24], ['Other', 1]]
    // },
  }

  var drillDownPath = ['root'];

  var currentLayer = 'root';

  $.extend(self, defaults, options)

  this.chart = c3.generate({
    bindto: self.target[0],
    data: {
      columns: [],
      type : 'pie',
      onclick: function (d, i) {
        if (typeof self.data === 'object' && self.data.hasOwnProperty(d.id)) {
          console.log('Attempting to drill down to: ' + d.id);
          self.drilldown(d.id)
        }
      },
      onmouseover: function (d, i) {  },
      onmouseout: function (d, i) {  }
    }
  });

  this.drilldown = function(label) {
    if (typeof self.data[label] === 'undefined') {
      console.log('No layer under this one.')
      return;
    }

    console.log('Drilling down to ' + label + ' layer.')
    console.log('Columns are now: ', self.data[label])

    drillDownPath.push(label)

    var dataToUnload = []
    for (var i in self.data[currentLayer]) {
      dataToUnload.push(self.data[currentLayer][i][0])
    }
    console.log('Unloading..', dataToUnload)

    this.chart.load({
      unload: dataToUnload,
      columns: this.data[label]
    });

    currentLayer = label;
  }

  this.up = function() {
    console.log('Going up.')
    self.drilldown(drillDownPath[drillDownPath.length-2]);
  }

  this.target.on('contextmenu', this.up);

  // Load the data if the data is an array
  if (Array.isArray(this.data)) {
    this.chart.load({
      columns: [
        this.data
      ]
    });
  }
  else if (typeof this.data === 'object') {
    this.drilldown('root');
  }

  return this;
}

window.SensiblePieChart = SensiblePieChart;
module.exports = SensiblePieChart;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImpzL1NlbnNpYmxlUGllQ2hhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IFNlbnNpYmxlUGllQ2hhcnQgPSByZXF1aXJlKCcuL2pzL1NlbnNpYmxlUGllQ2hhcnQuanMnKTtcbiIsImZ1bmN0aW9uIFNlbnNpYmxlUGllQ2hhcnQoIG9wdGlvbnMgKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgdGFyZ2V0OiAkKGRvY3VtZW50LmJvZHkpLFxuICAgIGRhdGE6IFsnVmlzdG9ycycsIDEwMF0sXG4gICAgLy8gZGF0YToge1xuICAgIC8vICAgJ3Jvb3QnOiBbWydWaXNpdG9ycycsIDEwMF1dLFxuICAgIC8vICAgJ1Zpc2l0b3JzJzogW1snTW9iaWxlJywgNzVdLFsnRGVza3RvcCcsIDI0XV0sXG4gICAgLy8gICAnRGVza3RvcCc6IFtbJ1dpbmRvd3MnLCA3NV0sWydNYWMnLCAyNF0sIFsnT3RoZXInLCAxXV1cbiAgICAvLyB9LFxuICB9XG5cbiAgdmFyIGRyaWxsRG93blBhdGggPSBbJ3Jvb3QnXTtcblxuICB2YXIgY3VycmVudExheWVyID0gJ3Jvb3QnO1xuXG4gICQuZXh0ZW5kKHNlbGYsIGRlZmF1bHRzLCBvcHRpb25zKVxuXG4gIHRoaXMuY2hhcnQgPSBjMy5nZW5lcmF0ZSh7XG4gICAgYmluZHRvOiBzZWxmLnRhcmdldFswXSxcbiAgICBkYXRhOiB7XG4gICAgICBjb2x1bW5zOiBbXSxcbiAgICAgIHR5cGUgOiAncGllJyxcbiAgICAgIG9uY2xpY2s6IGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhID09PSAnb2JqZWN0JyAmJiBzZWxmLmRhdGEuaGFzT3duUHJvcGVydHkoZC5pZCkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnQXR0ZW1wdGluZyB0byBkcmlsbCBkb3duIHRvOiAnICsgZC5pZCk7XG4gICAgICAgICAgc2VsZi5kcmlsbGRvd24oZC5pZClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9ubW91c2VvdmVyOiBmdW5jdGlvbiAoZCwgaSkgeyAgfSxcbiAgICAgIG9ubW91c2VvdXQ6IGZ1bmN0aW9uIChkLCBpKSB7ICB9XG4gICAgfVxuICB9KTtcblxuICB0aGlzLmRyaWxsZG93biA9IGZ1bmN0aW9uKGxhYmVsKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxmLmRhdGFbbGFiZWxdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5sb2coJ05vIGxheWVyIHVuZGVyIHRoaXMgb25lLicpXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ0RyaWxsaW5nIGRvd24gdG8gJyArIGxhYmVsICsgJyBsYXllci4nKVxuICAgIGNvbnNvbGUubG9nKCdDb2x1bW5zIGFyZSBub3c6ICcsIHNlbGYuZGF0YVtsYWJlbF0pXG5cbiAgICBkcmlsbERvd25QYXRoLnB1c2gobGFiZWwpXG5cbiAgICB2YXIgZGF0YVRvVW5sb2FkID0gW11cbiAgICBmb3IgKHZhciBpIGluIHNlbGYuZGF0YVtjdXJyZW50TGF5ZXJdKSB7XG4gICAgICBkYXRhVG9VbmxvYWQucHVzaChzZWxmLmRhdGFbY3VycmVudExheWVyXVtpXVswXSlcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ1VubG9hZGluZy4uJywgZGF0YVRvVW5sb2FkKVxuXG4gICAgdGhpcy5jaGFydC5sb2FkKHtcbiAgICAgIHVubG9hZDogZGF0YVRvVW5sb2FkLFxuICAgICAgY29sdW1uczogdGhpcy5kYXRhW2xhYmVsXVxuICAgIH0pO1xuXG4gICAgY3VycmVudExheWVyID0gbGFiZWw7XG4gIH1cblxuICB0aGlzLnVwID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ0dvaW5nIHVwLicpXG4gICAgc2VsZi5kcmlsbGRvd24oZHJpbGxEb3duUGF0aFtkcmlsbERvd25QYXRoLmxlbmd0aC0yXSk7XG4gIH1cblxuICB0aGlzLnRhcmdldC5vbignY29udGV4dG1lbnUnLCB0aGlzLnVwKTtcblxuICAvLyBMb2FkIHRoZSBkYXRhIGlmIHRoZSBkYXRhIGlzIGFuIGFycmF5XG4gIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZGF0YSkpIHtcbiAgICB0aGlzLmNoYXJ0LmxvYWQoe1xuICAgICAgY29sdW1uczogW1xuICAgICAgICB0aGlzLmRhdGFcbiAgICAgIF1cbiAgICB9KTtcbiAgfVxuICBlbHNlIGlmICh0eXBlb2YgdGhpcy5kYXRhID09PSAnb2JqZWN0Jykge1xuICAgIHRoaXMuZHJpbGxkb3duKCdyb290Jyk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxud2luZG93LlNlbnNpYmxlUGllQ2hhcnQgPSBTZW5zaWJsZVBpZUNoYXJ0O1xubW9kdWxlLmV4cG9ydHMgPSBTZW5zaWJsZVBpZUNoYXJ0O1xuIl19
