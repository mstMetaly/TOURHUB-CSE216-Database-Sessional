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




/*comment-- part
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const commentsContainer = document.getElementById("comments");
  const viewMoreButton = document.getElementById("view-more-button");
  let commentCounter = 0;

  // Simulated comments data
  const commentsData = [
    "hello",
    "Hi",
    // ... Add more comments as needed ...
  ];

  function displayComments(startIndex) {
    const endIndex = startIndex + 1; // Display 2 comments at a time
    for (let i = startIndex; i < endIndex && i < commentsData.length; i++) {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentElement.innerHTML = `<p>${commentsData[i]}</p>`;
    }
  }

  viewMoreButton.addEventListener("click", function () {
    //const startIndex = commentCounter * 1;
    if (commentCounter >= commentsData.length) {
      viewMoreButton.style.display = "no more comments";
    } // Display 2 comments at a time
    //displayComments(startIndex);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const commentText = commentInput.value.trim();
    if (commentText !== "") {
      commentsData.push(commentText);
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentElement.innerHTML = `<p>${commentText}</p>`;
      commentsContainer.appendChild(commentElement);
      commentsContainer.appendChild(viewMoreButton);
      commentCounter++;
      // Clear the comment input field
      commentInput.value = "";
    }
  });
  //displayComments(0);
  const initialEndIndex = 0; // Display initial 2 comments or all available comments
  displayComments(0, initialEndIndex);
});
*/

// comment-script.js
/*
document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const commentsContainer = document.getElementById("comments");

  commentForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const commentText = commentInput.value.trim();
      if (commentText) {
          const username = "User"; // Replace with the actual username
          const profilePicture = "myself.jpg"; // Replace with the actual profile picture URL
          addComment(username, profilePicture, commentText);
          commentInput.value = "";
      }
  });

  function addComment(username, profilePicture, text) {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");

      const profilePictureElement = document.createElement("img");
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

      commentElement.appendChild(profilePictureElement);
      commentElement.appendChild(commentContent);

      commentsContainer.appendChild(commentElement);
  }
});
*/

document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const imageUpload = document.getElementById("image-upload"); // Add this line
  const commentsContainer = document.getElementById("comments");

  commentForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const commentText = commentInput.value.trim();
      const imageFile = imageUpload.files[0]; // Get the selected image file
      if (commentText || imageFile) {
          const username = "User"; // Replace with the actual username
          const profilePicture = "myself.jpg"; // Replace with the actual profile picture URL
          addComment(username, profilePicture, commentText, imageFile); // Add imageFile parameter
          commentInput.value = "";
          imageUpload.value = ""; // Clear the file input
      }
  });

  function addComment(username, profilePicture, text, imageFile) {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");

      const profilePictureElement = document.createElement("img");
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
          commentImageElement.src = URL.createObjectURL(imageFile);
          commentImageElement.classList.add("comment-image");
          commentContent.appendChild(commentImageElement);
      }

      commentElement.appendChild(profilePictureElement);
      commentElement.appendChild(commentContent);

      commentsContainer.appendChild(commentElement);
  }
});


