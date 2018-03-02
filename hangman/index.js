let wordBank = ['CODECORE', 'PYTHON', 'JAVASCRIPT', 'REACT', 'BOOTCAMP', 'RUBY', 'FRAMEWORK', 'JQUERY']
let mysteryWord = wordBank[Math.floor(Math.random() * wordBank.length)]
let wordArray = mysteryWord.split('')
let wrongCount = 0
let winCount = 0
console.log(wordArray)

const slam = () =>
  new Audio(`assets/slam.wav`);

const cheer = () =>
  new Audio(`assets/cheer.wav`);

console.log(slam().duration)
$(() => {

  // highlight letter on mouse click
  $('.alphabet').on('click', '.letter', event => {
    $(event.target).removeClass('letter')
    $(event.target).addClass('highlight')
  });



  // push selected letter into letter 'bank'
  $('.alphabet').on('click', '.letter', event => {
    let rightCount = 0

    for (i = 0; i < mysteryWord.length; i++) {
      if ((($(`.correct:eq(${i})`).html()).toUpperCase()) == event.target.innerHTML) {
        // writes the correctly guessed letter onto the page
        $(`.correct:eq(${i})`).removeClass('hide')

        console.log(`wrong: ${wrongCount}`)
        rightCount = rightCount + 1
        winCount = winCount + 1
        console.log(`rightCount: ${rightCount}`)
        console.log(`winCount: ${winCount}`)

      } else if (i == ((mysteryWord.length)-1) && rightCount == 0){
        wrongCount = wrongCount + 1
        console.log(`wrong: ${wrongCount}`)
      }
    }
    // else if ((wordArray[i].toUpperCase()) !== event.target.innerHTML){
    //   bank.push(event.target.innerHTML.slice(0, -1))
    //   console.log(`bank: ${bank}`)
    // }


    if (winCount == mysteryWord.length) {
      $(".win").toggleClass(`hide`);
      cheer().play();
      setTimeout(()=>{
        alert("Congratulations! YOU WIN!!!")
        location.reload();
      }, (100));
    }

    let gallows = document.querySelector('#gallows');
    if (wrongCount == 1) {
      gallows.setAttribute('src', './assets/gallows+head.jpg');
    } else if (wrongCount == 2) {
      gallows.setAttribute('src', './assets/gallows+head+torso.jpg')
    } else if (wrongCount == 3) {
      gallows.setAttribute('src', './assets/gallows+head+torso+leg.jpg')
    } else if (wrongCount == 4) {
      gallows.setAttribute('src', './assets/gallows+head+torso+2leg.jpg')
    } else if (wrongCount == 5) {
      gallows.setAttribute('src', './assets/gallows+head+torso+2leg+arm.jpg')
    } else if (wrongCount == 6) {
      gallows.setAttribute('src', './assets/gallows+head+torso+2leg+2arm.jpg')
      $(".lose").toggleClass(`hide`);
      $(`.correct`).removeClass('hide')
      slam().play();

      setTimeout(()=>{
        alert("Better luck next time..")
        location.reload();
      }, (100));

    }
  });

  // generate appropriate # of spaces for the mystery word
  for (i = 0; i < mysteryWord.length; i++) {
    $(".spaces").append(`<div class="blanks"><p class="correct hide" >${wordArray[i]}</p></div>`);
  }
})
