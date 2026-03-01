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
    <div class="book-image-container">
      <img src="img/no_cover_available.png" alt=""/>
      <button class="delete-book-btn" title="Delete"><i class="bi bi-x"></i>
</button>
    </div>
    <h2 class="title">${book.title}</h2>
    <p class="author">${book.author}</p>
    <p class="rating">${book.rating}</p>
  `;

  bookContainer.appendChild(newBook);

  saveData();
}

// Add the open book pop up event listener to every .book-card element
const books = document.getElementById("books") || document;

books.addEventListener("click", (e) => {
  // Check if delete button was clicked
  if (e.target.classList.contains("delete-book-btn")) {
    const card = e.target.closest(".book-card");
    if (card) {
      currentBookCard = card;
      document.getElementById("confirmation-popup").classList.remove("hidden");
    }
    return;
  }

  const card = e.target.closest(".book-card");
  if (!card || !books.contains(card)) return;

  openBookPopup(card);
});

// Open popup
const bookPopup = document.getElementById("book-popup");
const popupDisplay = document.createElement("div");
let currentBookCard = null;

function openBookPopup(div) {
  bookPopup.style.display = "flex";
  currentBookCard = div;
  const bookInfoContainer = bookPopup.querySelector(".info-container");
  const title = div.querySelector(".title").innerText;
  const author = div.querySelector(".author").innerText;
  const rating = div.querySelector(".rating").innerHTML;

  bookInfoContainer.innerHTML = `
    <h1>${title}</h1>
    <p>${author}</p>
    <p>${rating}</p>
  `;
}

// Close popup
document.getElementById("close-popup-btn").addEventListener("click", () => {
  bookPopup.style.display = "none";
});

// Confirm delete
document.getElementById("confirm-delete-btn").addEventListener("click", () => {
  if (currentBookCard) {
    bookContainer.removeChild(currentBookCard);
    bookPopup.style.display = "none";
    document.getElementById("confirmation-popup").classList.add("hidden");
    saveData();
    currentBookCard = null;
  }
});

// Cancel delete
document.getElementById("cancel-delete-btn").addEventListener("click", () => {
  document.getElementById("confirmation-popup").classList.add("hidden");
});

// Save local data
function saveData() {
  localStorage.setItem("data", bookContainer.innerHTML);
}

function showBooks() {
  bookContainer.innerHTML = localStorage.getItem("data");
}

showBooks();
