describe('The set of the zero element', function() {

  beforeAll(function() {
    theArray = [0];

    operation = function(element1, element2) {
      return (element1 + element2) % 6
    }

    operation2 = function(element1, element2) {
      return element1 * element2
    }
  })

  it('should be closed', function() {
    expect(theArray.isClosed(operation)).toBe(true)
  })

  it('should have an identity element', function() {
    expect(theArray.hasIdentity(operation)).toBe(true)
  })

  it('should be associative', function() {
    expect(theArray.isAssociative(operation)).toBe(true)
  })

  it('should have inverse', function() {
    expect(theArray.hasInverse(operation)).toBe(true)
  })

  it('should be a group', function() {
    expect(theArray.isGroup(operation)).toBe(true)
  })

  it('should be communtative', function() {
    expect(theArray.isCommutative(operation)).toBe(true)
  })

  it('should be an abelian group', function() {
    expect(theArray.isAbelianGroup(operation)).toBe(true)
  })

  it('should be distributive', function() {
    expect(theArray.isDistributive(operation, operation2)).toBe(true)
  })

  it('should be a ring', function() {
    expect(theArray.isRing(operation, operation2)).toBe(true)
  })

  it('should be a commutative ring', function() {
    expect(theArray.isCommutativeRing(operation, operation2)).toBe(true)
  })

  it('should be a field', function() {
    expect(theArray.isField(operation, operation2)).toBe(true)
  })

})

describe('Z4', function() {

  beforeAll(function() {
    theArray = [0,1,2,3];

    operation = function(element1, element2) {
      return (element1 + element2) % theArray.length
    }

  })

  it('should be closed', function() {
    expect(theArray.isClosed(operation)).toBe(true)
  })

  it('should have an identity element', function() {
    expect(theArray.hasIdentity(operation)).toBe(true)
  })

  it('should be associative', function() {
    expect(theArray.isAssociative(operation)).toBe(true)
  })

  it('should have inverse', function() {
    expect(theArray.hasInverse(operation)).toBe(true)
  })

  it('should be a group', function() {
    expect(theArray.isGroup(operation)).toBe(true)
  })

})

describe('The set of Natural numbers', function() {

  it('should contain 1', function() {
    var number = 1;
    expect(number.isNatural()).toBe(true)
  })

  it('should NOT contain 0', function() {
    var number = 0;
    expect(number.isNatural()).toBe(false)
  })

});

describe('The set of Whole numbers', function() {

  it('should contain 0', function() {
    var number = 0;
    expect(number.isWhole()).toBe(true)
  })

  it('should NOT contain -1', function() {
    var number = -1;
    expect(number.isWhole()).toBe(false)
  })

});

describe('The set of Rational numbers', function() {
  it('should be rational when it is 1', function() {
    var number = 1;
    var obj = {}
    expect(number.isRational(obj)).toBe(true)
    console.log(obj.message)
  })

  it('should not contain PI (' + Math.PI + ')', function() {
    var number = Math.PI;
    var obj = {}
    expect(number.isRational(obj)).toBe(false)
    console.log(obj.message)
  })

  it('should contain 0.333333333', function() {
    var number = 0.333333333;
    var obj = {}
    expect(number.isRational(obj)).toBe(true)
    console.log(obj.message)
  })

  it('should NOT contain SQRT 2', function() {
    var number = Math.sqrt(2);
    var obj = {}
    expect(number.isRational(obj)).toBe(false)
    console.log(obj.message)
  })


});

describe('The set of Algebraic numbers', function() {
  it('should include integers', function() {
    var number = 1;
    var obj = {}
    expect(number.isAlgebraic(obj)).toBe(true)
  })
})
