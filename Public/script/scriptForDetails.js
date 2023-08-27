//script for packageDetails.ejs file

async function fetchLocations()
{
    const response = await fetch('/location');
    const locations = await response.json();

    locations.forEach(location => {
        const locationList = document.getElementById("package-details");
        const locationDiv = document.createElement('div');
        locationDiv.classList.add('box');

        locationDiv.innerHTML = 
    `<img src="/sundarban.jpeg" alt="" />
    <div class="content">
      <h3><i class="fas fa-map-markar-alt"></i>"${location.LOCATION_NAME}"</h3>
        <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>

      <p>"${location.LOCATION_DESCRIPTION}" </p>
      
    </div>
  `;

        locationList.appendChild(locationDiv);
    });


}

fetchLocations();
