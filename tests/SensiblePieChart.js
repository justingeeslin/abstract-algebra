describe('SensiblePieChart', function() {

		beforeAll(function() {
			$(document.body).append($('<div class="chart visitors"></div>'));
		});

		it('should construct', function() {
			myFirstPieChart = new SensiblePieChart({
				target: $('.chart.visitors'),
			  data: {
			    'root': [['Visitors', 100]],
			    'Visitors': [['Mobile', 75],['Desktop', 24]],
			    'Desktop': [['Windows', 75],['Mac', 24], ['Other', 1]]
			  },
			});
			expect(myFirstPieChart instanceof SensiblePieChart).toBe(true)
			expect($('.chart.visitors').children('svg').length > 0).toBe(true)
    });

		afterAll(function() {

		});

});
