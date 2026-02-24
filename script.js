const addBookForm = document.getElementById("add-book-form");
const bookContainer = document.getElementById("book-container");

addBookForm.addEventListener("submit", (event) => {
  // alert('click!');
  event.preventDefault();

  const formData = new FormData(addBookForm);

  const dataObject = Object.fromEntries(formData);

  const title = dataObject.title;
  const author = dataObject.author;
  let rating = parseFloat(dataObject.rating);
  console.log(typeof rating);

  const fullStar = '<i class="bi bi-star-fill">';
  const halfStar = '<i class="bi bi-star-half"></i>';
  const emptyStar = '<i class="bi bi-star"></i>';

  switch (true) {
    case rating < 0.5:
      rating = `${emptyStar}${emptyStar}${emptyStar}${emptyStar}${emptyStar}`;
      break;
    case rating < 1:
      rating = `${halfStar}${emptyStar}${emptyStar}${emptyStar}${emptyStar}`;
      break;
    case rating < 1.5:
      rating = `${fullStar}${emptyStar}${emptyStar}${emptyStar}${emptyStar}`;
      break;
    case rating < 2:
      rating = `${fullStar}${halfStar}${emptyStar}${emptyStar}${emptyStar}`;
      break;
    case rating < 2.5:
      rating = `${fullStar}${fullStar}${emptyStar}${emptyStar}${emptyStar}`;
      break;
    case rating < 3:
      rating = `${fullStar}${fullStar}${halfStar}${emptyStar}${emptyStar}`;
      break;
    case rating < 3.5:
      rating = `${fullStar}${fullStar}${fullStar}${emptyStar}${emptyStar}`;
      break;
    case rating < 4:
      rating = `${fullStar}${fullStar}${fullStar}${halfStar}${emptyStar}`;
      break;
    case rating < 4.5:
      rating = `${fullStar}${fullStar}${fullStar}${fullStar}${emptyStar}`;
      break;
    case rating < 5:
      rating = `${fullStar}${fullStar}${fullStar}${fullStar}${halfStar}`;
      break;
    case rating === 5:
      rating = `${fullStar}${fullStar}${fullStar}${fullStar}${fullStar}`;
      break;
  }

  const newBook = document.createElement("div");

  newBook.innerHTML = `<div class="book-card"><img src="" alt=""/><h2 class="book-title">${title}</h2><p class="author">${author}</p><p class="rating">${rating}</p></div>`;
  bookContainer.appendChild(newBook);

  addBookForm.reset();
});
