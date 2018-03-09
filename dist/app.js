(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

Number.prototype.isReal = function(obj) {
  console.log("I'm loving you like candy - Mandy Moore");

}

},{"fractional":2}],2:[function(require,module,exports){
/*
fraction.js
A Javascript fraction library.

Copyright (c) 2009  Erik Garrison <erik@hypervolu.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/


/* Fractions */
/* 
 *
 * Fraction objects are comprised of a numerator and a denomenator.  These
 * values can be accessed at fraction.numerator and fraction.denomenator.
 *
 * Fractions are always returned and stored in lowest-form normalized format.
 * This is accomplished via Fraction.normalize.
 *
 * The following mathematical operations on fractions are supported:
 *
 * Fraction.equals
 * Fraction.add
 * Fraction.subtract
 * Fraction.multiply
 * Fraction.divide
 *
 * These operations accept both numbers and fraction objects.  (Best results
 * are guaranteed when the input is a fraction object.)  They all return a new
 * Fraction object.
 *
 * Usage:
 *
 * TODO
 *
 */

/*
 * The Fraction constructor takes one of:
 *   an explicit numerator (integer) and denominator (integer),
 *   a string representation of the fraction (string),
 *   or a floating-point number (float)
 *
 * These initialization methods are provided for convenience.  Because of
 * rounding issues the best results will be given when the fraction is
 * constructed from an explicit integer numerator and denomenator, and not a
 * decimal number.
 *
 *
 * e.g. new Fraction(1, 2) --> 1/2
 *      new Fraction('1/2') --> 1/2
 *      new Fraction('2 3/4') --> 11/4  (prints as 2 3/4)
 *
 */
Fraction = function(numerator, denominator)
{
    /* double argument invocation */
    if (typeof numerator !== 'undefined' && denominator) {
        if (typeof(numerator) === 'number' && typeof(denominator) === 'number') {
            this.numerator = numerator;
            this.denominator = denominator;
        } else if (typeof(numerator) === 'string' && typeof(denominator) === 'string') {
            // what are they?
            // hmm....
            // assume they are ints?
            this.numerator = parseInt(numerator);
            this.denominator = parseInt(denominator);
        }
    /* single-argument invocation */
    } else if (typeof denominator === 'undefined') {
        num = numerator; // swap variable names for legibility
        if (typeof(num) === 'number') {  // just a straight number init
            this.numerator = num;
            this.denominator = 1;
        } else if (typeof(num) === 'string') {
            var a, b;  // hold the first and second part of the fraction, e.g. a = '1' and b = '2/3' in 1 2/3
                       // or a = '2/3' and b = undefined if we are just passed a single-part number
            var arr = num.split(' ')
            if (arr[0]) a = arr[0]
            if (arr[1]) b = arr[1]
            /* compound fraction e.g. 'A B/C' */
            //  if a is an integer ...
            if (a % 1 === 0 && b && b.match('/')) {
                return (new Fraction(a)).add(new Fraction(b));
            } else if (a && !b) {
                /* simple fraction e.g. 'A/B' */
                if (typeof(a) === 'string' && a.match('/')) {
                    // it's not a whole number... it's actually a fraction without a whole part written
                    var f = a.split('/');
                    this.numerator = f[0]; this.denominator = f[1];
                /* string floating point */
                } else if (typeof(a) === 'string' && a.match('\.')) {
                    return new Fraction(parseFloat(a));
                /* whole number e.g. 'A' */
                } else { // just passed a whole number as a string
                    this.numerator = parseInt(a);
                    this.denominator = 1;
                }
            } else {
                return undefined; // could not parse
            }
        }
    }
    this.normalize();
}


Fraction.prototype.clone = function()
{
    return new Fraction(this.numerator, this.denominator);
}


/* pretty-printer, converts fractions into whole numbers and fractions */
Fraction.prototype.toString = function()
{
    if (this.denominator==='NaN') return 'NaN'
    var wholepart = (this.numerator/this.denominator>0) ?
      Math.floor(this.numerator / this.denominator) :
      Math.ceil(this.numerator / this.denominator)
    var numerator = this.numerator % this.denominator 
    var denominator = this.denominator;
    var result = []; 
    if (wholepart != 0)  
        result.push(wholepart);
    if (numerator != 0)  
        result.push(((wholepart===0) ? numerator : Math.abs(numerator)) + '/' + denominator);
    return result.length > 0 ? result.join(' ') : 0;
}


/* destructively rescale the fraction by some integral factor */
Fraction.prototype.rescale = function(factor)
{
    this.numerator *= factor;
    this.denominator *= factor;
    return this;
}


Fraction.prototype.add = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction) {
        b = b.clone();
    } else {
        b = new Fraction(b);
    }
    td = a.denominator;
    a.rescale(b.denominator);
    b.rescale(td);

    a.numerator += b.numerator;

    return a.normalize();
}


Fraction.prototype.subtract = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction) {
        b = b.clone();  // we scale our argument destructively, so clone
    } else {
        b = new Fraction(b);
    }
    td = a.denominator;
    a.rescale(b.denominator);
    b.rescale(td);

    a.numerator -= b.numerator;

    return a.normalize();
}


Fraction.prototype.multiply = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction)
    {
        a.numerator *= b.numerator;
        a.denominator *= b.denominator;
    } else if (typeof b === 'number') {
        a.numerator *= b;
    } else {
        return a.multiply(new Fraction(b));
    }
    return a.normalize();
}

Fraction.prototype.divide = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction)
    {
        a.numerator *= b.denominator;
        a.denominator *= b.numerator;
    } else if (typeof b === 'number') {
        a.denominator *= b;
    } else {
        return a.divide(new Fraction(b));
    }
    return a.normalize();
}

Fraction.prototype.equals = function(b)
{
    if (!(b instanceof Fraction)) {
        b = new Fraction(b);
    }
    // fractions that are equal should have equal normalized forms
    var a = this.clone().normalize();
    var b = b.clone().normalize();
    return (a.numerator === b.numerator && a.denominator === b.denominator);
}


/* Utility functions */

/* Destructively normalize the fraction to its smallest representation. 
 * e.g. 4/16 -> 1/4, 14/28 -> 1/2, etc.
 * This is called after all math ops.
 */
