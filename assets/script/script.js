const myLibrary = [];
const formInput = document.querySelector('.pop-bg');
const form = document.getElementById('form')
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');

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
        <i class="fa-solid fa-trash" onclick="removeBook(${index})"></i>
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
  const isRead = document.querySelector('input[name="is-read"]:checked');
  const isReadVal = isRead.value;

  let book = new Book(titleVal, authorVal, pagesVal, isReadVal);
  addBookToLibrary(book);
  formInput.style.display = "none";
  form.reset();
})

