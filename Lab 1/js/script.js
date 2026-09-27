const steps = document.querySelectorAll(".story-step");
const sceneImage = document.getElementById("scene-image");
const storyText = document.getElementById("story-text");
const speaker = document.getElementById("speaker");

let currentImage = sceneImage.src;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const step = entry.target;
      const newImage = step.dataset.image;
      const newText = step.dataset.text;
      const newSpeaker = step.dataset.speaker || "";

      // atmosphere switch for collapse sections
      if (step.classList.contains("collapse") || step.classList.contains("final-step")) {
        document.body.classList.add("collapse-active");
      } else {
        document.body.classList.remove("collapse-active");
      }

      // fade text out
      storyText.classList.add("hidden");
      speaker.classList.add("hidden");

      setTimeout(() => {
        storyText.textContent = newText;
        speaker.textContent = newSpeaker;
        storyText.classList.remove("hidden");
        speaker.classList.remove("hidden");
      }, 220);

      // change image if needed
      if (!currentImage.includes(newImage)) {
        sceneImage.style.opacity = "0";

        setTimeout(() => {
          sceneImage.src = newImage;
          currentImage = newImage;
          sceneImage.style.opacity = "1";
        }, 350);
      }
    });
  },
  {
    threshold: 0.55,
  }
);

steps.forEach((step) => observer.observe(step));

const bgm = document.getElementById("bgm");

let bgmStarted = false;

function startBGM() {
    if (bgmStarted) return;

    bgm.volume = 0.25;

    bgm.play()
        .then(() => {
            bgmStarted = true;
        })
        .catch(() => {
            // Browser may still block playback
        });
}

window.addEventListener("scroll", startBGM, { once: true });
window.addEventListener("click", startBGM, { once: true });