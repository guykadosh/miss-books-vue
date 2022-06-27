import { utilService } from './util-service.js'
import booksData from '../../data/books.json' assert { type: 'json' }
import { storageService } from './async-storage-service.js'

const BOOKS_KEY = 'booksDB'
_createBooks()

export const bookService = {
  query,
  remove,
  get,
  save,
  addReview,
  removeReview,
}

function query() {
  return storageService.query(BOOKS_KEY)
}

function remove(bookId) {
  return storageService.remove(BOOKS_KEY, bookId)
}

function get(bookId) {
  return storageService.get(BOOKS_KEY, bookId)
}

function save(book) {
  if (book.id) return storageService.put(BOOKS_KEY, book)
  else return storageService.post(BOOKS_KEY, book)
}

function addReview(bookId, review) {
  return storageService.get(BOOKS_KEY, bookId).then(book => {
    review.id = utilService.makeId(3)
    book.reviews.push(review)
    return save(book)
  })
}

function removeReview(bookId, reviewId) {
  return get(bookId).then(book => {
    const idx = book.reviews.findIndex(review => reviewId === review.id)
    book.reviews.splice(idx, 1)
    return save(book)
  })
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOKS_KEY)
  if (!books || !books.length) {
    books = booksData
    books.forEach(book => (book.reviews = []))
    utilService.saveToStorage(BOOKS_KEY, books)
  }
  return books
}
