// All the form handling goes here.
$(document).ready(function() {
  console.log('Document ready')
  var theInput = $('form > input');
  var answerBox = $('.answer');
  var go = function(x) {
    console.log('calculating..')
    answerBox.find('.answer-box').empty();

    var answerTestMap = {
      'n' : 'isNatural',
      'z' : 'isInteger',
      'q' : 'isRational',
      'r-bar' : 'isAlgebraic'
    }

    for( var prop in answerTestMap ) {
      // Give a more detailed explanation
      var details = {};
      if (answerTestMap.hasOwnProperty(prop)) {
        answerBox.find('.' + prop + ' .answer-box').append(x[answerTestMap[prop]](details) ? 'Is' : 'Is not')

        if (typeof details.message !== "undefined") {
          answerBox.find('.' + prop + ' .answer-box').append('<p>' + details.message + '</p>')
        }
      }
    }

  }

  theInput.on('input', function() {
    go(new Number($(this).val()));
  });
})

// Generate random sayings
$(document).ready(function() {
  var sayings = [
    'Man I wish I had this in college.',
    'God created the Integers',
    'Computers are great!',
    'Be rational. Get real.',
    'Nuggets from Numbers.',
  ]

  var sayingsBox = $('body > aside');
  sayingsBox.empty().append(sayings[Math.round(Math.random()*sayings.length)])

});
