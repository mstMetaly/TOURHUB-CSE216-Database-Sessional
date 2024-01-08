
 //fetch previous tour history 
 /*
 async function fetchCurrentTourHistory()
 {
    const response = await fetch('/fetchCurrentTourHistory');
    const tours = await response.json();

   console.log("tours in previous tour history:",tours);

    tours.forEach(tour =>{
    const tourList = document.getElementById("current-tour");

    const tourDiv = document.createElement('div');
    tourDiv.classList.add('box');

    //adding image src
    const imageSrc = `/${tour.IMAGE_URL}`;

    tourDiv.innerHTML = 
    `<img src="${imageSrc}" alt="" />
    <div class="content">
      <h3><i class="fas fa-map-markar-alt"></i>"${tour.TOUR_NAME}"</h3>
        <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>

      <div class="price $">"${tour.PRICE}"<span>$120.00</span></div>
      <h2>Start Date: ${tour.STARTDATE}</h2>
      <h2>End Date: ${tour.ENDDATE}</h2>
      <a href="/cancelRequest/${tour.BOOKING_ID}" class="btn">Cancel</a>
      
    </div>
  `;
   tourList.appendChild(tourDiv);

  });
   
 }

 fetchCurrentTourHistory();
  */
 //First half ended//



 // Function to create a confirmation dialog
function showConfirmationDialog() {
  return new Promise((resolve) => {
    const confirmation = confirm("Are you sure you want to cancel this tour?");
    resolve(confirmation);
  });
}

// Function to send a cancel request and update UI
// Function to send a cancel request and update UI
/*
async function handleCancelRequest(bookingId, cancelButton) {
  const confirmation = await showConfirmationDialog();

  if (confirmation) {
    if (cancelButton.classList.contains("sent")) {
      // If the request has already been sent, show a message
      alert("The cancel request has already been sent.");
    } else {
      // Show that the request is being sent
      cancelButton.textContent = "Sending Request...";
      cancelButton.classList.add("disabled");

      // Send the actual cancel request to your endpoint here
      try {
        const response = await fetch(`/cancelRequest/${bookingId}`, {
          method: 'GET', // or 'DELETE' or 'PUT' depending on your route
        });

        if (response.ok) {
          // Update the UI to indicate the request has been sent
          cancelButton.textContent = "Request Sent";
          cancelButton.classList.remove("disabled");
          cancelButton.classList.add("sent");
        } else {
          // Handle the case where the cancel request failed
          alert("Failed to send cancel request.");
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Error sending cancel request:", error);
        alert("An error occurred while sending the cancel request.");
      }
    }
  }
}
*/

// Attach click event listeners to cancel buttons
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("cancel-button")) {
    const bookingId = event.target.getAttribute("data-booking-id");
    const cancelButton = event.target;

    handleCancelRequest(bookingId, cancelButton);
  }
});
/*
// Fetch and display tour history
async function fetchCurrentTourHistory() {
  const response = await fetch('/fetchCurrentTourHistory');
  const tours = await response.json();

  console.log("Tours in previous tour history:", tours);

  const tourList = document.getElementById("current-tour");

  tours.forEach((tour) => {
    const tourDiv = document.createElement('div');
    tourDiv.classList.add('box');

    const imageSrc = `/${tour.IMAGE_URL}`;

    tourDiv.innerHTML = `
      <img src="${imageSrc}" alt="" />
      <div class="content">
        <h3><i class="fas fa-map-markar-alt"></i>"${tour.TOUR_NAME}"</h3>
        <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <div class="price $">"${tour.PRICE}"<span>$120.00</span></div>
        <h2>Start Date: ${tour.STARTDATE}</h2>
        <h2>End Date: ${tour.ENDDATE}</h2>
        <button data-booking-id="${tour.BOOKING_ID}" class="btn cancel-button">Cancel</button>
      </div>
    `;

    tourList.appendChild(tourDiv);
  });
}

fetchCurrentTourHistory();*/


////New code for correcting code
async function markBookingAsCanceled(bookingId) {
  try {
    const response = await fetch(`/cancelRequest/${bookingId}`, {
      method: 'GET', // or 'DELETE' or 'PUT' depending on your route
    });

    if (response.ok) {
      return true; // Successful cancellation
    }
    return false; // Cancellation failed
  } catch (error) {
    console.error("Error marking booking as canceled:", error);
    return false; // Cancellation failed due to an error
  }
}


async function handleCancelRequest(bookingId, cancelButton) {
  const confirmation = await showConfirmationDialog();

  if (confirmation) {
    if (cancelButton.classList.contains("sent")) {
      // If the request has already been sent, show a message
      alert("The cancel request has already been sent.");
    } else {
      // Show that the request is being sent
      cancelButton.textContent = "Sending Request...";
      cancelButton.classList.add("disabled");

      // Send the actual cancel request and update the database
      const isCanceled = await markBookingAsCanceled(bookingId);

      if (isCanceled) {
        // Update the UI to indicate the request has been sent
        cancelButton.textContent = "Request Sent";
        cancelButton.classList.remove("disabled");
        cancelButton.classList.add("sent");
      } else {
        // Handle the case where the cancel request failed
        alert("Failed to send cancel request.");
        // Reset the button to its initial state
        cancelButton.textContent = "Cancel";
        cancelButton.classList.remove("disabled");
        cancelButton.classList.remove("sent");
      }
    }
  }
}

// Fetch and display tour history
async function fetchCurrentTourHistory() {
  const response = await fetch('/fetchCurrentTourHistory');
  const tours = await response.json();

  const tourList = document.getElementById("current-tour");

  tours.forEach((tour) => {
    const tourDiv = document.createElement('div');
    tourDiv.classList.add('box');
    const imageSrc = `/${tour.IMAGE_URL}`;

    // Check the cancellation status to determine the button text
    const isCanceled = tour.CANCEL_STATUS === 1;

    tourDiv.innerHTML = `
      <!-- Other tour information -->
      <img src="${imageSrc}" alt="" />
      <div class="content">
        <h3><i class="fas fa-map-markar-alt"></i>"${tour.TOUR_NAME}"</h3>
        <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <div class="price $">"${tour.PRICE}"<span>$120.00</span></div>
        <h2>Start Date: ${tour.STARTDATE}</h2>
        <h2>End Date: ${tour.ENDDATE}</h2>

      <button data-booking-id="${tour.BOOKING_ID}" class="btn cancel-button ${
        isCanceled ? "sent" : ""
      }">${isCanceled ? "Request Sent" : "Cancel"}</button>
    `;

    tourList.appendChild(tourDiv);
  });
}

fetchCurrentTourHistory();

