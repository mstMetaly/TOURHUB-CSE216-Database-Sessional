const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const videoBtn = document.querySelectorAll(".vid-btn");
const menu = document.querySelector("#menu-bar");
const navbar = document.querySelector(".navbar");
var tripBox = document.querySelector(".trip_bx");
var scrollThreshold = 70; // Adjust this value as needed

//packages--

// Function to check if an element is in the viewport
function isElementInViewport(element) {
  var rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

window.addEventListener("scroll", function () {
  var scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > scrollThreshold) {
    tripBox.classList.add("hidden");
  } else {
    tripBox.classList.remove("hidden");
  }

   // Check if the "Packages" section is in the viewport
   const packagesSection = document.getElementById("packages");

   if (isElementInViewport(packagesSection)) {
    fetchTours();
    // Remove the event listener after loading the packages
    window.removeEventListener("scroll", arguments.callee);
  }

});

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

//for threeDot to view profile
const menuBtn = document.getElementById("menu-btn");
const menuDropdown = document.getElementById("menu-dropdown");

menuBtn.addEventListener("click", () => {
  menuDropdown.classList.toggle("active");
});


//for review

/*var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerview: 1,
    },
    768: {
      slidesPerview: 2,
    },
    1024: {
      slidesPerview: 3,
    },
  },
});*/
document.addEventListener("DOMContentLoaded", function () {
  const reviewSwiper = new Swiper(".review-slider", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Additional initialization and event listeners if needed
});




