
function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

// Helper Function
function reducedArray(books){
  const reducedArray = books.reduce( (result, book) => {
    result[book["id"]] = book["borrows"]
    return result
  }, {})
  return reducedArray
}

function getBooksBorrowedCount(books) {
  const reducedObject = reducedArray(books)
  let numberOfCheckedOutBooks = 0
  for ( let item in reducedObject ){
    let borrowArray = reducedObject[item]
    if (borrowArray.some( (borrowers) => !borrowers["returned"])){
      numberOfCheckedOutBooks++
    }
  }
  return numberOfCheckedOutBooks
}

// Helper function
function getListOfGenres(books){
  return books.map( (book) => book["genre"] )
}

function getMostCommonGenres(books) {
  let finalArray = []
  let arrayOfGenres = getListOfGenres(books)
  arrayOfGenres.forEach( (genre) => {
    const selected = finalArray.find( item  => item.name === genre)
    if (!selected){
      finalArray.push( { name: genre, count: 1} )
    }
    else {selected.count++}
  })

  finalArray.sort( ( genreA, genreB ) => genreB.count - genreA.count)
  finalArray.splice(5)
 
  return finalArray
}

function getMostPopularBooks(books) {
  let finalArray = []
  books.forEach( (book) => {
    const selected = finalArray.find( item  => item.name === book["id"])
    if (!selected){
      finalArray.push( { name: book["title"], count: book["borrows"].length} )
    }
  })
  finalArray.sort( ( genreA, genreB ) => genreB.count - genreA.count)
  finalArray.splice(5)
  return finalArray
}

function getMostPopularAuthors(books, authors) {
  let finalArray = []
  books.forEach( (book) => {
    const authorNumber = book["authorId"]
    authors.forEach( author => {
      if ( author["id"] === authorNumber ){
        const authorFirstName = author["name"]["first"]
        const authorLastName = author["name"]["last"]
        const authorName = `${authorFirstName} ${authorLastName}`
        finalArray.push( { name: authorName, count: book["borrows"].length} )
      }
    })})
  finalArray.sort( ( genreA, genreB ) => genreB.count - genreA.count)
  finalArray.splice(5)
  return finalArray
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
