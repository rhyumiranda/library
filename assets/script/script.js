const myLibrary = [];

function Book(title, author, pages, status) {
  this.name = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

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





