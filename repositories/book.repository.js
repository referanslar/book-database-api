import createError from "http-errors";

import postgres from "../database/postgres.database.js";
import logger from "../helpers/logger.helper.js";

class BookRepository {
  /**
   * Creates a new book in the database.
   * @param {object} book - The book object to be created.
   * @returns {Promise<object>} - A promise that resolves to the created book object.
   * @throws {Error} - If the book could not be created.
   */
  async createBook(book) {
    try {
      return await postgres.prisma.book.create({ data: book });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Could not create book.");
    }
  }

  /**
   * Retrieves a book from the database by its ID.
   * @param {string} bookID - The ID of the book to retrieve.
   * @returns {Promise<Object>} A promise that resolves to the book object.
   * @throws {Error} If there is an error retrieving the book.
   */
  async getBookByID(bookID) {
    try {
      return await postgres.prisma.book.findUnique({
        where: { id: String(bookID) },
        include: {
          author: true,
          publisher: true,
        },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Could not fetch book by ID.");
    }
  }

  /**
   * Retrieves books from the database by ISBN-10.
   * @param {string} isbn10 - The ISBN-10 of the book(s) to retrieve.
   * @returns {Promise<Array>} - A promise that resolves to an array of books matching the given ISBN-10.
   * @throws {Error} - If there is an error while fetching the books.
   */
  async getBooksByISBN10(isbn10) {
    try {
      return await postgres.prisma.book.findMany({
        where: { isbn10: isbn10 },
        include: {
          author: true,
          publisher: true,
        },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Could not fetch books by ISBN-10.");
    }
  }

  /**
   * Retrieves books from the database by ISBN-13.
   *
   * @param {string} isbn13 - The ISBN-13 of the book(s) to retrieve.
   * @returns {Promise<Array>} - A promise that resolves to an array of books matching the given ISBN-13.
   * @throws {Error} - If there is an error while fetching the books.
   */
  async getBooksByISBN13(isbn13) {
    try {
      return await postgres.prisma.book.findMany({
        where: { isbn13: isbn13 },
        include: {
          author: true,
          publisher: true,
        },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Could not fetch books by ISBN-13.");
    }
  }
}

export default new BookRepository();
