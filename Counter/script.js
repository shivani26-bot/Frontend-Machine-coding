const count = document.getElementById("count");
const inputBox = document.getElementById("inputBox");
const increment = document.getElementById("increment");
const decrement = document.getElementById("decrement");
const reset = document.getElementById("reset");

increment.addEventListener("click", (event) => {
  console.log(event);
  console.log(typeof inputBox.value);
  console.log(typeof count.innerText);
  count.innerText = Number(count.innerText) + Number(inputBox.value);
});

decrement.addEventListener("click", (event) => {
  console.log(event);
  console.log(typeof inputBox.value);
  console.log(typeof count.innerText);
  let inputValue = Number(count.innerText) - Number(inputBox.value);
  if (inputValue < 0) inputValue = 0;

  count.innerText = inputValue;
});

reset.addEventListener("click", (event) => {
  count.innerText = 0;
  //   inputBox.value = 1;
});
