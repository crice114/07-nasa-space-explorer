// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

//SPACE FACT LEVEL UP
// Random space facts
const spaceFacts = [
  "Did you know? One day on Venus is longer than its entire year.",
  "Did you know? Neutron stars can spin 600 times per second.",
  "Did you know? The Sun accounts for 99.8% of the mass in our solar system.",
  "Did you know? Space is completely silent—there’s no atmosphere to carry sound.",
  "Did you know? Jupiter has 95 known moons as of 2025!",
  "Did you know? A teaspoon of a neutron star would weigh about 6 billion tons.",
  "Did you know? The footprints on the Moon will likely stay there for millions of years.",
  "Did you know? Earth is the only planet not named after a god.",
  "Did you know? There may be more stars in the universe than grains of sand on Earth.",
  "Did you know? The largest known volcano in the solar system is Olympus Mons on Mars."
];

// Display a random fact
function showRandomSpaceFact() {
  const factEl = document.getElementById('spaceFact');
  const randomIndex = Math.floor(Math.random() * spaceFacts.length);
  factEl.textContent = spaceFacts[randomIndex];
}

// Call this once when page loads
showRandomSpaceFact();




// Import the setupDateInputs function from dateRange.jss

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// Find the "Get Space Images" button and the gallery container
const getImagesBtn = document.querySelector('button');
const gallery = document.getElementById('gallery');

// NASA APOD API endpoint and demo API key
const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = 'DEMO_KEY'; // For learning, NASA provides a demo key

// Listen for button click to fetch images
getImagesBtn.addEventListener('click', () => {
  // Get the selected start and end dates
  const startDate = startInput.value;
  const endDate = endInput.value;

  // Build the API URL with query parameters
  const url = `${NASA_API_URL}?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;

  // Show NASA-themed loading message
  // gallery.innerHTML = `
  //   <div class="placeholder">
  //     <div class="placeholder-icon">🔄</div>
  //     <p>Loading space photos…</p>
  //   </div>
  // `;
gallery.innerHTML = `
  🔄 Loading space photos…
`;
 


  // Fetch images from NASA APOD API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // If data is a single object, wrap it in an array
      const images = Array.isArray(data) ? data : [data];

      // // Filter out items that are not images (sometimes APOD is a video)
      // const imageItems = images.filter(item => item.media_type === 'image');

      // // If no images found, show a message
      // if (imageItems.length === 0) {
      //   gallery.innerHTML = `
      //     <div class="placeholder">
      //       <div class="placeholder-icon">😢</div>
      //       <p>No space images found for this date range.</p>
      //     </div>
      //   `;
      //   return;
      // }

      // // Display images in the gallery
      // gallery.innerHTML = '';
      // imageItems.forEach(item => {
      //   // Create a gallery item with image, title, and date
      //   const div = document.createElement('div');
      //   div.className = 'gallery-item';
      //   div.innerHTML = `
      //     <img src="${item.url}" alt="${item.title}" />
      //     <p><strong>${item.title}</strong> (${item.date})</p>
      //   `;
      //   // When clicked, open modal with details
      //   div.addEventListener('click', () => openModal(item));
      //   gallery.appendChild(div);
      // });









      // If no data returned
// if (!Array.isArray(data) || data.length === 0) {
//   gallery.innerHTML = `
//     <div class="placeholder">
//       <div class="placeholder-icon">😢</div>
//       <p>No space media found for this date range.</p>
//     </div>
//   `;
//   return;
// }

// // Display all media items: images and videos
// gallery.innerHTML = '';
// data.forEach(item => {
//   const div = document.createElement('div');
//   div.className = 'gallery-item';

//   if (item.media_type === 'image') {
//     div.innerHTML = `
//       <img src="${item.url}" alt="${item.title}" />
//       <p><strong>${item.title}</strong> (${item.date})</p>
//     `;
//     div.addEventListener('click', () => openModal(item));
//   } else if (item.media_type === 'video') {
//     div.innerHTML = `
//       <div style="height: 200px; display: flex; align-items: center; justify-content: center; background: #f0f0f0; border-radius: 4px;">
//         <a href="${item.url}" target="_blank" style="text-align: center; font-size: 16px; font-weight: bold; color: #0033A0;">▶️ Watch Video</a>
//       </div>
//       <p><strong>${item.title}</strong> (${item.date})</p>
//     `;
//   }

//   gallery.appendChild(div);
// });




// If no data returned
if (!Array.isArray(data) || data.length === 0) {
  gallery.innerHTML = `
    <div class="placeholder">
      <div class="placeholder-icon">😢</div>
      <p>No space media found for this date range.</p>
    </div>
  `;
  return;
}

// Display all media items: images and videos
gallery.innerHTML = '';
data.forEach(item => {
  const div = document.createElement('div');
  div.className = 'gallery-item';

  if (item.media_type === 'image') {
    div.innerHTML = `
      <img src="${item.url}" alt="${item.title}" />
      <p><strong>${item.title}</strong> (${item.date})</p>
    `;
    div.addEventListener('click', () => openModal(item));
  } else if (item.media_type === 'video') {
    div.innerHTML = `
      <p><strong>${item.title}</strong> (${item.date})</p>
      <p><a href="${item.url}" target="_blank" style="font-size: 16px; color: #0033A0; text-decoration: underline;">▶️ Click here to watch the video</a></p>
    `;
  }

  gallery.appendChild(div);
});


    })
    .catch(error => {
      // Show error message if something goes wrong
      gallery.innerHTML = `
        <div class="placeholder">
          <div class="placeholder-icon">⚠️</div>
          <p>Could not load images. Please try again later.</p>
        </div>
      `;
      // For debugging: console.log(error);
    });
});

// Modal elements
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalExplanation = document.getElementById('modalExplanation');
const modalClose = document.getElementById('modalClose');

// Function to open modal with image details
function openModal(item) {
  modalImg.src = item.url;
  modalImg.alt = item.title;
  modalTitle.textContent = item.title;
  modalDate.textContent = item.date;
  modalExplanation.textContent = item.explanation;
  modal.style.display = 'flex';
}

// Function to close modal
function closeModal() {
  modal.style.display = 'none';
  modalImg.src = '';
  modalTitle.textContent = '';
  modalDate.textContent = '';
  modalExplanation.textContent = '';
}

// Close modal when clicking the close button
modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside modal content
modal.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModal();
  }
});

