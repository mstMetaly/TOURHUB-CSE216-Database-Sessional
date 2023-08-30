// Get a reference to the description and comment elements
const descriptionElement = document.getElementById("location-description");
const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");


// Fetch and display location description
async function fetchDescription(locationId) {
  const response = await fetch(`/locationDetails/${locationId}`);
  const locationData = await response.json();

  locationData.forEach(detail =>{
    const locationDiv = document.createElement("div");
    locationDiv.classList.add("detail");
    locationDiv.innerHTML =  `<p> ${detail.DETAILS} </p>`;
    descriptionElement.appendChild(locationDiv);
  });

  //descriptionElement.textContent = locationData.DETAILS;
}

// Fetch and display comments
async function fetchComments(locationId) {
  const response = await fetch(`/comments/${locationId}`);
  const comments = await response.json();

  console.log("fetchhhhhhhh comments:",comments);

  commentList.innerHTML = ""; // Clear existing comments

  comments.forEach(comment => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.innerHTML = `
      <p>Comment1 : ${comment.COMMENT}</p>
    `;
    commentList.appendChild(commentDiv);
  });
}

// Event listener for form submission
/*
commentForm.addEventListener("submit", async event => {
  event.preventDefault();

  const formData = new FormData(commentForm);
  const commentText = formData.get("comment");

  // Send the comment to the server
  const response = await fetch(`/comments/${locationId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: commentText })
  });

  if (response.ok) {
    // Clear the form and fetch updated comments
    commentForm.reset();
    fetchComments();
  }
});
*/

// Fetch description and comments when the page loads
fetchDescription(locationId);
fetchComments(locationId);
