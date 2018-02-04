var Point = require('../js/Point.js');
fdescribe('Point', function() {

  beforeAll(function() {
    $(document.body).append('<canvas id="myCanvas" width="578" height="200">')
  })

  it('should draw a circle on the canvas', function() {


  })

  fit('should have a correct volume for the given radius', function() {

    var aSphere = new Point({
      target: $('#myCanvas'),
      radius: 80
    });

    // expect(aSphere.getVolume()).toBe(0)

  })

})