Fraction.prototype.normalize = (function()
{

    var isFloat = function(n)
    {
        return (typeof(n) === 'number' && 
                ((n > 0 && n % 1 > 0 && n % 1 < 1) || 
                 (n < 0 && n % -1 < 0 && n % -1 > -1))
               );
    }

    var roundToPlaces = function(n, places) 
    {
        if (!places) {
            return Math.round(n);
        } else {
            var scalar = Math.pow(10, places);
            return Math.round(n*scalar)/scalar;
        }
    }
        
    return (function() {

        // XXX hackish.  Is there a better way to address this issue?
        //
        /* first check if we have decimals, and if we do eliminate them
         * multiply by the 10 ^ number of decimal places in the number
         * round the number to nine decimal places
         * to avoid js floating point funnies
         */
        if (isFloat(this.denominator)) {
            var rounded = roundToPlaces(this.denominator, 9);
            var scaleup = Math.pow(10, rounded.toString().split('.')[1].length);
            this.denominator = Math.round(this.denominator * scaleup); // this !!! should be a whole number
            //this.numerator *= scaleup;
            this.numerator *= scaleup;
        } 
        if (isFloat(this.numerator)) {
            var rounded = roundToPlaces(this.numerator, 9);
            var scaleup = Math.pow(10, rounded.toString().split('.')[1].length);
            this.numerator = Math.round(this.numerator * scaleup); // this !!! should be a whole number
            //this.numerator *= scaleup;
            this.denominator *= scaleup;
        }
        var gcf = Fraction.gcf(this.numerator, this.denominator);
        this.numerator /= gcf;
        this.denominator /= gcf;
        if ((this.numerator < 0 && this.denominator < 0) || (this.numerator > 0 && this.denominator < 0)) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
        return this;
    });

})();


/* Takes two numbers and returns their greatest common factor.
 */
Fraction.gcf = function(a, b)
{

    var common_factors = [];
    var fa = Fraction.primeFactors(a);
    var fb = Fraction.primeFactors(b);
    // for each factor in fa
    // if it's also in fb
    // put it into the common factors
    fa.forEach(function (factor) 
    { 
        var i = fb.indexOf(factor);
        if (i >= 0) {
            common_factors.push(factor);
            fb.splice(i,1); // remove from fb
        }
    });

    if (common_factors.length === 0)
        return 1;

    var gcf = (function() {
        var r = common_factors[0];
        var i;
        for (i=1;i<common_factors.length;i++)
        {
            r = r * common_factors[i];
        }
        return r;
    })();

    return gcf;

};


// Adapted from: 
// http://www.btinternet.com/~se16/js/factor.htm
Fraction.primeFactors = function(n) 
{

    var num = Math.abs(n);
    var factors = [];
    var _factor = 2;  // first potential prime factor

    while (_factor * _factor <= num)  // should we keep looking for factors?
    {      
      if (num % _factor === 0)  // this is a factor
        { 
            factors.push(_factor);  // so keep it
            num = num/_factor;  // and divide our search point by it
        }
        else
        {
            _factor++;  // and increment
        }
    }

    if (num != 1)                    // If there is anything left at the end...
    {                                // ...this must be the last prime factor
        factors.push(num);           //    so it too should be recorded
    }

    return factors;                  // Return the prime factors
}

