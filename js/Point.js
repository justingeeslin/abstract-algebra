var extend = require('extend')

var Point = function(options) {
  var self = this;

  var defaults = {
    x: 0,
    y: 0,
    // An array of functions
    forces: []
  }

  self = extend(this, defaults);
  self = extend(this, options);

  var canvas = this.target[0];
  var context = canvas.getContext('2d');
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;

  var draw = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    console.log('I keep on fallin\' in and out of love witha you. ' + self.y)
    context.beginPath();
    context.arc(self.x, self.y, 20, 0, 2 * Math.PI, false);
    context.fillStyle = 'tan';
    context.fill();
    context.lineWidth = 0;
    context.strokeStyle = '#fff';
    context.stroke();
  }

  var forceGravity = function() {
    self.y += 3;
  }
  self.forces.push(forceGravity)

  var t = 0;
  var live = function() {
    t+=10;
    // Enact the forces on this shape.
    // console.log('Im alive: t = ' + t);

    // Coordiantes of the previous frame
    self.prevX = self.x
    self.prevY = self.y

    // Transforms via forces
    for(var i=0;i<self.forces.length;i++) {
      self.forces[i]();
    }

    //calculate velocity

    // Draw the dot.
    draw()


    setTimeout(live, 10)
  }
  live();


}

module.exports = Point;
