const inputs = document.getElementById("inputs");

inputs.addEventListener("input", function (e) {
  let val = e.target.value;

  if (val !== "") {
    const next = e.target.nextElementSibling;
    if (next) {
      console.log(focus());
      next.focus();
    }
  }
});
inputs.addEventListener("keyup", function (e) {
  console.log(e.key); //prints the key
  const key = e.key.toLowerCase();
  if (key === "backspace" || key === "delete") {
    e.target.value = "";
    const prev = e.target.previousElementSibling;
    if (prev) {
      prev.focus();
    }
  }
});
