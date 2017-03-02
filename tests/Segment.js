describe('Segment', function() {

		beforeAll(function() {

		});

		it('should construct', function() {
			myFirstSegment = new Segment();
			expect(myFirstSegment instanceof Segment).toBe(true)
    });

		it('should set data upon construction', function() {
			var data = {
				title: "What is Objectivism?",
		    url: 'http://aynrand.org/',
		    timeStart: '1:33',
		    timeEnd: '1:27:53',
		    interests: {
		      'captialism': 0.5,
		      'self': 0.9,
		    }
			}
			myFirstSegment = new Segment(data)
			// Get the value. Is it the same value?
			expect(myFirstSegment.title).toBe("What is Objectivism?");
    });

		afterAll(function() {

		});

});
