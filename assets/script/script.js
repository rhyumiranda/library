const myLibrary = [];
const formInput = document.querySelector('.pop-bg');
const form = document.getElementById('form')
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const stat = document.getElementById('status');

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

  myLibrary.forEach((book, index) => {
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
        <i class="fa-regular fa-heart fa-hearts"></i>
        <i class="fa-regular fa-circle"></i>
        <i class="fa-solid fa-trash"></i>
      </div>
    `
    cardContainer.append(card);
  });
}

function showForm(){
  formInput.style.display = "block";
}

function removeBook(index){
  myLibrary.splice(index, 1);
  displayBooks();
}

function checkLibrary(){
  console.log(myLibrary);
}

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const titleVal = title.value;
  const authorVal = author.value;
  const pagesVal = pages.value;
  const statVal = stat.value;

  let book = new Book(titleVal, authorVal, pagesVal, statVal);
  addBookToLibrary(book);
  formInput.style.display = "none";
  form.reset();
});


/*
function createBook(){
  const cardContainer = document.getElementById('card-container');
  const card = document.createElement('div');
  card.classList.add('card');
  
  const textContainer = document.createElement('div');
  textContainer.classList.add('text-container');
  
  const bookTitle = document.createElement('div');
  bookTitle.classList.add('book-title');
  bookTitle.textContent = "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones";
  
  const bookAuthor = document.createElement('div');
  bookAuthor.classList.add('book-author');
  bookAuthor.innerHTML = "<span>Book by</span><br>James Clear";
  
  const bookPages = document.createElement('div');
  bookPages.classList.add('book-pages');
  bookPages.textContent = "381 Pages";
  
  const bookStatus = document.createElement('div');
  bookStatus.classList.add('book-status');
  bookStatus.textContent = "Read";
  
  const features = document.createElement('div');
  features.classList.add('features');
  
  const addFavorite = document.createElement('i');
  addFavorite.classList.add('fa-regular', 'fa-heart', 'fa-hearts');
  
  const changeStatus = document.createElement('i');
  changeStatus.classList.add('fa-regular', 'fa-circle');
  
  const removeItem = document.createElement('i');
  removeItem.classList.add('fa-solid', 'fa-trash');
  
  textContainer.appendChild(bookTitle);
  textContainer.appendChild(bookAuthor);
  textContainer.appendChild(bookPages);
  textContainer.appendChild(bookStatus);
  textContainer.appendChild(features);
  features.appendChild(addFavorite);
  features.appendChild(changeStatus);
  features.appendChild(removeItem);
  card.appendChild(textContainer)
  cardContainer.appendChild(card);
}
*/



