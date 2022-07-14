const containerDom = document.getElementById("container");
const playButton = document.getElementById("play");
const numberMines = 16;
let playerScore = 0;
let bombBoxes = [];
let gameOver = false;
let winScore = 0;

playButton.addEventListener(
  "click",
  function () {
    containerDom.innerHTML = "";
    const difficulty = document.getElementById("difficulty").value;
    console.log("difficulty: ", typeof difficulty);
    let difficultyN = parseInt(difficulty);
    console.log("difficultyN: ", typeof difficultyN);

    initializeGame(difficultyN);
  }
  //  { once: true } non più necessario perché containerDom.innerHTML = "" resetta il contenuto
);

function initializeGame(boardSize) {
  gameOver = false;
  let bombNumbers = [];
  playerScore = 0;
  winScore = boardSize - numberMines;
  document.getElementById('sfxBoom').volume = 0.2;
  document.getElementById("sfxBoom").pause(); //to pause the audio
  document.getElementById("sfxBoom").currentTime = 0;
  document.getElementById('sfxWin').volume = 0.1;
  document.getElementById("sfxWin").pause();
  document.getElementById("sfxWin").currentTime = 0; //to rewind audio before playing it again
  console.log("winScore: ", winScore);

  score.innerHTML = "Il tuo punteggio: " + playerScore;
  console.log("bombNumbers: ", bombNumbers);
  for (let i = 0; i < numberMines; i++) {
    let randomNumber = uniqueRandomNumber(bombNumbers, 1, boardSize);
    bombNumbers.push(randomNumber);
  }

  for (let i = 1; i <= boardSize; i++) {
    let addBox = document.createElement("div");
    addBox.className = "box";
    if (boardSize == 81) {
      addBox.classList.add("box9");
    } else if (boardSize == 49) {
      addBox.classList.add("box7");
    } else if (boardSize == 100) {
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
          if (!addBox.classList.contains("active")) {
            playerScore++;
          }
          addBox.classList.add("active");
          let score = document.getElementById("score");
          score.innerHTML = "Il tuo punteggio: " + playerScore;

          if (playerScore == winScore) {
            gameOver = true;
            document.getElementById("sfxWin").play();
            alert("Hai vinto");
          }
        }
      } else {
        alert(
          'Per iniziare una nuova partita, clicca su "gioca" o aggiorna la pagina'
        );
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
  document.getElementById("sfxBoom").play();
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
