// const box = document.querySelectorAll(".box");

// document.addEventListener("DOMContentLoaded", function (event) {
//   console.log(box);
//   for (let i = 0; i < box.length; i++) {
//     console.log(box[i]);
//     console.log(box[i].dataset.index);
//     const boxId = box[i].dataset.index;
//     if (boxId % 2 === 0) box[i].style.backgroundColor = "#c0dd11";
//     else box[i].style.backgroundColor = "#73af1a";
//   }
// });

const gameContainer = document.getElementById("game-container");
const reset = document.getElementById("reset-btn");
let hash = {};
let chance = true;
let allFilled = 0;
gameContainer.addEventListener("click", function (e) {
  console.log(e.target);
  console.log(e.target.dataset.index);

  if (e.target.dataset.index) {
    const array = e.target.dataset.index.split("-").map((val) => parseInt(val));
    const [row, col] = array;
    console.log(row, col);
    //if cell is not filled with either x or o then only we will fill it with x or o
    if (!hash[e.target.dataset.index]) {
      // we can fill x and o in alternating fashion
      if (chance) {
        hash[e.target.dataset.index] = "X";
        e.target.classList.add("cell-withX");
      } else {
        hash[e.target.dataset.index] = "O";
        e.target.classList.add("cell-withO");
      }
      chance = !chance;

      //at every click on the cell find who wins
      allFilled++;
      let result = checkWin();
      if (allFilled === 9 || result.includes("Win")) {
        document.getElementById("result").textContent = result;
        //once won the game , mouse activity on cells should be disabled,
        gameContainer.style.pointerEvents = "none";
      }
    }
    console.log(allFilled);
  }
});

function checkWin() {
  //if all the cell in any of the 8 direction are filled then it's considered as win
  // horizontal any of the three rows
  // vertical any of the three columns
  // any of the 2 diagonals
  //row
  for (let i = 0; i < 3; i++) {
    let set = new Set();
    let player = "";
    for (let j = 0; j < 3; j++) {
      let key = `${i}-${j}`;
      set.add(hash[key]);
      player = hash[key];
    }
    if (set.size === 1 && player) {
      return `Player ${player} Win`;
    }
  }

  //column
  for (let j = 0; j < 3; j++) {
    let set = new Set();
    let player = "";
    for (let i = 0; i < 3; i++) {
      let key = `${i}-${j}`;
      set.add(hash[key]);
      player = hash[key];
    }
    if (set.size === 1 && player) {
      return `Player ${player} Win`;
    }
  }
  //diagonal
  let i = 0,
    j = 0;
  let set = new Set();
  let player = "";
  while (i < 3 && j < 3) {
    let key = `${i}-${j}`;
    set.add(hash[key]);
    player = hash[key];
    i++;
    j++;
  }
  if (set.size == 1 && player) {
    return `Player ${player} Win`;
  }

  //antidiagonal
  (i = 0), (j = 2);
  set.clear();
  while (i < 3 && j >= 0) {
    let key = `${i}-${j}`;
    set.add(hash[key]);
    player = hash[key];
    i++;
    j--;
  }
  if (set.size == 1 && player) {
    return `Player ${player} Win`;
  }

  return "Match Draw";
}

reset.addEventListener("click", function (e) {
  const boxes = document.querySelectorAll(".box");
  //reset everything
  boxes.forEach((box) => {
    if (box.classList.contains("cell-withX")) {
      box.classList.remove("cell-withX");
    } else {
      box.classList.remove("cell-withO");
    }
  });
  hash = {};
  allFilled = 0;
  chance = true;
  document.getElementById("result").textContent = "";
  gameContainer.style.pointerEvents = "auto";
});
