//script for packageDetails.ejs file

async function fetchOthers(tourId)
{
    //this will fetch all locations for a tour
    console.log("fetch food er moddhe tourId:",tourId);

    const response = await fetch(`/fetchOthers/${tourId}`);
    const others = await response.json();

    console.log("fetch er moddhe food:",others);

    others.forEach(other=> {
        const othersList = document.getElementById("others-list");
        const otherDiv = document.createElement('div');
        otherDiv.classList.add('box');

        otherDiv.innerHTML = 
    `<img src="" alt="" />
    <div class="content">
    <p>"${other.TRANSPORT_DETAILS}" </p>
      <h3><i class="fas fa-map-markar-alt"></i>"${other.DESCRIPTION}"</h3>
      <h3><i class="fas fa-map-markar-alt"></i>"${other.CAUTIONS}"</h3>
        <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
    </div>
  `;

        othersList.appendChild(otherDiv);
    });


}

fetchOthers(tourId);
