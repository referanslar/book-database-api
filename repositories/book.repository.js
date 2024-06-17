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
        select: {
          id: true,
          title: true,
          image: true,
          published: true,
          isbn13: true,
          isbn10: true,
          author: {
            select: {
              id: true,
              name: true,
              country: true,
            },
          },
          publisher: {
            select: {
              id: true,
              name: true,
              country: true,
            },
          },
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
        select: {
          id: true,
          title: true,
          image: true,
          published: true,
          isbn13: true,
          isbn10: true,
          author: {
            select: {
              id: true,
              name: true,
              country: true,
            },
          },
          publisher: {
            select: {
              id: true,
              name: true,
              country: true,
            },
          },
        },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Could not fetch books by ISBN-13.");
    }
  }

  /**
   * Counts the number of books in the database.
   * @returns {Promise<number>} The number of books in the database.
   * @throws {Error} If there is an error while counting the books.
   */
  async countBooks() {
    try {
      return await postgres.prisma.book.count();
    } catch (error) {
      logger.error(error);
      throw createError(500, "Could not count books.");
    }
  }

  /**
   * Retrieves a paginated list of books from the database.
   * @param {number} [currentPage = 1] - The current page number.
   * @param {number} [perPage = 10] - The number of books to display per page.
   * @returns {Promise<Object>} The paginated list of books.
   * @throws {Error} If there is an error fetching the books.
   */
  async getBooks(currentPage = 1, perPage = 10) {
    try {
      currentPage = parseInt(currentPage, 10);
      perPage = parseInt(perPage, 10);

      if (isNaN(currentPage) || currentPage < 1) {
        currentPage = 1;
      }
      if (isNaN(perPage) || perPage < 1) {
        perPage = 10;
      }

      const skip = (currentPage - 1) * perPage;
      const totalBooks = await this.countBooks();
      const books = await postgres.prisma.book.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        select: {
          id: true,
          title: true,
          image: true,
          published: true,
          isbn13: true,
          isbn10: true,
          author: {
            select: {
              id: true,
              name: true,
              country: true,
            },
          },
          publisher: {
            select: {
              id: true,
              name: true,
              country: true,
            },
          },
        },
      });
      return {
        totalBooks,
        currentPage,
        perPage,
        totalPages: Math.ceil(totalBooks / perPage),
        books,
      };
    } catch (error) {
      logger.error(error);
      throw createError(500, "Could not fetch books.");
    }
  }
}

export default new BookRepository();
