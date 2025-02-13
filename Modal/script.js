const button = document.getElementById("btn");
const container = document.getElementById("container");
const modal = document.getElementById("modal");
const close = document.getElementById("close");
button.addEventListener("click", function (event) {
  modal.style.display = "block";
});
close.addEventListener("click", function (event) {
  modal.style.display = "none";
});
modal.addEventListener("click", function (event) {
  console.log(event.target);
  modal.style.display = "none";
});
