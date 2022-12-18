// Get all the nav links
const navLinks = document.querySelectorAll('header nav a');

// Add a click event listener to each nav link
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    // Get the target element from the link's href
    const target = document.querySelector(e.target.getAttribute('href'));

    // Animate the scroll to the target element
    smoothScroll(target, 500);
  });
});

// Smooth scroll function
function smoothScroll(target, duration) {
  let targetPosition = target.getBoundingClientRect().top;
  let startPosition = window.pageYOffset;
  let distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}
const websiteBuilderButton = document.getElementById('website-builder-button');

// Add a click event listener to the button
websiteBuilderButton.addEventListener('click', () => {
  // Redirect to the website builder page
  window.location.href = '/website-builder.html';
});
