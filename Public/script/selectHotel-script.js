//script for packageDetails.ejs file

async function fetchHotels(tourId)
{
    //this will fetch all locations for a tour
    console.log("fetch location er moddhe tourId:",tourId);

    const response = await fetch(`/fetchHotel/${tourId}`);
    const hotels = await response.json();

    hotels.forEach(hotel => {
        const hotelList = document.getElementById("hotel-list");
        const hotelDiv = document.createElement('div');
        hotelDiv.classList.add('box');

        hotelDiv.innerHTML = 
    `<img src="/${hotel.IMAGE_URL}" alt="" />
    <div class="content">
      <h3><i class="fas fa-map-markar-alt"></i>"${hotel.HOTEL_NAME}"</h3>
      <h3><i class="fas fa-map-markar-alt"></i>"${hotel.BUDGET}"</h3>
        <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>

      <p>"${hotel.HOTEL_DETAILS}" </p>
      <a href="/SeeHotelRoom/${hotel.HOTEL_ID}" class="see-more-link">See More Details</a>
      
    </div>
  `;

        hotelList.appendChild(hotelDiv);
    });


}

fetchHotels(tourId);
