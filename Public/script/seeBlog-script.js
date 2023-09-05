async function fetchBlog()
{
  const response = await fetch('/fetchGallery');
  const blog = await response.json();

  blog.forEach(element=>{
    const blogList = document.getElementById("blog-list");
    const blogDiv = document.createElement('div');
    blogDiv.classList.add('box');

     //adding image src
     const imageSrc = `/${element.IMAGE_LINK}`;

     blogDiv.innerHTML = `
     <div class="img">
     <img src="${imageSrc}" alt="image" />
     <div class="content">
     <h3> ${element.BLOG_TITLE}</h3>
     <h2>${element.BLOG_CONTENT} </h2>
     <h2>${element.NAME}</h2>
     </div>
     `;
    blogList.appendChild(blogDiv);

  });

}

fetchBlog();
