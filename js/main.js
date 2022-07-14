const containerDom = document.getElementById("container");
const playButton = document.getElementById("play");

playButton.addEventListener(
  "click",
  function () {
    containerDom.innerHTML = "";
    const difficulty = document.getElementById("difficulty").value;
    console.log("difficulty: ", typeof difficulty);
    const difficultyN = parseInt(difficulty);
    console.log("difficultyN: ", typeof difficultyN);

    createToggableProgressiveNumberedBoxAndBombs(difficultyN);
  }
  //  { once: true } non più necessario perché containerDom.innerHTML = "" resetta il contenuto
);

function createToggableProgressiveNumberedBoxAndBombs(number) {
  const bombNumbers = [];
  console.log("bombNumbers: ", bombNumbers);

  for (let i = 0; i < 16; i++) {
    const randomNumber = uniqueRandomNumber(bombNumbers, 1, number);
    bombNumbers.push(randomNumber);
  }

  for (let i = 1; i <= number; i++) {
    const addBox = document.createElement("div");
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

    addBox.addEventListener("click", function () {
      if (bombNumbers.includes(i)) {
        addBox.classList.toggle("bomb");
      } else {
        addBox.classList.toggle("active");
        console.log(i);
      }
    });
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
/*
function getArrayOfRandomUniqueNumbers (array){
    let randomNumber;
    for (let i = 0; i < 16; i++) {
      randomNumber = getRandomNumber(1, 100);  //////da cambiare
      if (!array.includes(randomNumber)) {
        array.push(randomNumber);   
      }
    }
    return randomNumber;
}
*/
