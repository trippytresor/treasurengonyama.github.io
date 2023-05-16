
  function changeSection(sectionId) {
    var sections = document.querySelectorAll('.section');
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].id === sectionId) {
        sections[i].style.display = 'block';
      } else {
        sections[i].style.display = 'none';
      }
    }
  }
  

  
  // get the video element
const myVideo = document.getElementById("player");

// stop video playback when switching to a different section
function switchSection(newSection) {
  player.pause();
  document.getElementById("section0").style.display = "none";
  document.getElementById("section1").style.display = "none";
  document.getElementById("section2").style.display = "none";
  document.getElementById("section3").style.display = "none";
  document.getElementById("section4").style.display = "none";
  document.getElementById("section5").style.display = "none";
  document.getElementById("section6").style.display = "none";
  document.getElementById("section7").style.display = "none";
  document.getElementById("section8").style.display = "none";
  document.getElementById("section9").style.display = "none";
  document.getElementById("section" + newSection).style.display = "block";
}


function scrollToSection(containerId) {
  const contrainer = document.getElementById(containerId);
  container.scrollIntoView({behavior: 'smooth'});
}
  
  
  
  
  
  
  


