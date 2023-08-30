const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const videoBtn = document.querySelectorAll(".vid-btn");
const menu = document.querySelector("#menu-bar");
const navbar = document.querySelector(".navbar");
var tripBox = document.querySelector(".trip_bx");
var scrollThreshold = 90; // Adjust this value as needed

//packages--

// Function to check if an element is in the viewport
function isElementInViewport(element) {
  var rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}
/*
window.addEventListener("scroll", function () {
  var scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > scrollThreshold) {
    tripBox.classList.add("hidden");
  } else {
    tripBox.classList.remove("hidden");
  }

   // Check if the "Packages" section is in the viewport
   const packagesSection = document.getElementById("packages");
   const reviewSection = document.getElementById("review");

   if (isElementInViewport(packagesSection)) {
    fetchTours();
    // Remove the event listener after loading the packages
    window.removeEventListener("scroll", arguments.callee);
  }

  if(isElementInViewport(reviewSection))
  {
    fetchAllReview();
    //window.removeEventListener("scroll", arguments.callee);
  }

});*/

//----
// Set a flag to keep track of whether reviews are fetched
let reviewsFetched = false;
let packagesFetched = false;

// Define a named function for the scroll event handler
function scrollEventHandler() {
  var scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > scrollThreshold) {
    tripBox.classList.add("hidden");
  } else {
    tripBox.classList.remove("hidden");
  }

  // Check if the "Packages" section is in the viewport
  const packagesSection = document.getElementById("packages");
  const reviewSection = document.getElementById("review");

  if (isElementInViewport(packagesSection) && !packagesFetched) {
    packagesFetched = false;
    fetchTours();
    packagesFetched = true;
    // Remove the event listener after loading the packages
    //window.removeEventListener("scroll", scrollEventHandler);
  }

  if (isElementInViewport(reviewSection) && !reviewsFetched) {
    // Reset the flag to false when scrolling to a different section
    reviewsFetched = false;
    fetchAllReview();
    reviewsFetched = true; // Set the flag to true after fetching reviews
    //window.removeEventListener("scroll", scrollEventHandler);
  }
}


// Add the scroll event listener using the named function
window.addEventListener("scroll", scrollEventHandler);



// Rest of my code...

//------------

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

videoBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".controls .active").classList.remove("active");
    btn.classList.add("active");
    let src = btn.getAttribute("data-src");
    document.querySelector("#video-slider").src = src;
  });
});

//function for fetching all tours packages
async function fetchTours()
{
  const response = await fetch('/packages');
  const tours = await response.json();

  console.log("tours:",tours);

  tours.forEach(tour =>{
    const tourList = document.getElementById("tour-list");

    const tourDiv = document.createElement('div');
    tourDiv.classList.add('box');

    //adding image src
    const imageSrc = `/${tour.TOUR_ID}.jpg`;

    tourDiv.innerHTML = 
    `<img src="/image/${imageSrc}" alt="" />
    <div class="content">
      <h3><i class="fas fa-map-markar-alt"></i>"${tour.TOUR_NAME}"</h3>
        <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>

      <div class="price $">"${tour.Price}"<span>$120.00</span></div>
      
      <a href="/packageDetails/${tour.TOUR_ID}" class="btn">Details</a>
      <a href="/booking/${tour.TOUR_ID}" class="btn">Book Now</a>
    </div>
  `;
   tourList.appendChild(tourDiv);

  });

}

//-------for review-------//


//rest of the  functionality for sliding reviews

//function for fetching all reviews

async function fetchAllReview()
{

const Wrapper = document.querySelector(".Wrapper");
const carousel = document.querySelector(".carousel");
//const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".Wrapper i");

const carouselChildrens = [...carousel.children];

//fetch review from PACKAGE_REVIEW table 
const response = await fetch('/fetchReview');
const data = await response.json();

console.log("review: in fetch:",data);

carousel.innerHTML = " ";

data.forEach(item =>{
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = `
  <div class="img"><img src="/metaly.jpg" alt="img" draggable="false"></div>
  <h2>Metaly</h2>
  <p>${item.DETAILS_REVIEW}</p>
  `;
  carousel.appendChild(card);

});


const firstCardWidth = carousel.querySelector(".card").offsetWidth;

  let isDragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;

  // Get the number of cards that can fit in the carousel at once
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");


 // Add event listeners for the arrow buttons to scroll the carousel left and right
 arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("Arrow button clicked");
    carousel.scrollLeft +=
      btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});



const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};


const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!Wrapper.matches(":hover")) autoPlay();
};


const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
 timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
Wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
Wrapper.addEventListener("mouseleave", autoPlay);

}

