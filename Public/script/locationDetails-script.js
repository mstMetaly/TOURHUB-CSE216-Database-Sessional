// Get a reference to the description and comment elements

const descriptionElement = document.getElementById("location-description");
const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");
const imageList = document.getElementById("image-container");


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

}

// Fetch and display comments
async function fetchComments(locationId) {

  const response = await fetch(`/comments/${locationId}`);
  const comments = await response.json();

  console.log("fetchhhhhhhh comments:",comments);

  comments.forEach(comment => {
    addComment(comment.USER_NAME, comment.PROFILE_PICTURE, comment.COMMENT_TEXT, comment.IMAGE);
  });
}


//for sliding

// locationDetails-script.js


document.addEventListener("DOMContentLoaded", function () {

  const slider = document.querySelector(".image-slider");
  const slides = Array.from(document.querySelectorAll(".image-slide"));
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  let currentIndex = 0;

  function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function showSlide(index) {
    currentIndex = index;
    updateSliderPosition();
  }

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSliderPosition();
    }
  });

  updateSliderPosition();
});


// Fetch description and comments when the page loads
fetchDescription(locationId);
fetchComments(locationId);


async function addComment(username, profilePicture, text, imageFile) {

    
  const commentsContainer = document.getElementById("comment-container");
  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");

  const profilePictureElement = document.createElement("img");
  //profile picture add korte hobe
  profilePictureElement.src = profilePicture;
  profilePictureElement.classList.add("profile-picture");

  const commentContent = document.createElement("div");
  commentContent.classList.add("comment-content");

  const usernameElement = document.createElement("strong");
  usernameElement.textContent = username;

  const commentTextElement = document.createElement("p");
  commentTextElement.classList.add("comment-text");
  commentTextElement.textContent = text;

  commentContent.appendChild(usernameElement);
  commentContent.appendChild(commentTextElement);

  if (imageFile) {
    const commentImageElement = document.createElement("img");
    commentImageElement.src = imageFile; // Set the source directly to the imageFile path
    commentImageElement.classList.add("comment-image");
    commentContent.appendChild(commentImageElement);
}


  commentElement.appendChild(profilePictureElement);
  commentElement.appendChild(commentContent);

  //commentsContainer.appendChild(commentElement);
  commentList.appendChild(commentElement);
}