const myLibrary = [];
let favoriteCount = 0;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
}

function displayBooks(){
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = `
  <div class="card create-card" onclick="showForm()">
    <i class="fa-solid fa-plus"></i>
  </div>
  `;

  myLibrary.forEach((book, index) => {
    if(book.isFavorite){
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <div class="text-container">
        <div class="book-title">
          ${book.title}
        </div>
        <div class="book-author"><span>Book by</span><br> ${book.author}</div>
        <div class="book-pages">${book.pages} Pages</div>
        <div class="book-status">${book.read}</div>
        <div class="features">
          <i class="fa-regular fa-heart fa-hearts" style="font-weight: 700;" onclick="addToFavorites(${index})"></i>
          <i class="fa-regular fa-circle" onclick="changeStatus(${index})"></i>
          <i class="fa-solid fa-trash" onclick="removeBook(${index})"></i>
        </div>
      `
      cardContainer.append(card);
    } else{
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
      <div class="text-container">
      <div class="book-title">
        ${book.title}
      </div>
      <div class="book-author"><span>Book by</span><br> ${book.author}</div>
      <div class="book-pages">${book.pages} Pages</div>
      <div class="book-status">${book.read}</div>
      <div class="features">
        <i class="fa-regular fa-heart fa-hearts" onclick="addToFavorites(${index})"></i>
        <i class="fa-regular fa-circle" onclick="changeStatus(${index})"></i>
        <i class="fa-solid fa-trash" onclick="removeBook(${index})"></i>
      </div>
      `
      cardContainer.append(card);
    }
  });
}

function addToFavorites(index){
  if(myLibrary[index].isFavorite === undefined){
    myLibrary[index].isFavorite = true;
    favoriteCount++;
  } else if(myLibrary[index].isFavorite === true){
    myLibrary[index].isFavorite = false;
    favoriteCount--;
  } else if(myLibrary[index].isFavorite === false){
    myLibrary[index].isFavorite = true;
    favoriteCount++;
  }
  console.log(favoriteCount);
  displayBooks();
}

function changeStatus(index){
  if(myLibrary[index].read === "Read"){
    myLibrary[index].read = "Not Started";
  } else if(myLibrary[index].read === "Not Started"){
    myLibrary[index].read = "In Progress";
  } else{
    myLibrary[index].read = "Read";
  }

  displayBooks();
}

function removeBook(index){
  myLibrary.splice(index, 1);
  displayBooks();
}

function showForm(){
  document.querySelector('.pop-bg').style.display = "block";
}

function checkLibrary(){
  console.log(myLibrary);
}

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const titleVal = document.getElementById('title').value;
  const authorVal = document.getElementById('author').value;
  const pagesVal = document.getElementById('pages').value;
  const isReadVal = document.querySelector('input[name="is-read"]:checked').value;

  let book = new Book(titleVal, authorVal, pagesVal, isReadVal);
  addBookToLibrary(book);
  document.querySelector('.pop-bg').style.display = "none";
  document.getElementById('form').reset();
});