module.exports.Fraction = Fraction

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mcmFjdGlvbmFsL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiQXJyYXkucHJvdG90eXBlLmlzQ2xvc2VkID0gZnVuY3Rpb24ob3BlcmF0aW9uKSB7XG4gIGZvcih2YXIgaT0wO2k8IHRoaXMubGVuZ3RoO2krKykge1xuICAgIGZvcih2YXIgaj1pO2o8IHRoaXMubGVuZ3RoO2orKykge1xuICAgICAgdmFyIGlzSW5TZXQgPSB0aGlzLmluY2x1ZGVzKG9wZXJhdGlvbih0aGlzW2ldLHRoaXNbal0pKTtcbiAgICAgIGlmICghaXNJblNldCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5BcnJheS5wcm90b3R5cGUuaGFzSWRlbnRpdHkgPSBmdW5jdGlvbihvcGVyYXRpb24pIHtcbiAgZm9yKHZhciBpPTA7aTwgdGhpcy5sZW5ndGg7aSsrKSB7XG4gICAgZm9yKHZhciBqPWk7ajwgdGhpcy5sZW5ndGg7aisrKSB7XG4gICAgICB2YXIgaWRlbnRpdHlJc0luU2V0ID0gdGhpc1tpXSA9PSBvcGVyYXRpb24odGhpc1tpXSx0aGlzW2pdKTtcbiAgICAgIGlmIChpZGVudGl0eUlzSW5TZXQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuQXJyYXkucHJvdG90eXBlLmlzQXNzb2NpYXRpdmUgPSBmdW5jdGlvbihvcGVyYXRpb24pIHtcbiAgZm9yKHZhciBpPTA7aTwgdGhpcy5sZW5ndGg7aSsrKSB7XG4gICAgZm9yKHZhciBqPWk7ajwgdGhpcy5sZW5ndGg7aisrKSB7XG4gICAgICBmb3IodmFyIGs9aTtrPCB0aGlzLmxlbmd0aDtrKyspIHtcbiAgICAgICAgdmFyIGlzID0gb3BlcmF0aW9uKG9wZXJhdGlvbih0aGlzW2ldLHRoaXNbal0pLCB0aGlzW2tdKSA9PSBvcGVyYXRpb24odGhpc1tpXSwgb3BlcmF0aW9uKHRoaXNbal0sdGhpc1trXSkpO1xuICAgICAgICBpZiAoIWlzKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5BcnJheS5wcm90b3R5cGUuaGFzSW52ZXJzZSA9IGZ1bmN0aW9uKG9wZXJhdGlvbikge1xuICAvLyBGaW5kIGFuIGludmVyc2UgZm9yIGV2ZXIgZWxlbWVudFxuICB2YXIgaW52ZXJzZXMgPSBbXVxuICBmb3IodmFyIGk9MDtpPCB0aGlzLmxlbmd0aDtpKyspIHtcbiAgICBmb3IodmFyIGo9MDtqPCB0aGlzLmxlbmd0aDtqKyspIHtcbiAgICAgICAgdmFyIGlzID0gMCA9PSBvcGVyYXRpb24odGhpc1tpXSwgdGhpc1tqXSlcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpc1tpXSArIFwiICsgXCIgKyB0aGlzW2pdKVxuICAgICAgICBpZiAoaXMpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzW2pdICsgJyBpcyB0aGUgaW52ZXJzZSBvZiAnICsgdGhpc1tpXSlcbiAgICAgICAgICBpbnZlcnNlcy5wdXNoKHRoaXNbal0pO1xuICAgICAgICAgIC8vIFlvdSd2ZSBmb3VuZCB0aGUgaW52ZXJzZSBmb3IgaTsgb24gdG8gdGhlIG5leHQgZWxlbWVudFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgeW91IGhhdmUgYW4gaW52ZXJzZSBmb3IgZXZlcnkgZWxlbWVudCwgdGhlIGludmVyc2UgcHJvcGVydHkgaXMgc2F0aXNmaWVkXG4gIGlmIChpbnZlcnNlcy5sZW5ndGggPT0gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuQXJyYXkucHJvdG90eXBlLmlzQ29tbXV0YXRpdmUgPSBmdW5jdGlvbihvcGVyYXRpb24pIHtcbiAgZm9yKHZhciBpPTA7aTwgdGhpcy5sZW5ndGg7aSsrKSB7XG4gICAgZm9yKHZhciBqPWk7ajwgdGhpcy5sZW5ndGg7aisrKSB7XG4gICAgICAgIHZhciBpcyA9IG9wZXJhdGlvbih0aGlzW2ldLCB0aGlzW2pdKSA9PSBvcGVyYXRpb24odGhpc1tqXSwgdGhpc1tpXSlcbiAgICAgICAgaWYgKCFpcykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5BcnJheS5wcm90b3R5cGUuaXNHcm91cCA9IGZ1bmN0aW9uKG9wZXJhdGlvbikge1xuICByZXR1cm4gdGhpcy5pc0Nsb3NlZChvcGVyYXRpb24pICYmIHRoaXMuaGFzSWRlbnRpdHkob3BlcmF0aW9uKSAmJiB0aGlzLmlzQXNzb2NpYXRpdmUob3BlcmF0aW9uKSAmJiB0aGlzLmhhc0ludmVyc2Uob3BlcmF0aW9uKTtcbn1cblxuQXJyYXkucHJvdG90eXBlLmlzQWJlbGlhbkdyb3VwID0gZnVuY3Rpb24ob3BlcmF0aW9uKSB7XG4gIHJldHVybiB0aGlzLmlzR3JvdXAob3BlcmF0aW9uKSAmJiB0aGlzLmlzQ29tbXV0YXRpdmUob3BlcmF0aW9uKTtcbn1cblxuQXJyYXkucHJvdG90eXBlLmlzRGlzdHJpYnV0aXZlID0gZnVuY3Rpb24ob3BlcmF0aW9uLCBvcGVyYXRpb24yKSB7XG4gIGZvcih2YXIgaT0wO2k8IHRoaXMubGVuZ3RoO2krKykge1xuICAgIGZvcih2YXIgaj1pO2o8IHRoaXMubGVuZ3RoO2orKykge1xuICAgICAgZm9yKHZhciBrPWk7azwgdGhpcy5sZW5ndGg7aysrKSB7XG4gICAgICAgIHZhciBpcyA9IG9wZXJhdGlvbjIodGhpc1tpXSwgb3BlcmF0aW9uKHRoaXNbal0sdGhpc1trXSkpID09IG9wZXJhdGlvbihvcGVyYXRpb24yKHRoaXNbaV0sIHRoaXNbal0pLCBvcGVyYXRpb24yKHRoaXNbaV0sIHRoaXNba10pKTtcbiAgICAgICAgdmFyIGlzMiA9IG9wZXJhdGlvbjIob3BlcmF0aW9uKHRoaXNbaV0sdGhpc1tqXSksIHRoaXNba10pID09IG9wZXJhdGlvbihvcGVyYXRpb24yKHRoaXNbaV0sIHRoaXNba10pLCBvcGVyYXRpb24yKHRoaXNbal0sIHRoaXNba10pKVxuICAgICAgICBpZiAoIShpcyAmJiBpczIpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5BcnJheS5wcm90b3R5cGUuaXNSaW5nID0gZnVuY3Rpb24ob3BlcmF0aW9uLCBvcGVyYXRpb24yKSB7XG4gIHJldHVybiAodGhpcy5pc0Nsb3NlZChvcGVyYXRpb24pICYmIHRoaXMuaGFzSWRlbnRpdHkob3BlcmF0aW9uKSAmJiB0aGlzLmlzQXNzb2NpYXRpdmUob3BlcmF0aW9uKSAmJiB0aGlzLmhhc0ludmVyc2Uob3BlcmF0aW9uKSkgJiZcbiAgICAodGhpcy5pc0Nsb3NlZChvcGVyYXRpb24yKSAmJiB0aGlzLmlzQXNzb2NpYXRpdmUob3BlcmF0aW9uMikpXG59XG5cbkFycmF5LnByb3RvdHlwZS5pc0NvbW11dGF0aXZlUmluZyA9IGZ1bmN0aW9uKG9wZXJhdGlvbiwgb3BlcmF0aW9uMikge1xuICByZXR1cm4gKHRoaXMuaXNDbG9zZWQob3BlcmF0aW9uKSAmJiB0aGlzLmhhc0lkZW50aXR5KG9wZXJhdGlvbikgJiYgdGhpcy5pc0Fzc29jaWF0aXZlKG9wZXJhdGlvbikgJiYgdGhpcy5oYXNJbnZlcnNlKG9wZXJhdGlvbikpICYmXG4gICAgKHRoaXMuaXNDbG9zZWQob3BlcmF0aW9uMikgJiYgdGhpcy5pc0Fzc29jaWF0aXZlKG9wZXJhdGlvbjIpICYmIHRoaXMuaXNDb21tdXRhdGl2ZShvcGVyYXRpb24yKSlcbn1cblxuQXJyYXkucHJvdG90eXBlLmlzRmllbGQgPSBmdW5jdGlvbihvcGVyYXRpb24sIG9wZXJhdGlvbjIpIHtcbiAgcmV0dXJuIHRoaXMuaXNBYmVsaWFuR3JvdXAob3BlcmF0aW9uKSAmJiB0aGlzLmlzQWJlbGlhbkdyb3VwKG9wZXJhdGlvbjIpXG59XG5cbk51bWJlci5wcm90b3R5cGUuaXNOYXR1cmFsID0gZnVuY3Rpb24ob2JqKSB7XG4gIHZhciBudW0gPSB0aGlzLnZhbHVlT2YoKVxuICBvYmogPSB0eXBlb2Ygb2JqICE9PSBcInVuZGVmaW5lZFwiID8gb2JqIDoge307XG4gIGlmIChOdW1iZXIuaXNJbnRlZ2VyKG51bSkpIHtcbiAgICBpZiAobnVtID4gMCkge1xuICAgICAgb2JqLm1lc3NhZ2UgPSBudW0gKyAnIGlzIE5hdHVyYWwgYmVjYXVzZSBpdCBpcyBhbiBJbnRlZ2VyIGFuZCBncmVhdGVyIHRoYW4gemVyby4nXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBvYmoubWVzc2FnZSA9IG51bSArICcgaXMgbm90IE5hdHVyYWwgYmVjYXVzZSB3aGlsZSBpdCBpcyBhbiBJbnRlZ2VyLCBpdCBpcyBub3QgZ3JlYXRlciB0aGFuIHplcm8uJ1xuICAgIH1cblxuICB9XG4gIGVsc2Uge1xuICAgIG9iai5tZXNzYWdlID0gbnVtICsgJyBpcyBub3QgYW4gSW50ZWdlci4gVG8gYmUgbmF0dXJhbCwgbXVzdCBiZSBib3RoIGFuIEludGVnZXIgYW5kIGdyZWF0ZXIgdGhhbiB6ZXJvLidcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gO1xuXG59XG5cbk51bWJlci5wcm90b3R5cGUuaXNXaG9sZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbnVtID0gdGhpcy52YWx1ZU9mKClcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIobnVtKSAmJiBudW0gPiAtMTtcbn1cblxuLy8gTWF5YmUgdGhpcyBpcyBhIGJhZCBpZGVhP1xuTnVtYmVyLnByb3RvdHlwZS5pc0ludGVnZXIgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIG51bSA9IHRoaXMudmFsdWVPZigpXG4gIGlmIChOdW1iZXIuaXNJbnRlZ2VyKG51bSkpIHtcbiAgICBvYmoubWVzc2FnZSA9IG51bSArIFwiIGlzIGFuIEludGVnZXIgYmVjYXVzZSBpdCBjYW4gYmUgd3JpdHRlbiB3aXRob3V0IGEgZnJhY3Rpb25hbCBjb21wb25lbnQgKDxhIGhyZWY9XFxcImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0ludGVnZXJcXFwiPnNvdXJjZTwvYT4pLlwiXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgZWxzZSB7XG4gICAgb2JqLm1lc3NhZ2UgPSBudW0gKyBcIiBpcyBub3QgYW4gSW50ZWdlci5cIlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG5cbn07XG5cbk51bWJlci5wcm90b3R5cGUuaXNSYXRpb25hbCA9IGZ1bmN0aW9uKG9iaikge1xuICBvYmogPSB0eXBlb2Ygb2JqICE9PSBcInVuZGVmaW5lZFwiID8gb2JqIDoge21lc3NhZ2U6ICcnfTtcbiAgdmFyIEZyYWN0aW9uID0gcmVxdWlyZSgnZnJhY3Rpb25hbCcpLkZyYWN0aW9uXG4gIHZhciBudW0gPSB0aGlzLnZhbHVlT2YoKTtcbiAgaWYgKHRoaXMuaXNXaG9sZSgpKSB7XG4gICAgb2JqLm1lc3NhZ2UgPSB0aGlzICsgXCIgaXMgUmF0aW9uYWwgYmVjYXVzZSBpdCBpcyBXaG9sZVwiO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gVG8gYmUgcmF0aW9uYWwgaXQgbXVzdCBoYXZlIGEgZnJhY3Rpb24gb2YgaW50ZWdlcnNcbiAgdmFyIGZyYWMgPSBuZXcgRnJhY3Rpb24obnVtKTtcbiAgaWYgKGZyYWMubnVtZXJhdG9yIC8gZnJhYy5kZW5vbWluYXRvciA9PT0gbnVtKSB7XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoZnJhYy5udW1lcmF0b3IpICYmIE51bWJlci5pc0ludGVnZXIoZnJhYy5kZW5vbWluYXRvcikpIHtcbiAgICAgIG9iai5tZXNzYWdlID0gdGhpcyArIFwiIGlzIFJhdGlvbmFsIGJlY2F1c2UgaXQgY2FuIGJlIHdyaXR0ZW4gYXMgYSBmcmFjdGlvbiBvZiBpbnRlZ2Vycy4gXCIgKyBmcmFjLm51bWVyYXRvciArICcvJyArIGZyYWMuZGVub21pbmF0b3I7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgb2JqLm1lc3NhZ2UgPSB0aGlzICsgXCIgaXMgSXJyYXRpb25hbCBiZWNhdXNlIGl0IGNhbm5vdCBiZSB3cml0dGVuIGFzIGEgZnJhY3Rpb24gb2YgaW50ZWdlcnMuIFwiICsgZnJhYy5udW1lcmF0b3IgKyAnLycgKyBmcmFjLmRlbm9taW5hdG9yICsgXCIgaXMgY2xvc2UgYnV0IHRoaXMgb25seSBlcXVhbHMgXCIgKyBmcmFjLm51bWVyYXRvciAvIGZyYWMuZGVub21pbmF0b3I7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbk51bWJlci5wcm90b3R5cGUuaXNBbGdlYnJhaWMgPSBmdW5jdGlvbigpIHtcbiAgLy8gQSBudW1iZXIgaXMgYWxnZWJyYWljIGlmIGl0IGlzIHJhdGlvbmFsLlxuICBpZiAodGhpcy5pc1JhdGlvbmFsKCkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvLyBidXQgYW4gaXJyYXRpb25hbCBudW1iZXIgbWF5IG9yIG1heSBub3QgYmUgYWxnZWJyYWljXG4gIHZhciBudW0gPSB0aGlzLnZhbHVlT2YoKTtcbiAgY29uc29sZS5sb2coJ1RIaXMgaXMgdGhlIG51bWJlcicsIG51bSlcblxuICAvLyBTZWFyY2ggZm9yIGEgcG9seW5vbWlhbCB4Xm4gKyBhX24uIExldCBhIGJlIG5vIGhpZ2hlciBvciBsb3dlciB0aGFuIHRoZSBudW1iZXIuXG4gIGZvcih2YXIgbiA9IDE7bjw9NDtuKyspIHtcbiAgICAvLyBTdGFydCB3aXRoIHRoZSBuZWdhdGl2ZSB2ZXJzaW9uIG9mIHRoZSBudW1iZXIgYW5kIGdvIHVwIHRvIHRoZSBudW1iZXJcbiAgICBmb3IoIHZhciBhID0gTWF0aC5jZWlsKE1hdGguYWJzKG51bSkpICogLTE7IGE8PSBudW07IGErKykge1xuICAgICAgdmFyIHAgPSAnTWF0aC5wb3coeCwgJyArIG4gKyAnKSArICcgKyBhO1xuICAgICAgdmFyIHggPSBudW07XG4gICAgICAvLyBBIGFsZ2VicmFpYyBudW1iZXIgaXMgIGEgdmFsdWUgd2hpY2ggY2F1c2VzIHRoZSBwb2x5bm9taWFsIHRvIGVxdWFsIDAuXG4gICAgICBjb25zb2xlLmxvZygnTGV0IHggPSAnICsgbnVtICsgJyBmb3IgJywgcCk7XG4gICAgICB2YXIgYW5zID0gZXZhbChwKTtcbiAgICAgIC8vIEJvdW5kIGFuc3dlciB0byA0IGRlY2ltYWwgcG9pbnRzLiBXaGVuIGRvaW5nIGxvdHMgb2Ygcm9vdGluZyBzb21ldGltZXMgdmVyeSBzbWFsbCBmcmFjdGlvbnMgYXJlIGxlZnQgb3ZlciBhZ2FpbiBiZWNhdXNlIG9mIHJvdW5kaW5nIGFuZCB0aGUgbGFjayBvZiBwcmVjaXNpb25cbiAgICAgIGFucyA9IGFucy50b0ZpeGVkKDQpXG4gICAgICBpZiAoYW5zPT0wKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJdCBkb2VzIG5vdCB5aWVsZCB6ZXJvLiBZaWVsZGVkOiAnICsgYW5zICsgJy4gJyArIG51bSArICcgaXMgbm90IGEgcm9vdCBmb3IgdGhpcyBwb2x5bm9taWFsLiBNYXliZSBJXFwnbGwgdHJ5IGFub3RoZXIuLicpXG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4geC5pc1JhdGlvbmFsKCk7XG5cbn1cblxuTnVtYmVyLnByb3RvdHlwZS5pc1RyYW5zY2VuZGVudGFsID0gZnVuY3Rpb24ob2JqKSB7XG4gIC8vIEEgcmVhbCBudW1iZXIgdGhhdCBpcyBub3QgQWxnZWJyYWljLiBJcyBpdCB0aGlzIHNpbXBsZT9cbiAgcmV0dXJuICF0aGlzLmlzQWxnZWJyYWljKCk7XG59XG5cbk51bWJlci5wcm90b3R5cGUuaXNSZWFsID0gZnVuY3Rpb24ob2JqKSB7XG4gIGNvbnNvbGUubG9nKFwiSSdtIGxvdmluZyB5b3UgbGlrZSBjYW5keSAtIE1hbmR5IE1vb3JlXCIpO1xuXG59XG4iLCIvKlxuZnJhY3Rpb24uanNcbkEgSmF2YXNjcmlwdCBmcmFjdGlvbiBsaWJyYXJ5LlxuXG5Db3B5cmlnaHQgKGMpIDIwMDkgIEVyaWsgR2Fycmlzb24gPGVyaWtAaHlwZXJ2b2x1Lm1lPlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG5cbiovXG5cblxuLyogRnJhY3Rpb25zICovXG4vKiBcbiAqXG4gKiBGcmFjdGlvbiBvYmplY3RzIGFyZSBjb21wcmlzZWQgb2YgYSBudW1lcmF0b3IgYW5kIGEgZGVub21lbmF0b3IuICBUaGVzZVxuICogdmFsdWVzIGNhbiBiZSBhY2Nlc3NlZCBhdCBmcmFjdGlvbi5udW1lcmF0b3IgYW5kIGZyYWN0aW9uLmRlbm9tZW5hdG9yLlxuICpcbiAqIEZyYWN0aW9ucyBhcmUgYWx3YXlzIHJldHVybmVkIGFuZCBzdG9yZWQgaW4gbG93ZXN0LWZvcm0gbm9ybWFsaXplZCBmb3JtYXQuXG4gKiBUaGlzIGlzIGFjY29tcGxpc2hlZCB2aWEgRnJhY3Rpb24ubm9ybWFsaXplLlxuICpcbiAqIFRoZSBmb2xsb3dpbmcgbWF0aGVtYXRpY2FsIG9wZXJhdGlvbnMgb24gZnJhY3Rpb25zIGFyZSBzdXBwb3J0ZWQ6XG4gKlxuICogRnJhY3Rpb24uZXF1YWxzXG4gKiBGcmFjdGlvbi5hZGRcbiAqIEZyYWN0aW9uLnN1YnRyYWN0XG4gKiBGcmFjdGlvbi5tdWx0aXBseVxuICogRnJhY3Rpb24uZGl2aWRlXG4gKlxuICogVGhlc2Ugb3BlcmF0aW9ucyBhY2NlcHQgYm90aCBudW1iZXJzIGFuZCBmcmFjdGlvbiBvYmplY3RzLiAgKEJlc3QgcmVzdWx0c1xuICogYXJlIGd1YXJhbnRlZWQgd2hlbiB0aGUgaW5wdXQgaXMgYSBmcmFjdGlvbiBvYmplY3QuKSAgVGhleSBhbGwgcmV0dXJuIGEgbmV3XG4gKiBGcmFjdGlvbiBvYmplY3QuXG4gKlxuICogVXNhZ2U6XG4gKlxuICogVE9ET1xuICpcbiAqL1xuXG4vKlxuICogVGhlIEZyYWN0aW9uIGNvbnN0cnVjdG9yIHRha2VzIG9uZSBvZjpcbiAqICAgYW4gZXhwbGljaXQgbnVtZXJhdG9yIChpbnRlZ2VyKSBhbmQgZGVub21pbmF0b3IgKGludGVnZXIpLFxuICogICBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZnJhY3Rpb24gKHN0cmluZyksXG4gKiAgIG9yIGEgZmxvYXRpbmctcG9pbnQgbnVtYmVyIChmbG9hdClcbiAqXG4gKiBUaGVzZSBpbml0aWFsaXphdGlvbiBtZXRob2RzIGFyZSBwcm92aWRlZCBmb3IgY29udmVuaWVuY2UuICBCZWNhdXNlIG9mXG4gKiByb3VuZGluZyBpc3N1ZXMgdGhlIGJlc3QgcmVzdWx0cyB3aWxsIGJlIGdpdmVuIHdoZW4gdGhlIGZyYWN0aW9uIGlzXG4gKiBjb25zdHJ1Y3RlZCBmcm9tIGFuIGV4cGxpY2l0IGludGVnZXIgbnVtZXJhdG9yIGFuZCBkZW5vbWVuYXRvciwgYW5kIG5vdCBhXG4gKiBkZWNpbWFsIG51bWJlci5cbiAqXG4gKlxuICogZS5nLiBuZXcgRnJhY3Rpb24oMSwgMikgLS0+IDEvMlxuICogICAgICBuZXcgRnJhY3Rpb24oJzEvMicpIC0tPiAxLzJcbiAqICAgICAgbmV3IEZyYWN0aW9uKCcyIDMvNCcpIC0tPiAxMS80ICAocHJpbnRzIGFzIDIgMy80KVxuICpcbiAqL1xuRnJhY3Rpb24gPSBmdW5jdGlvbihudW1lcmF0b3IsIGRlbm9taW5hdG9yKVxue1xuICAgIC8qIGRvdWJsZSBhcmd1bWVudCBpbnZvY2F0aW9uICovXG4gICAgaWYgKHR5cGVvZiBudW1lcmF0b3IgIT09ICd1bmRlZmluZWQnICYmIGRlbm9taW5hdG9yKSB7XG4gICAgICAgIGlmICh0eXBlb2YobnVtZXJhdG9yKSA9PT0gJ251bWJlcicgJiYgdHlwZW9mKGRlbm9taW5hdG9yKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMubnVtZXJhdG9yID0gbnVtZXJhdG9yO1xuICAgICAgICAgICAgdGhpcy5kZW5vbWluYXRvciA9IGRlbm9taW5hdG9yO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZihudW1lcmF0b3IpID09PSAnc3RyaW5nJyAmJiB0eXBlb2YoZGVub21pbmF0b3IpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLy8gd2hhdCBhcmUgdGhleT9cbiAgICAgICAgICAgIC8vIGhtbS4uLi5cbiAgICAgICAgICAgIC8vIGFzc3VtZSB0aGV5IGFyZSBpbnRzP1xuICAgICAgICAgICAgdGhpcy5udW1lcmF0b3IgPSBwYXJzZUludChudW1lcmF0b3IpO1xuICAgICAgICAgICAgdGhpcy5kZW5vbWluYXRvciA9IHBhcnNlSW50KGRlbm9taW5hdG9yKTtcbiAgICAgICAgfVxuICAgIC8qIHNpbmdsZS1hcmd1bWVudCBpbnZvY2F0aW9uICovXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVub21pbmF0b3IgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG51bSA9IG51bWVyYXRvcjsgLy8gc3dhcCB2YXJpYWJsZSBuYW1lcyBmb3IgbGVnaWJpbGl0eVxuICAgICAgICBpZiAodHlwZW9mKG51bSkgPT09ICdudW1iZXInKSB7ICAvLyBqdXN0IGEgc3RyYWlnaHQgbnVtYmVyIGluaXRcbiAgICAgICAgICAgIHRoaXMubnVtZXJhdG9yID0gbnVtO1xuICAgICAgICAgICAgdGhpcy5kZW5vbWluYXRvciA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mKG51bSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YXIgYSwgYjsgIC8vIGhvbGQgdGhlIGZpcnN0IGFuZCBzZWNvbmQgcGFydCBvZiB0aGUgZnJhY3Rpb24sIGUuZy4gYSA9ICcxJyBhbmQgYiA9ICcyLzMnIGluIDEgMi8zXG4gICAgICAgICAgICAgICAgICAgICAgIC8vIG9yIGEgPSAnMi8zJyBhbmQgYiA9IHVuZGVmaW5lZCBpZiB3ZSBhcmUganVzdCBwYXNzZWQgYSBzaW5nbGUtcGFydCBudW1iZXJcbiAgICAgICAgICAgIHZhciBhcnIgPSBudW0uc3BsaXQoJyAnKVxuICAgICAgICAgICAgaWYgKGFyclswXSkgYSA9IGFyclswXVxuICAgICAgICAgICAgaWYgKGFyclsxXSkgYiA9IGFyclsxXVxuICAgICAgICAgICAgLyogY29tcG91bmQgZnJhY3Rpb24gZS5nLiAnQSBCL0MnICovXG4gICAgICAgICAgICAvLyAgaWYgYSBpcyBhbiBpbnRlZ2VyIC4uLlxuICAgICAgICAgICAgaWYgKGEgJSAxID09PSAwICYmIGIgJiYgYi5tYXRjaCgnLycpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChuZXcgRnJhY3Rpb24oYSkpLmFkZChuZXcgRnJhY3Rpb24oYikpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhICYmICFiKSB7XG4gICAgICAgICAgICAgICAgLyogc2ltcGxlIGZyYWN0aW9uIGUuZy4gJ0EvQicgKi9cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGEpID09PSAnc3RyaW5nJyAmJiBhLm1hdGNoKCcvJykpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQncyBub3QgYSB3aG9sZSBudW1iZXIuLi4gaXQncyBhY3R1YWxseSBhIGZyYWN0aW9uIHdpdGhvdXQgYSB3aG9sZSBwYXJ0IHdyaXR0ZW5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSBhLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtZXJhdG9yID0gZlswXTsgdGhpcy5kZW5vbWluYXRvciA9IGZbMV07XG4gICAgICAgICAgICAgICAgLyogc3RyaW5nIGZsb2F0aW5nIHBvaW50ICovXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YoYSkgPT09ICdzdHJpbmcnICYmIGEubWF0Y2goJ1xcLicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRnJhY3Rpb24ocGFyc2VGbG9hdChhKSk7XG4gICAgICAgICAgICAgICAgLyogd2hvbGUgbnVtYmVyIGUuZy4gJ0EnICovXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8ganVzdCBwYXNzZWQgYSB3aG9sZSBudW1iZXIgYXMgYSBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5udW1lcmF0b3IgPSBwYXJzZUludChhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZW5vbWluYXRvciA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyAvLyBjb3VsZCBub3QgcGFyc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm5vcm1hbGl6ZSgpO1xufVxuXG5cbkZyYWN0aW9uLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKClcbntcbiAgICByZXR1cm4gbmV3IEZyYWN0aW9uKHRoaXMubnVtZXJhdG9yLCB0aGlzLmRlbm9taW5hdG9yKTtcbn1cblxuXG4vKiBwcmV0dHktcHJpbnRlciwgY29udmVydHMgZnJhY3Rpb25zIGludG8gd2hvbGUgbnVtYmVycyBhbmQgZnJhY3Rpb25zICovXG5GcmFjdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpXG57XG4gICAgaWYgKHRoaXMuZGVub21pbmF0b3I9PT0nTmFOJykgcmV0dXJuICdOYU4nXG4gICAgdmFyIHdob2xlcGFydCA9ICh0aGlzLm51bWVyYXRvci90aGlzLmRlbm9taW5hdG9yPjApID9cbiAgICAgIE1hdGguZmxvb3IodGhpcy5udW1lcmF0b3IgLyB0aGlzLmRlbm9taW5hdG9yKSA6XG4gICAgICBNYXRoLmNlaWwodGhpcy5udW1lcmF0b3IgLyB0aGlzLmRlbm9taW5hdG9yKVxuICAgIHZhciBudW1lcmF0b3IgPSB0aGlzLm51bWVyYXRvciAlIHRoaXMuZGVub21pbmF0b3IgXG4gICAgdmFyIGRlbm9taW5hdG9yID0gdGhpcy5kZW5vbWluYXRvcjtcbiAgICB2YXIgcmVzdWx0ID0gW107IFxuICAgIGlmICh3aG9sZXBhcnQgIT0gMCkgIFxuICAgICAgICByZXN1bHQucHVzaCh3aG9sZXBhcnQpO1xuICAgIGlmIChudW1lcmF0b3IgIT0gMCkgIFxuICAgICAgICByZXN1bHQucHVzaCgoKHdob2xlcGFydD09PTApID8gbnVtZXJhdG9yIDogTWF0aC5hYnMobnVtZXJhdG9yKSkgKyAnLycgKyBkZW5vbWluYXRvcik7XG4gICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPiAwID8gcmVzdWx0LmpvaW4oJyAnKSA6IDA7XG59XG5cblxuLyogZGVzdHJ1Y3RpdmVseSByZXNjYWxlIHRoZSBmcmFjdGlvbiBieSBzb21lIGludGVncmFsIGZhY3RvciAqL1xuRnJhY3Rpb24ucHJvdG90eXBlLnJlc2NhbGUgPSBmdW5jdGlvbihmYWN0b3IpXG57XG4gICAgdGhpcy5udW1lcmF0b3IgKj0gZmFjdG9yO1xuICAgIHRoaXMuZGVub21pbmF0b3IgKj0gZmFjdG9yO1xuICAgIHJldHVybiB0aGlzO1xufVxuXG5cbkZyYWN0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihiKVxue1xuICAgIHZhciBhID0gdGhpcy5jbG9uZSgpO1xuICAgIGlmIChiIGluc3RhbmNlb2YgRnJhY3Rpb24pIHtcbiAgICAgICAgYiA9IGIuY2xvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBiID0gbmV3IEZyYWN0aW9uKGIpO1xuICAgIH1cbiAgICB0ZCA9IGEuZGVub21pbmF0b3I7XG4gICAgYS5yZXNjYWxlKGIuZGVub21pbmF0b3IpO1xuICAgIGIucmVzY2FsZSh0ZCk7XG5cbiAgICBhLm51bWVyYXRvciArPSBiLm51bWVyYXRvcjtcblxuICAgIHJldHVybiBhLm5vcm1hbGl6ZSgpO1xufVxuXG5cbkZyYWN0aW9uLnByb3RvdHlwZS5zdWJ0cmFjdCA9IGZ1bmN0aW9uKGIpXG57XG4gICAgdmFyIGEgPSB0aGlzLmNsb25lKCk7XG4gICAgaWYgKGIgaW5zdGFuY2VvZiBGcmFjdGlvbikge1xuICAgICAgICBiID0gYi5jbG9uZSgpOyAgLy8gd2Ugc2NhbGUgb3VyIGFyZ3VtZW50IGRlc3RydWN0aXZlbHksIHNvIGNsb25lXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYiA9IG5ldyBGcmFjdGlvbihiKTtcbiAgICB9XG4gICAgdGQgPSBhLmRlbm9taW5hdG9yO1xuICAgIGEucmVzY2FsZShiLmRlbm9taW5hdG9yKTtcbiAgICBiLnJlc2NhbGUodGQpO1xuXG4gICAgYS5udW1lcmF0b3IgLT0gYi5udW1lcmF0b3I7XG5cbiAgICByZXR1cm4gYS5ub3JtYWxpemUoKTtcbn1cblxuXG5GcmFjdGlvbi5wcm90b3R5cGUubXVsdGlwbHkgPSBmdW5jdGlvbihiKVxue1xuICAgIHZhciBhID0gdGhpcy5jbG9uZSgpO1xuICAgIGlmIChiIGluc3RhbmNlb2YgRnJhY3Rpb24pXG4gICAge1xuICAgICAgICBhLm51bWVyYXRvciAqPSBiLm51bWVyYXRvcjtcbiAgICAgICAgYS5kZW5vbWluYXRvciAqPSBiLmRlbm9taW5hdG9yO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGIgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGEubnVtZXJhdG9yICo9IGI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGEubXVsdGlwbHkobmV3IEZyYWN0aW9uKGIpKTtcbiAgICB9XG4gICAgcmV0dXJuIGEubm9ybWFsaXplKCk7XG59XG5cbkZyYWN0aW9uLnByb3RvdHlwZS5kaXZpZGUgPSBmdW5jdGlvbihiKVxue1xuICAgIHZhciBhID0gdGhpcy5jbG9uZSgpO1xuICAgIGlmIChiIGluc3RhbmNlb2YgRnJhY3Rpb24pXG4gICAge1xuICAgICAgICBhLm51bWVyYXRvciAqPSBiLmRlbm9taW5hdG9yO1xuICAgICAgICBhLmRlbm9taW5hdG9yICo9IGIubnVtZXJhdG9yO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGIgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGEuZGVub21pbmF0b3IgKj0gYjtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYS5kaXZpZGUobmV3IEZyYWN0aW9uKGIpKTtcbiAgICB9XG4gICAgcmV0dXJuIGEubm9ybWFsaXplKCk7XG59XG5cbkZyYWN0aW9uLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbihiKVxue1xuICAgIGlmICghKGIgaW5zdGFuY2VvZiBGcmFjdGlvbikpIHtcbiAgICAgICAgYiA9IG5ldyBGcmFjdGlvbihiKTtcbiAgICB9XG4gICAgLy8gZnJhY3Rpb25zIHRoYXQgYXJlIGVxdWFsIHNob3VsZCBoYXZlIGVxdWFsIG5vcm1hbGl6ZWQgZm9ybXNcbiAgICB2YXIgYSA9IHRoaXMuY2xvbmUoKS5ub3JtYWxpemUoKTtcbiAgICB2YXIgYiA9IGIuY2xvbmUoKS5ub3JtYWxpemUoKTtcbiAgICByZXR1cm4gKGEubnVtZXJhdG9yID09PSBiLm51bWVyYXRvciAmJiBhLmRlbm9taW5hdG9yID09PSBiLmRlbm9taW5hdG9yKTtcbn1cblxuXG4vKiBVdGlsaXR5IGZ1bmN0aW9ucyAqL1xuXG4vKiBEZXN0cnVjdGl2ZWx5IG5vcm1hbGl6ZSB0aGUgZnJhY3Rpb24gdG8gaXRzIHNtYWxsZXN0IHJlcHJlc2VudGF0aW9uLiBcbiAqIGUuZy4gNC8xNiAtPiAxLzQsIDE0LzI4IC0+IDEvMiwgZXRjLlxuICogVGhpcyBpcyBjYWxsZWQgYWZ0ZXIgYWxsIG1hdGggb3BzLlxuICovXG5GcmFjdGlvbi5wcm90b3R5cGUubm9ybWFsaXplID0gKGZ1bmN0aW9uKClcbntcblxuICAgIHZhciBpc0Zsb2F0ID0gZnVuY3Rpb24obilcbiAgICB7XG4gICAgICAgIHJldHVybiAodHlwZW9mKG4pID09PSAnbnVtYmVyJyAmJiBcbiAgICAgICAgICAgICAgICAoKG4gPiAwICYmIG4gJSAxID4gMCAmJiBuICUgMSA8IDEpIHx8IFxuICAgICAgICAgICAgICAgICAobiA8IDAgJiYgbiAlIC0xIDwgMCAmJiBuICUgLTEgPiAtMSkpXG4gICAgICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHZhciByb3VuZFRvUGxhY2VzID0gZnVuY3Rpb24obiwgcGxhY2VzKSBcbiAgICB7XG4gICAgICAgIGlmICghcGxhY2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzY2FsYXIgPSBNYXRoLnBvdygxMCwgcGxhY2VzKTtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG4qc2NhbGFyKS9zY2FsYXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLy8gWFhYIGhhY2tpc2guICBJcyB0aGVyZSBhIGJldHRlciB3YXkgdG8gYWRkcmVzcyB0aGlzIGlzc3VlP1xuICAgICAgICAvL1xuICAgICAgICAvKiBmaXJzdCBjaGVjayBpZiB3ZSBoYXZlIGRlY2ltYWxzLCBhbmQgaWYgd2UgZG8gZWxpbWluYXRlIHRoZW1cbiAgICAgICAgICogbXVsdGlwbHkgYnkgdGhlIDEwIF4gbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIGluIHRoZSBudW1iZXJcbiAgICAgICAgICogcm91bmQgdGhlIG51bWJlciB0byBuaW5lIGRlY2ltYWwgcGxhY2VzXG4gICAgICAgICAqIHRvIGF2b2lkIGpzIGZsb2F0aW5nIHBvaW50IGZ1bm5pZXNcbiAgICAgICAgICovXG4gICAgICAgIGlmIChpc0Zsb2F0KHRoaXMuZGVub21pbmF0b3IpKSB7XG4gICAgICAgICAgICB2YXIgcm91bmRlZCA9IHJvdW5kVG9QbGFjZXModGhpcy5kZW5vbWluYXRvciwgOSk7XG4gICAgICAgICAgICB2YXIgc2NhbGV1cCA9IE1hdGgucG93KDEwLCByb3VuZGVkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXS5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5kZW5vbWluYXRvciA9IE1hdGgucm91bmQodGhpcy5kZW5vbWluYXRvciAqIHNjYWxldXApOyAvLyB0aGlzICEhISBzaG91bGQgYmUgYSB3aG9sZSBudW1iZXJcbiAgICAgICAgICAgIC8vdGhpcy5udW1lcmF0b3IgKj0gc2NhbGV1cDtcbiAgICAgICAgICAgIHRoaXMubnVtZXJhdG9yICo9IHNjYWxldXA7XG4gICAgICAgIH0gXG4gICAgICAgIGlmIChpc0Zsb2F0KHRoaXMubnVtZXJhdG9yKSkge1xuICAgICAgICAgICAgdmFyIHJvdW5kZWQgPSByb3VuZFRvUGxhY2VzKHRoaXMubnVtZXJhdG9yLCA5KTtcbiAgICAgICAgICAgIHZhciBzY2FsZXVwID0gTWF0aC5wb3coMTAsIHJvdW5kZWQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdLmxlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLm51bWVyYXRvciA9IE1hdGgucm91bmQodGhpcy5udW1lcmF0b3IgKiBzY2FsZXVwKTsgLy8gdGhpcyAhISEgc2hvdWxkIGJlIGEgd2hvbGUgbnVtYmVyXG4gICAgICAgICAgICAvL3RoaXMubnVtZXJhdG9yICo9IHNjYWxldXA7XG4gICAgICAgICAgICB0aGlzLmRlbm9taW5hdG9yICo9IHNjYWxldXA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdjZiA9IEZyYWN0aW9uLmdjZih0aGlzLm51bWVyYXRvciwgdGhpcy5kZW5vbWluYXRvcik7XG4gICAgICAgIHRoaXMubnVtZXJhdG9yIC89IGdjZjtcbiAgICAgICAgdGhpcy5kZW5vbWluYXRvciAvPSBnY2Y7XG4gICAgICAgIGlmICgodGhpcy5udW1lcmF0b3IgPCAwICYmIHRoaXMuZGVub21pbmF0b3IgPCAwKSB8fCAodGhpcy5udW1lcmF0b3IgPiAwICYmIHRoaXMuZGVub21pbmF0b3IgPCAwKSkge1xuICAgICAgICAgICAgdGhpcy5udW1lcmF0b3IgKj0gLTE7XG4gICAgICAgICAgICB0aGlzLmRlbm9taW5hdG9yICo9IC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pO1xuXG59KSgpO1xuXG5cbi8qIFRha2VzIHR3byBudW1iZXJzIGFuZCByZXR1cm5zIHRoZWlyIGdyZWF0ZXN0IGNvbW1vbiBmYWN0b3IuXG4gKi9cbkZyYWN0aW9uLmdjZiA9IGZ1bmN0aW9uKGEsIGIpXG57XG5cbiAgICB2YXIgY29tbW9uX2ZhY3RvcnMgPSBbXTtcbiAgICB2YXIgZmEgPSBGcmFjdGlvbi5wcmltZUZhY3RvcnMoYSk7XG4gICAgdmFyIGZiID0gRnJhY3Rpb24ucHJpbWVGYWN0b3JzKGIpO1xuICAgIC8vIGZvciBlYWNoIGZhY3RvciBpbiBmYVxuICAgIC8vIGlmIGl0J3MgYWxzbyBpbiBmYlxuICAgIC8vIHB1dCBpdCBpbnRvIHRoZSBjb21tb24gZmFjdG9yc1xuICAgIGZhLmZvckVhY2goZnVuY3Rpb24gKGZhY3RvcikgXG4gICAgeyBcbiAgICAgICAgdmFyIGkgPSBmYi5pbmRleE9mKGZhY3Rvcik7XG4gICAgICAgIGlmIChpID49IDApIHtcbiAgICAgICAgICAgIGNvbW1vbl9mYWN0b3JzLnB1c2goZmFjdG9yKTtcbiAgICAgICAgICAgIGZiLnNwbGljZShpLDEpOyAvLyByZW1vdmUgZnJvbSBmYlxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoY29tbW9uX2ZhY3RvcnMubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gMTtcblxuICAgIHZhciBnY2YgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByID0gY29tbW9uX2ZhY3RvcnNbMF07XG4gICAgICAgIHZhciBpO1xuICAgICAgICBmb3IgKGk9MTtpPGNvbW1vbl9mYWN0b3JzLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHIgPSByICogY29tbW9uX2ZhY3RvcnNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfSkoKTtcblxuICAgIHJldHVybiBnY2Y7XG5cbn07XG5cblxuLy8gQWRhcHRlZCBmcm9tOiBcbi8vIGh0dHA6Ly93d3cuYnRpbnRlcm5ldC5jb20vfnNlMTYvanMvZmFjdG9yLmh0bVxuRnJhY3Rpb24ucHJpbWVGYWN0b3JzID0gZnVuY3Rpb24obikgXG57XG5cbiAgICB2YXIgbnVtID0gTWF0aC5hYnMobik7XG4gICAgdmFyIGZhY3RvcnMgPSBbXTtcbiAgICB2YXIgX2ZhY3RvciA9IDI7ICAvLyBmaXJzdCBwb3RlbnRpYWwgcHJpbWUgZmFjdG9yXG5cbiAgICB3aGlsZSAoX2ZhY3RvciAqIF9mYWN0b3IgPD0gbnVtKSAgLy8gc2hvdWxkIHdlIGtlZXAgbG9va2luZyBmb3IgZmFjdG9ycz9cbiAgICB7ICAgICAgXG4gICAgICBpZiAobnVtICUgX2ZhY3RvciA9PT0gMCkgIC8vIHRoaXMgaXMgYSBmYWN0b3JcbiAgICAgICAgeyBcbiAgICAgICAgICAgIGZhY3RvcnMucHVzaChfZmFjdG9yKTsgIC8vIHNvIGtlZXAgaXRcbiAgICAgICAgICAgIG51bSA9IG51bS9fZmFjdG9yOyAgLy8gYW5kIGRpdmlkZSBvdXIgc2VhcmNoIHBvaW50IGJ5IGl0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBfZmFjdG9yKys7ICAvLyBhbmQgaW5jcmVtZW50XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobnVtICE9IDEpICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbnl0aGluZyBsZWZ0IGF0IHRoZSBlbmQuLi5cbiAgICB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuLi50aGlzIG11c3QgYmUgdGhlIGxhc3QgcHJpbWUgZmFjdG9yXG4gICAgICAgIGZhY3RvcnMucHVzaChudW0pOyAgICAgICAgICAgLy8gICAgc28gaXQgdG9vIHNob3VsZCBiZSByZWNvcmRlZFxuICAgIH1cblxuICAgIHJldHVybiBmYWN0b3JzOyAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgcHJpbWUgZmFjdG9yc1xufVxuXG5tb2R1bGUuZXhwb3J0cy5GcmFjdGlvbiA9IEZyYWN0aW9uXG4iXX0=
