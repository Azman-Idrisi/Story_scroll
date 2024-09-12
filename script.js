document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;
    const cards = document.querySelectorAll('.card');
    const progressBar = document.getElementById('progressBar');

    function updateCardClasses() {
      cards.forEach((card, index) => {
        card.classList.remove('active', 'previous', 'next');
        if (index === currentIndex) {
          card.classList.add('active');
        } else if (index < currentIndex) {
          card.classList.add('previous');
        } else {
          card.classList.add('next');
        }
      });
    }

    function updateProgressBar() {
      const progress = (currentIndex / (cards.length - 1)) * 100;
      progressBar.style.width = `${progress}%`;
    }

    function handleScroll() {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const cardHeight = cards[0].offsetHeight; // Assuming all cards have the same height
      const totalCardsHeight = cardHeight * cards.length;

      // Ensure scrolling maps to cards properly
      let newIndex = Math.floor((scrollPosition / (documentHeight - windowHeight)) * cards.length);

      // Prevent the newIndex from going out of bounds
      newIndex = Math.max(0, Math.min(newIndex, cards.length - 1));

      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateCardClasses();
        updateProgressBar();
      }
    }

    // Throttle scroll events to optimize performance
    let timeout;
    window.addEventListener('scroll', function() {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 100); // Adjust timeout as needed
    });

    // Initialize card classes and progress bar
    updateCardClasses();
    updateProgressBar();

    // Audio playback function
    function handleAudioPlayback() {
      const playButtons = document.querySelectorAll('.play-audio');
      playButtons.forEach(button => {
        button.addEventListener('click', function() {
          const audio = this.nextElementSibling;
          if (audio.paused) {
            // Pause all other audio elements
            document.querySelectorAll('audio').forEach(a => {
              if (a !== audio) {
                a.pause();
                a.currentTime = 0;
              }
            });
            // Reset all other button texts
            playButtons.forEach(btn => {
              if (btn !== this) {
                btn.textContent = 'Play Story';
              }
            });

            audio.play();
            this.textContent = 'Pause Story';
          } else {
            audio.pause();
            this.textContent = 'Play Story';
          }
        });
      });
    }

    // Call the audio playback function
    handleAudioPlayback();
});
