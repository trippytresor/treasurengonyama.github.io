/**
 * Handles section switching for project details.
 * @param {string} sectionId - The ID of the section to show.
 */
function changeSection(sectionId) {
  const sections = document.querySelectorAll('.section');

  // Pause all Vimeo videos when changing sections
  pauseAllPlayers();

  sections.forEach(section => {
    if (section.id === sectionId) {
      section.classList.add('visible');
    } else {
      section.classList.remove('visible');
    }
  });
}

/**
 * Closes all project sections.
 */
function closeProject() {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('visible');
  });
  pauseAllPlayers();
  scrollToSection('workgallery');
}

/**
 * Pauses all Vimeo players on the page.
 */
function pauseAllPlayers() {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    if (iframe.src.includes('vimeo.com')) {
      const player = new Vimeo.Player(iframe);
      player.pause().catch(function(error) {
        // Ignore errors if player is not ready or other issues
        console.log('Vimeo player pause attempt (expected if not loaded):', error);
      });
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

  // Handle active states for floating navigation
  const navLinks = document.querySelectorAll('.floating-nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Intersection Observer for scroll-based active state
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              navLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
            }
          });
        }
      }
    });
  }, observerOptions);

  // Targets for observation
  const targets = ['home', 'workgallery', 'lab', 'about', 'contact'];
  targets.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
});
