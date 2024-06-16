import createError from "http-errors";

import authorRepository from "../repositories/author.repository.js";

/**
 * A class representing an authors service.
 * @class AuthorsService
 */
class AuthorsService {
  /**
   * Creates a new author.
   * @param {Object} author - The author object to be created.
   * @returns {Promise} A promise that resolves with the created author.
   */
  async createAuthor(author) {
    return await authorRepository.createAuthor(author);
  }

  /**
   * Retrieves a list of authors.
   * @param {number} currentPage - The current page number.
   * @param {number} perPage - The number of authors to retrieve per page.
   * @returns {Promise<Array>} - A promise that resolves to an array of authors.
   */
  async getAuthors(currentPage, perPage) {
    return await authorRepository.getAuthors(currentPage, perPage);
  }

  /**
   * Retrieves an author by their ID.
   * @param {number} authorID - The ID of the author to retrieve.
   * @returns {Promise<Object>} A promise that resolves to the author object.
   */
  async getAuthorByID(authorID) {
    return await authorRepository.getAuthorByID(authorID);
  }

  /**
   * Updates an author in the database.
   * @param {string} authorID - The ID of the author to update.
   * @param {object} author - The updated author object.
   * @returns {Promise<object>} - The updated author object.
   */
  async updateAuthor(authorID, author) {
    const findAuthor = await this.isAuthorExists(authorID);
    return await authorRepository.updateAuthor(findAuthor.id, author);
  }

  /**
   * Deletes an author from the database.
   * @param {string} authorID - The ID of the author to be deleted.
   * @returns {Promise} A promise that resolves when the author is successfully deleted.
   */
  async deleteAuthor(authorID) {
    const findAuthor = await this.isAuthorExists(authorID);

    // TODO: Check if the author has any books associated with them before deleting.

    return await authorRepository.deleteAuthor(findAuthor.id);
  }

  /**
   * Checks if an author exists based on the provided author ID.
   * @param {string} authorID - The ID of the author to check.
   * @returns {Promise<Object>} - A promise that resolves to the found author object if it exists.
   * @throws {Error} - Throws a 404 error if the author does not exist.
   */
  async isAuthorExists(authorID) {
    const findAuthor = await this.getAuthorByID(authorID);

    if (!findAuthor) {
      throw createError(404, "Author does not exist, please check the author ID.");
    }

    return findAuthor;
  }
}

export default new AuthorsService();
