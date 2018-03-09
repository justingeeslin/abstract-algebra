// All the form handling goes here.
$(document).ready(function() {
  console.log('Document ready')
  var theInput = $('form > input');
  var answerBox = $('.answer');
  var go = function(x) {
    console.log('calculating..')
    answerBox.find('.answer-box').empty();

    answerBox.find('.n .answer-box').append(x.isNatural() ? 'Is a Natural number' : 'Is not a Natural number')
    // Is integer?
    answerBox.find('.z .answer-box').append(x.isInteger() ? 'Is an Integer' : 'Is not an Integer')

    // Give a more detailed explanation
    answerBox.find('.q .answer-box').append(x.isRational() ? 'Is Rational' : 'Is not Rational (Irrational)')
    answerBox.find('.r-bar .answer-box').append(x.isAlgebraic() ? 'Is ' : 'Is not ')
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
