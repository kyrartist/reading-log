const addBookForm = document.getElementById("add-book-form");
const bookContainer = document.getElementById("book-container");

// Take information from new book form and create book object, add book to page
addBookForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(addBookForm);
  const dataObject = Object.fromEntries(formData);

  const title = dataObject.title;
  const author = dataObject.author;

  let rating = parseFloat(dataObject.rating);
  rating = getStarRating(rating);

  const bookData = { title, author, rating };
  addBookToPage(bookData);

  addBookForm.reset();
});

// Convert number rating to star icons
function getStarRating(rating) {
  const fullStar = '<i class="bi bi-star-fill"></i>';
  const halfStar = '<i class="bi bi-star-half"></i>';
  const emptyStar = '<i class="bi bi-star"></i>';
  return [1, 2, 3, 4, 5]
    .map((i) => {
      if (rating >= i) return fullStar;
      if (rating >= i - 0.5) return halfStar;
      return emptyStar;
    })
    .join("");
}

// Creates new div with user submitted book information
function addBookToPage(book) {
  const newBook = document.createElement("div");
  newBook.classList.add("book-card");

  newBook.innerHTML = `
    <img src="img/no_cover_available.png" alt=""/>
    <h2 class="title">${book.title}</h2>
    <p class="author">${book.author}</p>
    <p class="rating">${book.rating}</p>
  `;

  bookContainer.appendChild(newBook);

  saveData();
}

// Add the open book pop up event listener to every .book-card element
const container = document.getElementById("books") || document;

container.addEventListener("click", (e) => {
  const card = e.target.closest(".book-card");
  if (!card || !container.contains(card)) return;

  // console.log(card);
  openBookPopup(card);
});

// Open popup function
const bookPopup = document.getElementById("book-popup");
const popupDisplay = document.createElement("div");

function openBookPopup(div) {
  bookPopup.classList.remove("hidden");
  const bookInfoContainer = bookPopup.querySelector(".info-container");
  const title = div.querySelector(".title").innerText;
  const author = div.querySelector(".author").innerText;
  const rating = div.querySelector(".rating").innerHTML;

  popupDisplay.innerHTML = `
    <h1>${title}</h1>
    <p>${author}</p>
    <p>${rating}</p>
  `;

  bookInfoContainer.appendChild(popupDisplay);
}

// Close popup button functionality
document
  .getElementById("close-popup-btn")
  .addEventListener("click", closeBookPopup);

function closeBookPopup() {
  document.getElementById("book-popup").classList.add("hidden");
}

// Save local data
function saveData() {
  localStorage.setItem("data", bookContainer.innerHTML);
}

function showBooks() {
  bookContainer.innerHTML = localStorage.getItem("data");
}

showBooks();
