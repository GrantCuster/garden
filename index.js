window.onload = () => {
  // Open external links in a new tab
  const postLinks = document.querySelectorAll('.post a');
  postLinks.forEach((postLink) => {
    const href = postLink.getAttribute('href');
    if (href && /^(https?:)?\/\//.test(href)) {
      postLink.target = '_blank';
    }
    postLink.addEventListener('click', (event) => {
      // Prevent link click from triggering post click
      event.stopPropagation();
    });
  });

  // Add click event listener to images
  const postImages = document.querySelectorAll('.post img');
  postImages.forEach((postImage) => {
    postImage.addEventListener('click', (event) => {
      event.stopPropagation();
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      const image = document.createElement('img');
      image.src = postImage.src;
      imageContainer.appendChild(image);

      document.body.appendChild(imageContainer);

      // Add click event listener to remove image container
      imageContainer.addEventListener('click', () => {
        document.body.removeChild(imageContainer);
      });
    });
  });
};

