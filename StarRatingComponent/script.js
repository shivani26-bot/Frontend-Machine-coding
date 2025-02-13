const starIcon = document.querySelectorAll(".star-icon");

console.log(starIcon);
const starContainer = document.getElementById("star-container");

// add eventListener to starContainer, event bubbling, if we add event listener to star icon then we have to put it on every star icon
// use event bubbling concept
let filled = 0;
// starContainer.addEventListener("click", function (event) {
//   let currClicked = event.target.dataset.index;
//   //   console.log(event.target.dataset.index);
//   for (let i = 0; i < filled; i++) {
//     starIcon[i].classList.remove("star-filled");
//   }
//   for (let i = 0; i < currClicked; i++) {
//     starIcon[i].classList.add("star-filled");
//   }
//   if (currClicked !== undefined) {
//     document.getElementById("count").innerText = `Rating Count:${currClicked}`;
//   }
//   filled = currClicked;
// });

starContainer.addEventListener("mouseover", function (event) {
  let currClicked = event.target.dataset.index;
  //   console.log(event.target.dataset.index);
  for (let i = 0; i < 5; i++) {
    starIcon[i].classList.remove("star-filled");
  }
  for (let i = 0; i < currClicked; i++) {
    starIcon[i].classList.add("star-filled");
  }
  if (currClicked !== undefined) {
    document.getElementById("count").innerText = `Rating Count:${currClicked}`;
  }
  filled = currClicked;
});
