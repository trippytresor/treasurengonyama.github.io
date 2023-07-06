function changeSection(sectionId) {
  var sections = document.querySelectorAll('.section');
  var video = document.getElementById('player');

  for (var i = 0; i < sections.length; i++) {
    if (sections[i].id === sectionId) {
      sections[i].style.display = 'block';
      if (sections[i].contains(video)) {
        video.play(); // Resume video playback
      }
    } else {
      sections[i].style.display = 'none';
      if (sections[i].contains(video)) {
        video.pause(); // Pause video playback
      }
    }
  }
}

// Attach event listener to detect section changes
document.addEventListener('DOMContentLoaded', function() {
  var sectionLinks = document.querySelectorAll('.section-link');
  for (var i = 0; i < sectionLinks.length; i++) {
    sectionLinks[i].addEventListener('click', function(event) {
      var sectionId = event.target.getAttribute('data-section');
      changeSection(sectionId);
    });
  }
});

//Scroll to section
function scrollToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);

  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth'
    });
  }
}