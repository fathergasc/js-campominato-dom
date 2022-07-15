const containerDom = document.getElementById("container");
const playButton = document.getElementById("play");
const numberMines = 16;
let playerScore = 0;
let bombBoxes = [];
let gameOver = false;
let winScore = 0;
const alert = document.getElementById("alert");
const scoreDom = document.getElementById("score");

playButton.addEventListener(
  "click",
  function () {
    scoreDom.style.visibility = "visible";
    containerDom.innerHTML = "";
    alert.innerHTML = "";
    alert.style.visibility = "hidden";
    const difficulty = document.getElementById("difficulty").value;
    console.log("difficulty: ", typeof difficulty);
    let difficultyN = parseInt(difficulty);
    console.log("difficultyN: ", typeof difficultyN);

    initializeGame(difficultyN);
  }
  //  { once: true } non più necessario perché containerDom.innerHTML = "" resetta il contenuto
);

/* initializeGame resets the game to a blank state, resetting let gameOver, the player score and establishing the new winning score depending on the difficulty selected.
The function play a sound when you get the game over or victory alert. */

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
  for (let i = 0; i < numberMines; i++) {            //generate random numbers for the bombs
    let randomNumber = uniqueRandomNumber(bombNumbers, 1, boardSize);
    bombNumbers.push(randomNumber);
  }

  for (let i = 1; i <= boardSize; i++) {          //generate the boxes with the appropriate width and height of the boxes to keep the game board square
    let addBox = document.createElement("div");
    addBox.className = "box";
    if (boardSize == 81) {
      addBox.classList.add("box9");
    } else if (boardSize == 49) {
      addBox.classList.add("box7");
    } else if (boardSize == 100) {
      addBox.classList.add("box10");
    }
    containerDom.append(addBox);               //add the box to the container
    addBox.append(i);                   //add the number to the box

    if (bombNumbers.includes(i)) {       //if i is included in the array bombNumbers, add it to the bombBoxes array to keep track of the positions of the bombs
      bombBoxes.push(addBox);
    }


    /* the following code is to add the event listener to the boxes. 
    IF gameOver is false:
     - IF you click on a box containing a bomb, it recalls showBombs(), changes gameOver to true and you get the game over alert and score. 
     - ELSE 
        - IF you click on a safe box, it checks if it doesn't have the class "active" and it adds a point to the score in that case to prevent to add points to the score in case you click multiple times on the same box. 
        After this check, it adds the "active" class to the boxes and updates the score in the HTML. 
        IF the player score is equal to winScore, defined by the number of total boxes, difficultyN, minus the number of mines, declared in numberMines, gameOver changes to true, you get the victory sound and the victory alert. 
    ELSE !gameOver == false and you get an alert to start a new game, preventing to click on the boxes after the end of the match.*/
    
    addBox.addEventListener("click", function () { 
      if (gameOver == false) {
        if (bombNumbers.includes(i)) {
          showBombs();
          gameOver = true;
          alert.innerHTML = `Hai perso con un punteggio di ${playerScore}`;
          alert.style.visibility = "visible";
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
            alert.innerHTML = "Hai vinto!";
            alert.style.visibility = "visible";
          }
        }
      } else {
        alert.innerHTML = `Per iniziare una nuova partita, clicca su "gioca" o aggiorna la pagina`;
        alert.style.visibility = "visible";
      }
    });
  }
}


/* makes all the bombs show up when one of the boxes whose i is inside the bombBoxes[]. It adds the "bomb" class and adds a bomb emoji in the HTML. Then plays the bomb sfx*/
function showBombs() {
  for (let i = 0; i < bombBoxes.length; i++) {
    bombBoxes[i].classList.add("bomb");
    bombBoxes[i].innerHTML = "💣";
    //bombBoxes[i].textContent = "💣";    - metodo alternativo
  }
  document.getElementById("sfxBoom").play();
}

// returns a random unique number between min and max
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

// returns a random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
