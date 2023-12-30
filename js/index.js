const images = gsap.utils.toArray(".item");

const imageSize = images.length;
const total = images.length;
const degree = 360 / total;

const init = () => {
  const timeline = gsap.timeline();

  images.forEach((image, index) => {
    const sign = Math.floor((index / 2) % 2) ? 1 : -1;
    const value = Math.floor((index + 4) / 4) * 4;
    const rotation = index > imageSize - 3 ? 0 : sign * value;
    console.log(rotation);

    gsap.set(image, {
      rotation: rotation,
      scale: 0.5,
    });

    timeline.from(
      image,
      {
        x: () =>
          index % 2
            ? window.innerWidth + image.clientWidth * 4
            : -window.innerWidth - image.clientWidth * 4,
        y: () => window.innerHeight - image.clientHeight,
        rotation: index % 2 ? 200 : -200,
        scale: 4,
        opacity: 1,
        ease: "power4.out",
        duration: 1,
        delay: 0.15 * Math.floor(index / 2),
      },
      0
    );

    let rotationAngle = index * degree;
    timeline.to(
      image,
      {
        scale: 1,
        duration: 0,
      },
      0.15 * (imageSize / 2 - 1) + 1
    );

    timeline.to(
      image,
      {
        transformOrigin: "center 200vh",
        rotation:
          index > imageSize / 2 ? -degree * (imageSize - index) : rotationAngle,
        duration: 1,
        ease: "power1.out",
      },
      0.15 * (imageSize / 2 - 1) + 1
    );
  });
};

const draggable = () => {
  let start = 0;
  Draggable.create(".items", {
    type: "rotation",

    onDragStart: function () {
      start = this.rotation;
    },
    onDragEnd: function () {
      const rotation = this.rotation;
      const offset = Math.abs(rotation - start);
      if (rotation > start) {
        if (rotation - start < degree / 2) {
          gsap.to(".items", {
            rotation: `-=${offset}`,
          });
        } else {
          gsap.to(".items", {
            rotation: `+=${2 * degree - offset}`,
          });
        }
      } else {
        if (Math.abs(rotation - start) < degree / 2) {
          gsap.to(".items", {
            rotation: `+=${offset}`,
          });
        } else {
          gsap.to(".items", {
            rotation: `-=${2 * degree - offset}`,
          });
        }
      }
    },
  });
};

init();
draggable();
// Inside your existing script (js/index.js)

// Function to open the modal with the clicked image
const openModal = (mediaUrl, isVideo = false) => {
  const modal = document.getElementById("imageModal");
  const modalMedia = isVideo
    ? document.getElementById("modalVideo")
    : document.getElementById("modalImage");

  modalMedia.src = mediaUrl;
  modal.style.display = "block";

  // Add an event listener to close the modal when the 'Esc' key is pressed
  document.addEventListener("keydown", handleKeyPress);

  // Add an event listener to close the modal when the close button is clicked
  document.getElementById("closeButton").addEventListener("click", closeModal);
};

// Function to close the modal
const closeModal = () => {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";

  // Remove the 'Esc' key event listener when the modal is closed
  document.removeEventListener("keydown", handleKeyPress);

  // Remove the event listener from the close button
  document.getElementById("closeButton").removeEventListener("click", closeModal);
};

// Function to handle 'Esc' key press
const handleKeyPress = (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
};

images.forEach((image, index) => {
  // ... (your existing code)

  // Add a click event listener to each image
  image.addEventListener("click", () => {
    const mediaElement = image.querySelector(".image"); // Assuming the class is still named "image"

    // Check if the media element is an image or a video
    const isVideo = mediaElement.tagName.toLowerCase() === "video";
    
    // Change the URL to the desired page
    openModal(mediaElement.src, isVideo);
  });
});

// Example code to open the video modal
document.querySelector('.video').addEventListener('click', function() {
  document.getElementById('modalVideo').src = 'video/1.mp4'; // Set the correct video source
  document.getElementById('videoModal').style.display = 'block';
});

// Example code to close the video modal
document.getElementById('closeVideoButton').addEventListener('click', function() {
  document.getElementById('modalVideo').pause(); // Pause the video
  document.getElementById('videoModal').style.display = 'none';
});
