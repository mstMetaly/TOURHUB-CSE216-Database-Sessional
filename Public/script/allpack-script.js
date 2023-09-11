async function fetchSeeAllPackages() {
  const response = await fetch('/fetchSeeAllPackages');
  const result = await response.json();

  const packListDiv = document.getElementById("tour-list");

  result.forEach(pack => {
      const packCard = document.createElement('div');
      packCard.classList.add('pack-card');
      packCard.innerHTML = `
            <h3>${pack.TOUR_ID}</h3>
            <h3>${pack.TOUR_NAME}</h3>
            <p>Price: $${pack.PRICE}</p>
            <p>Duration: ${pack.TOTALDAY}</p>
            <p>Start Date: ${pack.STARTDATE}</p>
            <p>End Date: ${pack.ENDDATE}</p>
            <div class="btn-container">
              <button class="update-btn" data-tour-id="${pack.TOUR_ID}">Update</button>
              <button class="delete-btn" data-tour-id="${pack.TOUR_ID}">Delete</button>
            </div>
          `;
      packListDiv.appendChild(packCard);

      // Add click event listener to delete buttons
      const deleteButton = packCard.querySelector('.delete-btn');
      deleteButton.addEventListener('click', async () => {
          const tourId = deleteButton.getAttribute('data-tour-id');
          const confirmDelete = confirm('Are you sure you want to delete this package?');
          
          if (confirmDelete) {
              try {
                  const deleteResponse = await fetch(`/deletePackage/${tourId}`, {
                      method: 'DELETE',
                  });

                  if (deleteResponse.ok) {
                      // Delete was successful, you can update the UI as needed.
                      packCard.remove(); // Remove the card from the UI.
                      alert('Package deleted successfully.');
                  } else {
                      alert('Failed to delete the package.');
                  }
              } catch (error) {
                  console.error('Error deleting package:', error);
              }
          }
      });


      const updateButton = packCard.querySelector('.update-btn');
      updateButton.addEventListener('click', async () => {
        const tourId = updateButton.getAttribute('data-tour-id');
        window.location.href = `/updatePackage/${tourId}`; 
      });


  });
}

fetchSeeAllPackages();

