Array.prototype.isClosed = function(operation) {
  for(var i=0;i< this.length;i++) {
    for(var j=i;j< this.length;j++) {
      var isInSet = this.includes(operation(this[i],this[j]));
      if (!isInSet) {
        return false;
      }
    }
  }
  return true;
}

Array.prototype.hasIdentity = function(operation) {
  for(var i=0;i< this.length;i++) {
    for(var j=i;j< this.length;j++) {
      var identityIsInSet = this[i] == operation(this[i],this[j]);
      if (identityIsInSet) {
        return true;
      }
    }
  }
  return false;
}

Array.prototype.isAssociative = function(operation) {
  for(var i=0;i< this.length;i++) {
    for(var j=i;j< this.length;j++) {
      for(var k=i;k< this.length;k++) {
        var is = operation(operation(this[i],this[j]), this[k]) == operation(this[i], operation(this[j],this[k]));
        if (!is) {
          return false;
        }
      }
    }
  }
  return true;
}

Array.prototype.hasInverse = function(operation) {
  // Find an inverse for ever element
  var inverses = []
  for(var i=0;i< this.length;i++) {
    for(var j=0;j< this.length;j++) {
        var is = 0 == operation(this[i], this[j])
        // console.log(this[i] + " + " + this[j])
        if (is) {
          // console.log(this[j] + ' is the inverse of ' + this[i])
          inverses.push(this[j]);
          // You've found the inverse for i; on to the next element
          break;
        }
    }
  }

  // If you have an inverse for every element, the inverse property is satisfied
  if (inverses.length == this.length) {
    return true;
  }
  else {
    return false;
  }
}

Array.prototype.isCommutative = function(operation) {
  for(var i=0;i< this.length;i++) {
    for(var j=i;j< this.length;j++) {
        var is = operation(this[i], this[j]) == operation(this[j], this[i])
        if (!is) {
          return false;
        }

    }
  }
  return true;
}

Array.prototype.isGroup = function(operation) {
  return this.isClosed(operation) && this.hasIdentity(operation) && this.isAssociative(operation) && this.hasInverse(operation);
}

Array.prototype.isAbelianGroup = function(operation) {
  return this.isGroup(operation) && this.isCommutative(operation);
}

Array.prototype.isDistributive = function(operation, operation2) {
  for(var i=0;i< this.length;i++) {
    for(var j=i;j< this.length;j++) {
      for(var k=i;k< this.length;k++) {
        var is = operation2(this[i], operation(this[j],this[k])) == operation(operation2(this[i], this[j]), operation2(this[i], this[k]));
        var is2 = operation2(operation(this[i],this[j]), this[k]) == operation(operation2(this[i], this[k]), operation2(this[j], this[k]))
        if (!(is && is2)) {
          return false;
        }
      }
    }
  }
  return true;
}

Array.prototype.isRing = function(operation, operation2) {
  return (this.isClosed(operation) && this.hasIdentity(operation) && this.isAssociative(operation) && this.hasInverse(operation)) &&
    (this.isClosed(operation2) && this.isAssociative(operation2))
}

Array.prototype.isCommutativeRing = function(operation, operation2) {
  return (this.isClosed(operation) && this.hasIdentity(operation) && this.isAssociative(operation) && this.hasInverse(operation)) &&
    (this.isClosed(operation2) && this.isAssociative(operation2) && this.isCommutative(operation2))
}

Array.prototype.isField = function(operation, operation2) {
  return this.isAbelianGroup(operation) && this.isAbelianGroup(operation2)
}

Number.prototype.isNatural = function() {
  var num = this.valueOf()
  return Number.isInteger(num) && num > 0;
}

Number.prototype.isWhole = function() {
  var num = this.valueOf()
  return Number.isInteger(num) && num > -1;
}

Number.prototype.isRational = function(obj) {
  obj = typeof obj !== "undefined" ? obj : {message: ''};
  var Fraction = require('fractional').Fraction
  var num = this.valueOf();
  if (this.isWhole()) {
    obj.message = this + " is Rational because it is Whole";
    return true;
  }

  // To be rational it must have a fraction of integers
  var frac = new Fraction(num);
  if (frac.numerator / frac.denominator === num) {
    if (Number.isInteger(frac.numerator) && Number.isInteger(frac.denominator)) {
      console.log(num + ' can be written as ', frac);
      return true;
    }
  }
  else {
    console.log(num + ' can almost be written as ', frac);
    console.log('but this only equals ', frac.numerator / frac.denominator);
  }

  return false;
}

Number.prototype.isAlgebraic = function() {
  // A number is algebraic if it is an integer or is rational.
  if (this.isRational()) {
    return true;
  }


}
