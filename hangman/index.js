let mysteryWord = 'stranger'
let wordArray = mysteryWord.split('')
let bank = []
let correctBank = []
console.log(wordArray)

$(() => {
  // highlight letter on mouse click
  $('.alphabet').on('click', '.letter', event => {
      $(event.target).removeClass('letter')
      $(event.target).addClass('highlight')
      console.log('test')
  });

  // push selected letter into letter 'bank'
  $('.alphabet').on('click', '.letter', event => {
    bank.push(event.target.innerHTML)

    for (i = 0; i < mysteryWord.length; i++) {
      if ((wordArray[i].toUpperCase()) == event.target.innerHTML) {
        correctBank.push(event.target.innerHTML)
        $(".solution").append(`<div class="correctLetter">${event.target.innerHTML}</div>
`);

      } else {
        bank.push(event.target.innerHTML)
      }
      // $( ".correctLetters" ).append(`✔`);
      // console.log(`word letter: ${wordArray[i]}`)
    }

    console.log(correctBank)
    console.log(event.target.innerHTML)

    // console.log(event.target.innerHTML)
    // console.log(bank)
  });

  // generate appropriate # of spaces for the mystery word
  for (i = 0; i < mysteryWord.length; i++) {
    $(".spaces").append(`____  `);
    console.log(`testing count ${i}`)
  }


})
