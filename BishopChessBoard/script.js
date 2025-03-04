const table = document.getElementById("table");

for (let i = 0; i < 8; i++) {
  let tr = document.createElement("tr");
  let white = i % 2 === 0 ? true : false;
  for (let j = 0; j < 8; j++) {
    let td = document.createElement("td");
    if (white) {
      //even row or column then color with white
      td.setAttribute("class", "box white");
    } else {
      td.setAttribute("class", "box black");
    }
    white = !white;
    td.setAttribute("data-index", `${i}-${j}`); //give a specific value to each cell in order to determine the cell in future
    tr.appendChild(td);
  }
  table.appendChild(tr);
}

table.addEventListener("mouseover", function (e) {
  // split will give array of characters, convert the values into number
  let temp = e.target.dataset.index.split("-").map((val) => parseInt(val));
  let row = temp[0];
  let col = temp[1];
  let currCell = `${row}-${col}`;
  let hash = {};
  hash[currCell] = true;
  hash = topLeft(row, col, hash);
  hash = topRight(row, col, hash);
  hash = bottomLeft(row, col, hash);
  hash = bottomRight(row, col, hash);
  //acces all the cells
  let cells = document.querySelectorAll("td");
  console.log("cells", cells);
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("blue");
  }
  for (let i = 0; i < cells.length; i++) {
    //go through each cell find the row and column , check whether that row column is present in hash or not, if present then colour it with blue
    let str = `${cells[i].closest("tr").rowIndex}-${cells[i].cellIndex}`;
    console.log(cells[i].closest("tr")); //tr has rowIndex
    console.log(cells[i].cellIndex); //td has only cellIndex
    if (hash[str]) {
      cells[i].classList.add("blue");
    }
  }
});

table.addEventListener("mouseleave", function (e) {
  const cells = document.querySelectorAll("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("blue");
  }
});
function topLeft(row, col, hash) {
  row--;
  col--;
  while (row >= 0 && col >= 0) {
    let key = `${row}-${col}`;
    hash[key] = true;
    row--;
    col--;
  }
  return hash;
}
function topRight(row, col, hash) {
  row--;
  col++;
  while (row >= 0 && col < 8) {
    let key = `${row}-${col}`;
    hash[key] = true;
    row--;
    col++;
  }
  return hash;
}
function bottomLeft(row, col, hash) {
  row++;
  col--;
  while (row < 8 && col >= 0) {
    let key = `${row}-${col}`;
    hash[key] = true;
    row++;
    col--;
  }
  return hash;
}
function bottomRight(row, col, hash) {
  row++;
  col++;
  while (row < 8 && col < 8) {
    let key = `${row}-${col}`;
    hash[key] = true;
    row++;
    col++;
  }
  return hash;
}
// closest("tr") method returns the nearest <tr> (row) element to the current cell (cells[i]).
// rowIndex gives the index of the row (0-based).
// cellIndex gives the index of the cell within the row (also 0-based).

// let hash = {
//     "0-0": true,  // Example: row 0, column 0 is in the hash
//     "1-2": true,  // Example: row 1, column 2 is in the hash
//     // Add other row-column pairs here as needed
//   };
