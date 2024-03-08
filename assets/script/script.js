const myLibrary = [];

function Book(title, author, pages, status) {
  this.name = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

let book1 = new Book ("Harry Potter", "J.K. Rowling", "295", "Read");

console.log(book1.name);