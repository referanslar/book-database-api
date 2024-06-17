import booksService from "../services/books.service.js";

class BooksController {
  async createBook(req, res, next) {
    try {
      const book = {
        title: req.body.title,
        authorID: req.body.authorID,
        image: req.body.image,
        publisherID: req.body.publisherID,
        published: req.body.published,
        isbn13: req.body.isbn13,
        isbn10: req.body.isbn10,
        status: req.body.status,
      };
      const result = await booksService.createBook(book);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getBooks(req, res, next) {
    try {
      const { currentPage, perPage } = req.query;
      const books = await booksService.getBooks(currentPage, perPage);

      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  async getBookByISBN(req, res, next) {
    try {
      const { isbn } = req.params;
      const result = await booksService.getBookByISBN(isbn);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new BooksController();
