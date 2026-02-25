const addBookForm = document.getElementById("add-book-form");

addBookForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(addBookForm);

  const dataObject = Object.fromEntries(formData);

  const title = dataObject.title;
  const author = dataObject.author;

  let rating = parseFloat(dataObject.rating);
  rating = getStarRating(rating);

  const bookData = await fetchBookData(title, author);
  addBookToPage(bookData, rating);

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

async function fetchBookData(title, author) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
    title,
  )}+inauthor:${encodeURIComponent(author)}`;

  const res = await fetch(url);
  const data = await res.json();

  const book = data.items?.[0];
  const info = book?.volumeInfo;

  return {
    title: info?.title || title,
    author: info?.authors?.[0] || author,
    coverUrl: info?.imageLinks?.thumbnail || "img/no_cover_available.png",
  };
}

function addBookToPage(book, rating) {
  const bookContainer = document.getElementById("book-container");
  const newBook = document.createElement("div");

  newBook.innerHTML = `<div class="book-card"><img src="${book.coverUrl}" alt=""/><h2 class="book-title">${book.title}</h2><p class="author">${book.author}</p><p class="rating">${rating}</p></div>`;

  newBook.addEventListener("click", () => openBookPopup(book));

  bookContainer.appendChild(newBook);
}

function openBookPopup(book) {
  const bookPopup = document.getElementById('book-popup');

  bookPopup.classList.remove('hidden');
}

document.getElementById('close-popup-btn').addEventListener("click", closeBookPopup);

function closeBookPopup() {
  document.getElementById("book-popup").classList.add("hidden");
}