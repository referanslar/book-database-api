import authorsService from "../services/authors.service.js";

class AuthorsController {
  async createAuthor(req, res, next) {
    try {
      const author = {
        name: req.body.name,
        country: req.body.country,
      };
      const result = await authorsService.createAuthor(author);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAuthors(req, res, next) {
    try {
      const { currentPage, perPage } = req.query;
      const authors = await authorsService.getAuthors(currentPage, perPage);

      res.status(200).json(authors);
    } catch (error) {
      next(error);
    }
  }

  async getAuthorByID(req, res, next) {
    try {
      const { authorID } = req.params;
      const author = await authorsService.getAuthorByID(authorID);

      res.status(200).json(author);
    } catch (error) {
      next(error);
    }
  }

  async updateAuthor(req, res, next) {
    try {
      const { authorID } = req.params;
      const author = {
        name: req.body.name,
        country: req.body.country,
      };
      const result = await authorsService.updateAuthor(authorID, author);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteAuthor(req, res, next) {
    try {
      const { authorID } = req.params;
      await authorsService.deleteAuthor(authorID);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthorsController();
