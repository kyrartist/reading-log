const addBookForm = document.getElementById("add-book-form");
const bookContainer = document.getElementById("book-container");

addBookForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(addBookForm);
  const dataObject = Object.fromEntries(formData);

  const title = dataObject.title;
  const author = dataObject.author;

  let rating = parseFloat(dataObject.rating);
  rating = getStarRating(rating);

  const bookData = {title, author, rating};
  addBookToPage(bookData);

  addBookForm.reset();
});

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

function addBookToPage(book) {
  console.log(book);
  const newBook = document.createElement("div");
  console.log(newBook);

  newBook.innerHTML = `
  <div class="book-card">
    <img src="img/no_cover_available.png" alt=""/>
    <h2 class="book-title">${book.title}</h2>
    <p class="author">${book.author}</p>
    <p class="rating">${book.rating}</p>
  </div>`;

  bookContainer.appendChild(newBook);
  newBook.addEventListener("click", () => openBookPopup(book));

  saveData();
}

const bookPopup = document.getElementById("book-popup");

function openBookPopup(book) {
  alert(`${book}`);
  bookPopup.classList.remove("hidden");

  bookPopup.innerHTML = "<p>Hello</p>";
}

document
  .getElementById("close-popup-btn")
  .addEventListener("click", closeBookPopup);

function closeBookPopup() {
  document.getElementById("book-popup").classList.add("hidden");
}

function saveData() {
  localStorage.setItem("data", bookContainer.innerHTML);
}

function showBooks() {
  bookContainer.innerHTML = localStorage.getItem("data");
}

showBooks();
