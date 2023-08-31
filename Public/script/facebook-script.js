// comments-script.js

const loadMoreBtn = document.getElementById("loadMoreBtn");
const comments = document.querySelectorAll(".comment");

let showAllComments = false;

loadMoreBtn.addEventListener("click", () => {
  showAllComments = !showAllComments;

  comments.forEach(comment => {
    if (showAllComments || !comment.classList.contains("hidden")) {
      comment.classList.toggle("hidden");
    }
  });

  loadMoreBtn.textContent = showAllComments ? "Hide Comments" : "Load More Comments";
});
