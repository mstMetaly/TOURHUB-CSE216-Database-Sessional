
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".right div");
    const leftSlides = document.querySelectorAll(".left div");
    const upButton = document.querySelector(".up");
    const downButton = document.querySelector(".down");
  
    let currentSlide = 0;
  
    upButton.addEventListener("click", function () {
      if (currentSlide === 0) {
        return;
      }
      currentSlide--;
      updateSlide();
    });
  
    downButton.addEventListener("click", function () {
      if (currentSlide === slides.length - 1) {
        return;
      }
      currentSlide++;
      updateSlide();
    });
  
    function updateSlide() {
      slides.forEach((slide, index) => {
        const offset = (index - currentSlide) * 100;
        slide.style.marginTop = `${offset}vh`;
      });
      leftSlides.forEach((slide,index)=>{
        const offset = (index-currentSlide)*100;
        slide.style.marginTop = `${offset}vh`;
      });
    }