const boxContainer = document.querySelector(".box-container");
const box = document.querySelectorAll(".box");
// event bubbling
console.log(document.querySelectorAll(".box"));
const boxArray = [];
boxContainer.addEventListener("click", (event) => {
  console.log(event.target.dataset.index);
  let index = event.target.dataset.index;
  console.log(boxArray.includes(index));
  if (index !== undefined && !boxArray.includes(index)) {
    boxArray.push(event.target.dataset.index);
    box[index - 1].classList.add("green-color"); //index-1 because we have started data-index form 1 onwards, 1,2,3,4,5,6,7
  }
  if (boxArray.length == 7) {
    let count = 0;
    while (boxArray.length > 0) {
      count++;
      let idx = boxArray.shift();

      setTimeout(() => {
        box[idx - 1].classList.remove("green-color");
      }, count * 1000);
    }
  }
  console.log(boxArray);
});
