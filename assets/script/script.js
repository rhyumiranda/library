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
  updateDisplayCount()
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
        <div class="book-status" id="reading-status-${index}">${book.read}</div>
        <div class="features">
          <i class="fa-regular fa-heart fa-hearts" style="font-weight: 700;" onclick="addToFavorites(${index})"></i>
          <i class="fa-regular fa-circle" id="status-${index}" onclick="changeStatus(${index})"></i>
          <i class="fa-solid fa-trash" onclick="removeBook(${index})"></i>
        </div>
      `;
      cardContainer.append(card);
      updateStatusDisplay(index);
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

function addToFavorites(index){
  if(myLibrary[index].isFavorite === undefined){
    myLibrary[index].isFavorite = true;
  } else if(myLibrary[index].isFavorite === true){
    myLibrary[index].isFavorite = false;
  } else if(myLibrary[index].isFavorite === false){
    myLibrary[index].isFavorite = true;
  }

  displayBooks();
  updateDisplayCount()
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
  updateStatusDisplay(index);
}

function updateStatusDisplay(index){
  let circleStatusClr = document.getElementById(`status-${index}`);
  let readingStatusTxtClr = document.getElementById(`reading-status-${index}`);

  if(myLibrary[index].read === "Read"){
    readingStatusTxtClr.style.color = '#428745';
    circleStatusClr.style.color = '#428745';
    circleStatusClr.style.fontWeight = '700';
  } else if(myLibrary[index].read === "Not Started"){
    readingStatusTxtClr.style.color = '#ff0000';
    circleStatusClr.style.color = '#ff0000';
    circleStatusClr.style.fontWeight = '700';
  } else{
    readingStatusTxtClr.style.color = '#c18e31';
    circleStatusClr.style.color = '#c18e31';
    circleStatusClr.style.fontWeight = '700';
  }

  updateDisplayCount()
}

function updateDisplayCount(){
  let isFavoriteFiltered = myLibrary.filter(item => {
    return item.isFavorite == true;
  }).length;

  let haveRead = myLibrary.filter(item => {
    return item.read == "Read";
  }).length;

  let isReading = myLibrary.filter(item => {
    return item.read == "In Progress";
  }).length;

  let willRead = myLibrary.filter(item => {
    return item.read == "Not Started";
  }).length;

  const parentDisplay = document.getElementById('count-display').children;
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
}

function removeBook(index){
  myLibrary.splice(index, 1);
  displayBooks();
  updateDisplayCount()
}

function showForm(){
  document.querySelector('.pop-bg').style.display = "block";
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