let randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector("#subt");
const inputNumber = document.querySelector("#guessField");
const remaining = document.querySelector(".lastResult");
const resultPara = document.querySelector(".resultParas");
const lowOrHi = document.querySelector(".lowOrHi");
const guessesSet = document.querySelector(".guesses");
let playGame = true;
const p = document.createElement("p");
let prevGuess = [];

let attemtCount = 1;

if (playGame) {
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const guessNum = parseInt(inputNumber.value);
    console.log(guessNum);
    numberValidation(guessNum);
  });
}
function numberValidation(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess > 100) {
    alert("Please enter a number less than 100 ");
  } else if (guess < 1) {
    alert("Please enter a number higher than 0 ");
  } else {
    prevGuess.push(guess);
    if (attemtCount == 10) {
      displayMessage(`Game over number was ${randomNumber}`);
      memoryUpdate(guess);
      endgame();
    } else {
      memoryUpdate(guess);
      conditionChecker(guess);
    }
  }
}

function conditionChecker(guess) {
  if (guess === randomNumber) {
    displayMessage(`Correct`);
    endgame();
  } else if (guess < randomNumber) {
    displayMessage(`Too Low`);
  } else if (guess > randomNumber) {
    displayMessage(`Too High`);
  }
}

function memoryUpdate(guess) {
  inputNumber.value = "";
  guessesSet.innerHTML += `${guess},`;
  attemtCount++;
  remaining.innerHTML = `${11 - attemtCount} `;
}

function displayMessage(message) {
  lowOrHi.innerHTML = ` <h4> ${message} </h4>`;
}

function endgame() {
  inputNumber.setAttribute("disabled", "");
  submit.setAttribute("disabled", "");
  p.classList.add("button");
  Object.assign(p.style, {
    backgroundColor: "#770505",
    padding: "15px",
    borderRadius: "10px",
  });

  p.innerHTML = " <h4 id='newgame'> Restart the game </h4> ";
  resultPara.appendChild(p);
  playGame = false;
  newGame();
}
function newGame() {
  const newGameButton = document.querySelector("#newgame");
  newGameButton.addEventListener("click", (e) => {
    randomNumber = parseInt(Math.random() * 100 + 1);
    inputNumber.removeAttribute("disabled", "");
    submit.removeAttribute("disabled", "");
    prevGuess = [];
    guessesSet.innerHTML = "";
    attemtCount = 1;
    remaining.innerHTML = "10";
    resultPara.removeChild(p);
    playGame = true;
    lowOrHi.innerHTML=''
  });
}
