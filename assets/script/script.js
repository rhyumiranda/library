const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
  updateDisplayCount();
}

/*
displayBooks() serves as the source of printing of cards whenever it is called.
Before it place a series of items, it first clear the container first to remove
the previous items that was update. This is to make sure no duplication happens
and all printed books are accurate.
*/
function displayBooks() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = `
    <div class="card create-card" onclick="showForm()">
      <i class="fa-solid fa-plus"></i>
    </div>
  `; //This clears the container I addded create-card so that the create button would still be intact even deleted.
  

  //This foreach iterates and checks all the items of our library. We have used the items and the contructor to write clean and efficiently.
  myLibrary.forEach((book, index) => {
    if (book.isFavorite) { //This is to add fill color for the favorite button
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <div class="text-container">
        <div class="book-title">
          ${book.title}
        </div>
        <div class="book-author"><span>Book by</span><br> ${book.author}</div>
        <div class="book-pages">${book.pages} Pages</div>
        <div class="book-status" id="reading-status-${index}">${book.read}</div>
        <div class="features">
          <i class="fa-regular fa-heart fa-hearts" style="font-weight: 700;" onclick="addToFavorites(${index})"></i>
          <i class="fa-regular fa-circle" id="status-${index}" onclick="changeStatus(${index})"></i>
          <i class="fa-solid fa-trash" onclick="removeBook(${index})"></i>
        </div>
      `;
      cardContainer.append(card); 
      updateStatusDisplay(index); //This is called to change the color of the reading status circle and text.
    } else {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <div class="text-container">
        <div class="book-title">
          ${book.title}
        </div>
        <div class="book-author"><span>Book by</span><br> ${book.author}</div>
        <div class="book-pages">${book.pages} Pages</div>
        <div class="book-status" id="reading-status-${index}">${book.read}</div>
        <div class="features">
          <i class="fa-regular fa-heart fa-hearts" onclick="addToFavorites(${index})"></i>
          <i class="fa-regular fa-circle" id="status-${index}" onclick="changeStatus(${index})"></i>
          <i class="fa-solid fa-trash" onclick="removeBook(${index})"></i>
        </div>
      `;
      cardContainer.append(card);
      updateStatusDisplay(index);
    }
  });
}

//This is used to push new key.value on myLibrary if book is favorited by user.
function addToFavorites(index) {
  if (myLibrary[index].isFavorite === undefined) {
    myLibrary[index].isFavorite = true;
  } else if (myLibrary[index].isFavorite === true) {
    myLibrary[index].isFavorite = false;
  } else if (myLibrary[index].isFavorite === false) {
    myLibrary[index].isFavorite = true;
  }

  displayBooks();
  updateDisplayCount();
}

//This is to modify the values that has already been declared this is to ensure that myLibrary data is updated.
function changeStatus(index) {
  if (myLibrary[index].read === "Read") {
    myLibrary[index].read = "Not Started";
  } else if (myLibrary[index].read === "Not Started") {
    myLibrary[index].read = "In Progress";
  } else {
    myLibrary[index].read = "Read";
  }

  displayBooks();
  updateStatusDisplay(index);
}

//This serves as the function to change the color of the circle and text of this.read constructor.
function updateStatusDisplay(index) {
  let circleStatusClr = document.getElementById(`status-${index}`);
  let readingStatusTxtClr = document.getElementById(`reading-status-${index}`);

  if (myLibrary[index].read === "Read") {
    readingStatusTxtClr.style.color = "#428745";
    circleStatusClr.style.color = "#428745";
    circleStatusClr.style.fontWeight = "700";
  } else if (myLibrary[index].read === "Not Started") {
    readingStatusTxtClr.style.color = "#ff0000";
    circleStatusClr.style.color = "#ff0000";
    circleStatusClr.style.fontWeight = "700";
  } else {
    readingStatusTxtClr.style.color = "#c18e31";
    circleStatusClr.style.color = "#c18e31";
    circleStatusClr.style.fontWeight = "700";
  }

  updateDisplayCount(); //Called this function inside so that it would also be called whenever updateStatusDisplay is called.
}

//This is to modify the values and keep track of the items we have in the container.
function updateDisplayCount() {
  let isFavoriteFiltered = myLibrary.filter((item) => {
    return item.isFavorite == true;
  }).length;

  let haveRead = myLibrary.filter((item) => {
    return item.read == "Read";
  }).length;

  let isReading = myLibrary.filter((item) => {
    return item.read == "In Progress";
  }).length;

  let willRead = myLibrary.filter((item) => {
    return item.read == "Not Started";
  }).length;

  const parentDisplay = document.getElementById("count-display").children;
  const parentDisplayCopy =
    document.getElementById("count-display-copy").children;

  parentDisplay.item(0).innerHTML = `
    <i class="fa-solid fa-heart" id="heart"></i> Favorited - ${isFavoriteFiltered}
  `;
  parentDisplay.item(1).innerHTML = `
    <i class="fa-solid fa-flag"></i> Books Read - ${haveRead}
  `;
  parentDisplay.item(2).innerHTML = `
    <i class="fa-solid fa-hourglass-start"></i> In Progress - ${isReading}
  `;
  parentDisplay.item(3).innerHTML = `
    <i class="fa-solid fa-flag-checkered"></i> Not Started - ${willRead}
  `;

  parentDisplayCopy.item(0).innerHTML = `
    <i class="fa-solid fa-heart" id="heart"></i> Favorited - ${isFavoriteFiltered}
  `;
  parentDisplayCopy.item(1).innerHTML = `
    <i class="fa-solid fa-flag"></i> Books Read - ${haveRead}
  `;
  parentDisplayCopy.item(2).innerHTML = `
    <i class="fa-solid fa-hourglass-start"></i> In Progress - ${isReading}
  `;
  parentDisplayCopy.item(3).innerHTML = `
    <i class="fa-solid fa-flag-checkered"></i> Not Started - ${willRead}
  `;
}


//This will accep an index and it will remove it from our array list and update our display.
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
  updateDisplayCount();
}

function showForm() {
  document.querySelector(".pop-bg").style.display = "block";
}
//showForm and hideForm is used to reveal and hide our pop-up form whenever createButton is clicked.
function hideForm() {
  document.querySelector(".pop-bg").style.display = "none";
  document.getElementById("form").reset();
}

//This is to prevent submission of data through method.
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const titleVal = document.getElementById("title").value;
  const authorVal = document.getElementById("author").value;
  const pagesVal = document.getElementById("pages").value;
  const isReadVal = document.querySelector(
    'input[name="is-read"]:checked'
  ).value;

  let book = new Book(titleVal, authorVal, pagesVal, isReadVal);
  addBookToLibrary(book); //This would trigger for us to create cards and to create another data on array whenever we submit a data.
  document.querySelector(".pop-bg").style.display = "none";
  document.getElementById("form").reset();
});

document.getElementById("menu").addEventListener("click", () => {
  document.getElementById("side-menu").style.display = "block";
});

document.getElementById("close-menu").addEventListener("click", () => {
  document.getElementById("side-menu").style.display = "none";
});
