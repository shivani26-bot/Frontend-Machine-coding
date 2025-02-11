(function () {
  const hour = document.querySelector(".hour");
  const minute = document.querySelector(".minute");
  const second = document.querySelector(".second");

  const startBtn = document.querySelector(".start");
  const pauseBtn = document.querySelector(".pause");
  const resetBtn = document.querySelector(".reset");

  //   when we click on the start button the countdown timer should start,
  //   check if all the input fields are 0 then return
  startBtn.addEventListener("click", function () {
    console.log("clicked");
    if (hour.value == 0 && minute.value == 0 && second.value == 0) return;
    function startInterval() {
      startBtn.style.display = "none";
      //   The initial value of display depends on the element. For most elements, the initial value is inline. For certain elements like div, the initial value is block.
      // "initial" sets a property to its initial value as defined by the CSS specification.

      pauseBtn.style.display = "initial";
      countdownTimer = setInterval(() => {
        timer();
      }, 1000);
    }
    startInterval();
  });
  function timer() {
    if (second.value > 60) {
      console.log(minute.value);
      minute.value = parseInt(minute.value) + 1;

      second.value = parseInt(second.value) - 59;
    }
    if (minute.value > 60) {
      hour.value = parseInt(hour.value) + 1;
      minute.value = parseInt(minute.value) - 60;
    }
    if (hour.value == 0 && minute.value == 0 && second.value == 0) {
      hour.value = "";
      minute.value = "";
      second.value = "";
    } else if (second.value != 0) {
      second.value = `${second.value <= 10 ? "0" : ""}${second.value - 1}`;
    } else if (second.value == 0 && minute.value != 0) {
      second.value = 59;
      minute.value = `${minute.value <= 10 ? "0" : ""}${minute.value - 1}`;
    } else if (minute.value == 0 && hour.value != 0) {
      minute.value = 60;
      hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`;
    }
  }
  let countdownTimer = null;
  function pauseInterval(state) {
    startBtn.innerHTML = state === "pause" ? "Continue" : "Start";
    startBtn.style.display = "initial";
    pauseBtn.style.display = "none";
    clearInterval(countdownTimer);
  }
  pauseBtn.addEventListener("click", function () {
    console.log("paused click");
    pauseInterval("pause");
  });

  resetBtn.addEventListener("click", function () {
    hour.value = "";
    second.value = "";
    minute.value = "";
    pauseInterval();
  });
})();


// clearInterval
// To stop the interval set by setInterval, you use clearInterval and pass the interval ID returned by setInterval.
