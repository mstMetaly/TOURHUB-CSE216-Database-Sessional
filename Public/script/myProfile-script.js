   document.addEventListener("DOMContentLoaded", function () {

    
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
  