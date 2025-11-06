// Typing Animation for "Media" -> "Marketing"
document.addEventListener("DOMContentLoaded", function () {
  const words = ["Media..", "Marketing.."];
  const typedWord = document.getElementById("typed-word");

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 120;

  function type() {
    const currentWord = words[wordIndex];
    const visibleText = currentWord.substring(0, charIndex);
    typedWord.textContent = visibleText;

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      typingSpeed = 140;
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      typingSpeed = 80;
    } else if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 1400; // Pause before deleting
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 600;
    }

    setTimeout(type, typingSpeed);
  }

  type();
});

// Timeline scroll animation
document.addEventListener("scroll", () => {
  const line = document.querySelector(".timeline-line");
  const section = document.querySelector(".timeline");
  const items = document.querySelectorAll(".timeline-item");
  const windowHeight = window.innerHeight;

  const firstCircle = items[0].querySelector(".timeline-circle");
  const lastCircle = items[items.length - 1].querySelector(".timeline-circle");

  // Get vertical positions of first and last circles
  const firstY = firstCircle.getBoundingClientRect().top + window.scrollY + firstCircle.offsetHeight / 2;
  const lastY = lastCircle.getBoundingClientRect().top + window.scrollY + lastCircle.offsetHeight / 2;

  // How far user has scrolled
  const scrollMid = window.scrollY + windowHeight / 2;
  const scrollProgress = scrollMid - firstY;
  const maxHeight = lastY - firstY;

  // Keep line between first & last circles
  const progress = Math.min(Math.max(scrollProgress, 0), maxHeight);

  // Start the line exactly at the center of the first circle
  line.style.top = `${firstCircle.offsetTop + firstCircle.offsetHeight / 2}px`;
  line.style.height = `${progress}px`;

  // Highlight current visible items
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const isActive = center > windowHeight * 0.3 && center < windowHeight * 0.7;
    item.classList.toggle("active", isActive);
  });
});


// FAQ Accordion Toggle
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    item.classList.toggle("active");

    // Close others when one is opened
    faqItems.forEach(other => {
      if (other !== item) other.classList.remove("active");
    });
  });
});
