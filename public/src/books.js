
function findAuthorById(authors, id) {
  return authors.find( (author) => author["id"] === id )
}

function findBookById(books, id) {
  return books.find( (book) => book["id"] === id )
}

function partitionBooksByBorrowedStatus(books) {
  let finalArray = []
  let checkedOutBooks = []
  let returnedBooks = []
  for ( let book of books ){
    let borrowArray = book["borrows"]
    if (borrowArray.some( (borrowers) => !borrowers["returned"])){
      checkedOutBooks.push(book)
    }
    else returnedBooks.push(book)
  }
  finalArray.push(checkedOutBooks)
  finalArray.push(returnedBooks)
  return finalArray
}
 
function getBorrowersForBook(book, accounts) {
  let finalArray = []
  const selectedBorrowsArray = book["borrows"]
  selectedBorrowsArray.forEach( entry => {
    let eachId = entry["id"]
    let returnedStatus = entry["returned"]
    accounts.forEach( person => {
      if (eachId === person["id"]){
        person["returned"] = returnedStatus
        finalArray.push(person)
      }
    })
  })
  finalArray.splice(10)
  return finalArray
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
