import createError from "http-errors";

import bookRepository from "../repositories/book.repository.js";

import authorsService from "./authors.service.js";
import publishersService from "./publishers.service.js";

class BooksService {
  /**
   * Creates a new book.
   * @param {Object} book - The book object to be created.
   * @returns {Promise<Object>} - A promise that resolves to the created book object.
   * @throws {Error} - If the ISBN-10 or ISBN-13 already exists, or if the author or publisher is not found.
   */
  async createBook(book) {
    await this.isISBN10Exists(book.isbn10);
    await this.isISBN13Exists(book.isbn13);
    await authorsService.isAuthorExists(book.authorID);

    // TODO: Create isPublisherExists method in publishers.service.js
    const searchPublisher = await publishersService.getPublisherByID(book.publisherID);

    if (!searchPublisher) {
      throw createError(404, "Publisher not found.");
    }

    return await bookRepository.createBook(book);
  }

  /**
   * Checks if an ISBN10 already exists in the book database.
   * @param {string} isbn10 - The ISBN10 to check.
   * @returns {Promise<void>} A promise that resolves if the ISBN10 does not exist.
   * @throws {Error} Throws an error if the ISBN10 already exists.
   */
  async isISBN10Exists(isbn10) {
    const searchISBN10 = await bookRepository.getBooksByISBN10(isbn10);

    if (searchISBN10.length > 0) {
      throw createError(409, "ISBN10 already exists.");
    }
  }

  /**
   * Checks if an ISBN13 already exists in the book database.
   * @param {string} isbn13 - The ISBN13 to check.
   * @returns {Promise<void>} A promise that resolves if the ISBN13 does not exist.
   * @throws {Error} Throws an error with status code 409 if the ISBN13 already exists.
   */
  async isISBN13Exists(isbn13) {
    const searchISBN13 = await bookRepository.getBooksByISBN13(isbn13);

    if (searchISBN13.length > 0) {
      throw createError(409, "ISBN13 already exists.");
    }
  }

  /**
   * Retrieves a book by its ISBN-10 number.
   * @param {string} isbn10 - The ISBN-10 number of the book.
   * @returns {Object} - The book object containing its details.
   * @throws {Error} - If the book is not found.
   */
  async getBookByISBN10(isbn10) {
    const searchISBN10 = await bookRepository.getBooksByISBN10(isbn10);

    if (!searchISBN10.length > 0) {
      throw createError(404, "Book not found.");
    }

    return {
      id: searchISBN10[0].id,
      title: searchISBN10[0].title,
      author: searchISBN10[0].author.name,
      image: searchISBN10[0].image,
      publisher: searchISBN10[0].publisher.name,
      published: searchISBN10[0].published,
      isbn13: searchISBN10[0].isbn13,
      isbn10: searchISBN10[0].isbn10,
    };
  }

  /**
   * Retrieves a book by its ISBN-13 number.
   * @param {string} isbn13 - The ISBN-13 number of the book.
   * @returns {Object} - The book object containing its details.
   * @throws {Error} - If the book is not found.
   */
  async getBookByISBN13(isbn13) {
    const searchISBN13 = await bookRepository.getBooksByISBN13(isbn13);

    if (!searchISBN13.length > 0) {
      throw createError(404, "Book not found.");
    }

    return {
      id: searchISBN13[0].id,
      title: searchISBN13[0].title,
      author: searchISBN13[0].author.name,
      image: searchISBN13[0].image,
      publisher: searchISBN13[0].publisher.name,
      published: searchISBN13[0].published,
      isbn13: searchISBN13[0].isbn13,
      isbn10: searchISBN13[0].isbn10,
    };
  }

  /**
   * Retrieves a book from the database based on the provided ISBN.
   * @param {string} isbn - The ISBN of the book.
   * @returns {Promise<Object>} - A promise that resolves to the book object.
   * @throws {Error} - Throws an error if the ISBN is invalid.
   */
  async getBookByISBN(isbn) {
    const len = isbn.length;

    if (len === 10) {
      return await this.getBookByISBN10(isbn);
    } else if (len === 13) {
      return await this.getBookByISBN13(isbn);
    }

    throw createError(400, "Invalid ISBN.");
  }

  /**
   * Retrieves a list of books from the book repository.
   * @param {number} currentPage - The current page number.
   * @param {number} perPage - The number of books to retrieve per page.
   * @returns {Promise<Array>} A promise that resolves to an array of books.
   */
  async getBooks(currentPage, perPage) {
    return await bookRepository.getBooks(currentPage, perPage);
  }
}

export default new BooksService();
