
   /*document.addEventListener("DOMContentLoaded", function () {

    
    const expandFormButton = document.querySelector(".expand-form-button");
    const updateForm = document.querySelector("#update-profile-form");
  
    expandFormButton.addEventListener("click", function () {
      updateForm.classList.toggle("hidden-form");
    });


    const profileImage = document.getElementById("profile-image");
    const changePictureButton = document.getElementById("change-picture-button");
    const pictureInput = document.getElementById("profile-picture-input");
    
    // Trigger file input click when "Change Picture" button is clicked
    changePictureButton.addEventListener("click", function () {
      pictureInput.click();
    });
  
    // Handle file selection
    pictureInput.addEventListener("change", function (event) {
      const selectedImage = event.target.files[0];
      if (selectedImage) {
        profileImage.src = URL.createObjectURL(selectedImage);
      }
    });
    
    // ... (other script code) ...
  });
  */


 async function fetchMyProfile()
 {
    const response = await fetch('/fetchMyProfile');
    const result = await response.json();

    const imageDiv = document.getElementById("profile-picture");
    imageDiv.innerHTML = `<img src="${result.IMAGE_URL}" alt="" />`;
    const profileInfoDiv = document.getElementById("profile-info");

    profileInfoDiv.innerHTML=
    `<p>user_name : ${result.USER_NAME} </p>
    <p>gmail: ${result.GMAIL}</p>
    <p>NID : ${result.NID}</p>
    <p>Gender : ${result.GENDER}</p>
    <p>Nationality: ${result.NATIONALITY}</p>
    <p>Address: ${result.ADDRESS}</p>
    `;
    
 };

 fetchMyProfile();


