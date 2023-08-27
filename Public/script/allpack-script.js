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
              <p>Price: $${pack.Price}</p>
              <p>Duration: $${pack.totalDay}</p>
              <div class="btn-container">
                <button class="update-btn">Update</button>
                <button class="delete-btn">Delete</button>
              </div>
            `;
        packListDiv.appendChild(packCard);

    });
}

fetchSeeAllPackages();

