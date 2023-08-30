//script for packageDetails.ejs file

async function fetchLocations(tourId)
{
    //this will fetch all locations for a tour
    console.log("fetch location er moddhe tourId:",tourId);

    const response = await fetch(`/location/${tourId}`);
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
      <a href="/SeeMoreDetails/${location.LOCATION_ID}" class="see-more-link">See More</a>
      
    </div>
  `;

        locationList.appendChild(locationDiv);
    });


}

fetchLocations(tourId);
