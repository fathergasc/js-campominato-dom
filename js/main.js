let containerDom = document.getElementById("container");
let playButton = document.getElementById("play");
let playerScore = 0;
let bombBoxes = [];
let gameOver = false;

playButton.addEventListener(
  "click",
  function () {
    containerDom.innerHTML = "";
    let difficulty = document.getElementById("difficulty").value;
    console.log("difficulty: ", typeof difficulty);
    let difficultyN = parseInt(difficulty);
    console.log("difficultyN: ", typeof difficultyN);

    initializeGame(difficultyN);
  }
  //  { once: true } non più necessario perché containerDom.innerHTML = "" resetta il contenuto
);

function initializeGame(number) {
  gameOver = false;
  let bombNumbers = [];
  playerScore = 0;
  score.innerHTML = "Il tuo punteggio: " + playerScore;
  console.log("bombNumbers: ", bombNumbers);
  for (let i = 0; i < 16; i++) {
    let randomNumber = uniqueRandomNumber(bombNumbers, 1, number);
    bombNumbers.push(randomNumber);
  }

  for (let i = 1; i <= number; i++) {
    let addBox = document.createElement("div");
    addBox.className = "box";
    if (difficulty.value == "81") {
      addBox.classList.add("box9");
    } else if (difficulty.value == "49") {
      addBox.classList.add("box7");
    } else if (difficulty.value == "100") {
      addBox.classList.add("box10");
    }
    containerDom.append(addBox);
    addBox.append(i);

    if (bombNumbers.includes(i)) {
      bombBoxes.push(addBox);
    }

    addBox.addEventListener("click", function () {
      if (gameOver == false) {
        if (bombNumbers.includes(i)) {
          showBombs();
          gameOver = true;
          alert(`Hai perso con un punteggio di ${playerScore}`);
        } else {
          addBox.classList.toggle("active");
          let score = document.getElementById("score");
          playerScore++;
          score.innerHTML = "Il tuo punteggio: " + playerScore;
        }
      } else {
        alert("Per iniziare una nuova partita, clicca su \"gioca\" o aggiorna la pagina")
      }
    });
  }
}

function showBombs() {
  for (let i = 0; i < bombBoxes.length; i++) {
    bombBoxes[i].classList.add("bomb");
    bombBoxes[i].innerHTML = "💣";
    //bombBoxes[i].textContent = "💣";    - metodo alternativo
  }
}

function uniqueRandomNumber(array, min, max) {
  let validNumber = false;
  let generatedNumber;
  while (!validNumber) {
    generatedNumber = getRandomNumber(min, max);
    if (!array.includes(generatedNumber)) {
      validNumber = true;
    }
  }
  return generatedNumber;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
