describe('Set Theory Extensions', function() {

  beforeAll(function() {
    theArray = [0];

    operation = function(element1, element2) {
      return element1 + element2

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

  it('should have associativity', function() {
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
