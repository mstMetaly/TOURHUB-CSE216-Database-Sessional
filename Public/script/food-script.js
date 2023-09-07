//script for packageDetails.ejs file

async function fetchFood(tourId)
{
    //this will fetch all locations for a tour
    console.log("fetch food er moddhe tourId:",tourId);

    const response = await fetch(`/fetchFood/${tourId}`);
    const foods = await response.json();

    console.log("fetch er moddhe food:",foods);

    foods.forEach(food => {
        const foodList = document.getElementById("food-list");
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('box');

        foodDiv.innerHTML = 
    `<img src="/${food.FOOD_IMAGE}" alt="" />
    <div class="content">
      <h3><i class="fas fa-map-markar-alt"></i>"${food.FOOD_NAME}"</h3>
        <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>

      <h2>"${food.FOOD_DESCRIPTION}" </h2>
      <a href="/SeeMoreDetails/${food.FOOD_NAME}" class="see-more-link">See More</a>
      
    </div>
  `;

        foodList.appendChild(foodDiv);
    });


}

fetchFood(tourId);
