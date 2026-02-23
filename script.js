const addBookForm = document.getElementById("add-book-form");
const bookContainer = document.getElementById("book-container");

addBookForm.addEventListener("submit", (event) => {
  // alert('click!');
  event.preventDefault();

  const formData = new FormData(addBookForm);

  const dataObject = Object.fromEntries(formData);

  const title = dataObject.title;
  const author = dataObject.author;
  let rating = dataObject.rating;
  console.log(typeof rating);

  const fullStar = '<i class="bi bi-star-fill">';
  const emptyStar = '<i class="bi bi-star"></i>';

  switch (rating) {
    case "1":
      rating = `${fullStar}${emptyStar}${emptyStar}${emptyStar}${emptyStar}`;
      break;
    case "2":
      rating = `${fullStar}${fullStar}${emptyStar}${emptyStar}${emptyStar}`;
      break;
    case "3":
      rating = `${fullStar}${fullStar}${fullStar}${emptyStar}${emptyStar}`;
      break;
    case "4":
      rating = `${fullStar}${fullStar}${fullStar}${fullStar}${emptyStar}`;
      break;
    case "5":
      rating = `${fullStar}${fullStar}${fullStar}${fullStar}${fullStar}`;
      break;
  }

  const newBook = document.createElement("div");

  newBook.innerHTML = `<div class="book-card"><img src="" alt=""/><h2 class="book-title">${title}</h2><p class="author">${author}</p><p class="rating">${rating}</p></div>`;
  bookContainer.appendChild(newBook);

  addBookForm.reset();
});
