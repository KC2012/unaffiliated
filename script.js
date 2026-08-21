// Placeholder behavior: prevent dead project links from jumping to the top.
document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
  });
});
