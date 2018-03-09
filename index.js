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

Number.prototype.isNatural = function(obj) {
  var num = this.valueOf()
  obj = typeof obj !== "undefined" ? obj : {};
  if (Number.isInteger(num)) {
    if (num > 0) {
      obj.message = num + ' is Natural because it is an Integer and greater than zero.'
      return true;
    }
    else {
      obj.message = num + ' is not Natural because while it is an Integer, it is not greater than zero.'
    }

  }
  else {
    obj.message = num + ' is not an Integer. To be natural, must be both an Integer and greater than zero.'
    return false;
  }

  return ;

}

Number.prototype.isWhole = function() {
  var num = this.valueOf()
  return Number.isInteger(num) && num > -1;
}

// Maybe this is a bad idea?
Number.prototype.isInteger = function(obj) {
  var num = this.valueOf()
  if (Number.isInteger(num)) {
    obj.message = num + " is an Integer because it can be written without a fractional component (<a href=\"https://en.wikipedia.org/wiki/Integer\">source</a>)."
    return true;
  }
  else {
    obj.message = num + " is not an Integer."
    return false;
  }


};

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
      obj.message = this + " is Rational because it can be written as a fraction of integers. " + frac.numerator + '/' + frac.denominator;
      return true;
    }
  }
  else {
    obj.message = this + " is Irrational because it cannot be written as a fraction of integers. " + frac.numerator + '/' + frac.denominator + " is close but this only equals " + frac.numerator / frac.denominator;
  }

  return false;
}

Number.prototype.isAlgebraic = function() {
  // A number is algebraic if it is rational.
  if (this.isRational()) {
    return true;
  }
  // but an irrational number may or may not be algebraic
  var num = this.valueOf();
  console.log('THis is the number', num)

  // Search for a polynomial x^n + a_n. Let a be no higher or lower than the number.
  for(var n = 1;n<=4;n++) {
    // Start with the negative version of the number and go up to the number
    for( var a = Math.ceil(Math.abs(num)) * -1; a<= num; a++) {
      var p = 'Math.pow(x, ' + n + ') + ' + a;
      var x = num;
      // A algebraic number is  a value which causes the polynomial to equal 0.
      console.log('Let x = ' + num + ' for ', p);
      var ans = eval(p);
      // Bound answer to 4 decimal points. When doing lots of rooting sometimes very small fractions are left over again because of rounding and the lack of precision
      ans = ans.toFixed(4)
      if (ans==0) {
        return true;
      }
      else {
        console.log('It does not yield zero. Yielded: ' + ans + '. ' + num + ' is not a root for this polynomial. Maybe I\'ll try another..')
      }
    }

  }

  return x.isRational();

}

Number.prototype.isTranscendental = function(obj) {
  // A real number that is not Algebraic. Is it this simple?
  return !this.isAlgebraic();
}

}
