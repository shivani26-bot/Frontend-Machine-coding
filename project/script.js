let captions = [];
let videoElement = document.getElementById("video");
let captionText = document.getElementById("captionText");
let timestampInput = document.getElementById("timestamp");
let videoUrlInput = document.getElementById("videoUrl");
let videoSource = document.getElementById("videoSource");
let loadVideoButton = document.getElementById("loadVideo");
let addCaptionButton = document.getElementById("addCaption");
let captionsDisplay = document.getElementById("captionsDisplay");

// Load video when user enters a URL
loadVideoButton.addEventListener("click", () => {
  const videoUrl = videoUrlInput.value;
  if (videoUrl) {
    videoSource.src = videoUrl;
    videoElement.load();
  } else {
    alert("Please enter a valid video URL.");
  }
});

// Add a new caption with a timestamp
addCaptionButton.addEventListener("click", () => {
  const caption = captionText.value;
  const timestamp = parseFloat(timestampInput.value);

  if (caption && !isNaN(timestamp)) {
    // Store caption with timestamp
    captions.push({ text: caption, timestamp: timestamp });

    // Display all captions in a list
    updateCaptionDisplay();

    // Clear the input fields
    captionText.value = "";
    timestampInput.value = "";
  } else {
    alert("Please enter both caption text and timestamp.");
  }
});

// Function to update captions display
function updateCaptionDisplay() {
  captionsDisplay.innerHTML = "";
  captions.forEach((caption, index) => {
    const captionElement = document.createElement("p");
    captionElement.innerText = `Timestamp: ${caption.timestamp}s - ${caption.text}`;
    captionsDisplay.appendChild(captionElement);
  });
}

// Display captions at the correct time
videoElement.addEventListener("timeupdate", () => {
  let currentTime = videoElement.currentTime;
  let currentCaption = captions.find(
    (caption) => Math.abs(caption.timestamp - currentTime) < 0.5
  );

  if (currentCaption) {
    captionsDisplay.innerHTML = currentCaption.text;
  } else {
    captionsDisplay.innerHTML = "";
  }
});

// Optional: Play/Pause video when clicked
videoElement.addEventListener("click", () => {
  if (videoElement.paused) {
    videoElement.play();
  } else {
    videoElement.pause();
  }
});
