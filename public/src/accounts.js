
function findAccountById(accounts, id) {
  return accounts.find( (account) => account.id === id )
}

function sortAccountsByLastName(accounts) {
  return accounts.sort( (LastNameA, LastNameB) => (LastNameA["name"]["last"] > LastNameB["name"]["last"] ? 1 : -1))
}

//let result = parks.filter((park) => park.rating >= 4.5)

function getTotalNumberOfBorrows(account, books) {
  let timesBorrowed = 0;
  let borrowedBooks = books.filter( book => book["borrows"].length > 1)
  for ( let book of borrowedBooks ){
    let borrowArray = book["borrows"]
    if (borrowArray.some( (borrowers) => borrowers["id"] === account["id"] )){
       timesBorrowed++
    }
  }
  return timesBorrowed
}

function getBooksPossessedByAccount(account, books, authors) {
  let finalArray = []
  const accountId = account["id"]
  books.forEach( book => {
    let borrowArray = book["borrows"]
    borrowArray.forEach( borrow => { 
      if ( borrow["id"] === accountId && !borrow["returned"]){
        let authorInfo = authors.find( author => author["id"] === book["authorId"] )
        book["author"] = authorInfo
        finalArray.push(book)
      }
    })
  })
  return finalArray
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
