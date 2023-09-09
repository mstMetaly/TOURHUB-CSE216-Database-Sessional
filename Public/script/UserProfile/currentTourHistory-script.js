
 //fetch previous tour history 
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
  