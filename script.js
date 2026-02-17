/**
 * Handles section switching for project details.
 * @param {string} sectionId - The ID of the section to show.
 */
function changeSection(sectionId) {
  const sections = document.querySelectorAll('.section');

  // Pause all Vimeo videos when changing sections
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    if (iframe.src.includes('vimeo.com')) {
      const player = new Vimeo.Player(iframe);
      player.pause().catch(function(error) {
        // Ignore errors if player is not ready or other issues
        console.error('Error pausing Vimeo player:', error);
      });
    }
  });

  sections.forEach(section => {
    if (section.id === sectionId) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
}

/**
 * Scrolls to a specific section on the page.
 * @param {string} sectionId - The ID of the target element.
 */
function scrollToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);

  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

// Initial setup on DOM load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Website initialized.');
  // The gallery items use inline onclick, so no additional listeners are strictly needed here
  // but we could add them for better practice if we refactored further.
});
