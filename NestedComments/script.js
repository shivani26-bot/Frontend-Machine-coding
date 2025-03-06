// add event bubbling on comment container, check whether reply or submit button is clicked
let commentContainer = document.getElementById("comment-container");

function createInputBox() {
  let div = document.createElement("div");
  div.setAttribute("class", "comment-details");
  div.innerHTML += `
  <input type="text" placeholder="add text here" class="input" />
  <button class="btn submit">Submit</button>`;

  return div;
}

function addReply(text) {
  let div = document.createElement("div");
  div.setAttribute("class", "all-comment");
  div.innerHTML += ` 
  <div class="card">
  <span class="text">${text}</span>
  <span class="reply">Add Reply</span>
</div>`;
  return div;
}
commentContainer.addEventListener("click", (event) => {
  console.log(event.target.classList.contains("reply"));
  let replyClicked = event.target.classList.contains("reply");
  let submitClicked = event.target.classList.contains("submit");
  let closestCard = event.target.closest(".all-comment");
  console.log("close", event.target.closest(".all-comment"));
  console.log("closest", event.target.closest(".comment-details"));
  if (replyClicked) {
    //add input box
    closestCard.appendChild(createInputBox());
  }
  if (submitClicked) {
    //add a reply card
    let commentDetails = event.target.closest(".comment-details");
    console.log(commentDetails.children[0].value); //gives the value inside the input box
    console.log(commentDetails.children); //HTMLCollection(2) [input.input, button.btn.submit]
    console.log("before", commentDetails);
    if (commentDetails.children[0].value) {
      closestCard.appendChild(addReply(commentDetails.children[0].value));
      commentDetails.remove(); //this will remove the comment details div which contains input and submit button
      console.log("after", commentDetails);
    }
  }
});
