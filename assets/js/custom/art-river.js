// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img.lazy');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    });
  }

  // Media modal handling
  const modal = document.querySelector('.media-modal');
  const modalPlayer = modal.querySelector('.media-modal__player');
  const modalClose = modal.querySelector('.media-modal__close');

  // Play buttons click handler
  document.querySelectorAll('.btn--play').forEach(button => {
    button.addEventListener('click', () => {
      const videoSrc = button.dataset.video;
      const audioSrc = button.dataset.audio;
      let mediaElement;

      if (videoSrc) {
        mediaElement = document.createElement('video');
        mediaElement.src = videoSrc;
        mediaElement.controls = true;
      } else if (audioSrc) {
        mediaElement = document.createElement('audio');
        mediaElement.src = audioSrc;
        mediaElement.controls = true;
      }

      if (mediaElement) {
        modalPlayer.innerHTML = '';
        modalPlayer.appendChild(mediaElement);
        modal.style.display = 'flex';
        mediaElement.play();
      }
    });
  });

  // Close modal handler
  modalClose.addEventListener('click', () => {
    const mediaElement = modalPlayer.querySelector('video, audio');
    if (mediaElement) {
      mediaElement.pause();
    }
    modalPlayer.innerHTML = '';
    modal.style.display = 'none';
  });

  // Close modal on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      const mediaElement = modalPlayer.querySelector('video, audio');
      if (mediaElement) {
        mediaElement.pause();
      }
      modalPlayer.innerHTML = '';
      modal.style.display = 'none';
    }
  });

  // Handle ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      const mediaElement = modalPlayer.querySelector('video, audio');
      if (mediaElement) {
        mediaElement.pause();
      }
      modalPlayer.innerHTML = '';
      modal.style.display = 'none';
    }
  });

  // More button click handler
  document.querySelectorAll('.btn--more').forEach(button => {
    button.addEventListener('click', (e) => {
      const artItem = e.target.closest('.art-item');
      // Here we would typically navigate to a dedicated page for the artwork
      // For now, let's just log the action
      console.log('More details requested for:', artItem.querySelector('.art-item__title').textContent);
    });
  });

  // Buy button click handler
  document.querySelectorAll('.btn--buy').forEach(button => {
    button.addEventListener('click', (e) => {
      const artItem = e.target.closest('.art-item');
      // Here we would typically open a checkout process
      // For now, let's just log the action
      console.log('Purchase requested for:', artItem.querySelector('.art-item__title').textContent);
    });
  });
});
