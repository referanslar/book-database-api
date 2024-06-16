import postgres from "../database/postgres.database.js";

/**
 * A class representing an author repository.
 * @class AuthorRepository
 */
class AuthorRepository {
  /**
   * Creates a new author in the database.
   * @param {Object} author - The author object to be created.
   * @returns {Promise<Object>} - A promise that resolves to the created author object.
   */
  async createAuthor(author) {
    return await postgres.prisma.author.create({ data: author });
  }

  /**
   * Counts the number of authors in the database.
   * @returns {Promise<number>} The total number of authors.
   */
  async countAuthors() {
    return await postgres.prisma.author.count();
  }

  /**
   * Retrieves a paginated list of authors.
   * @param {number} [currentPage = 1] - The current page number.
   * @param {number} [perPage = 10] - The number of authors to retrieve per page.
   * @returns {Promise<Object>} An object containing the paginated list of authors.
   */
  async getAuthors(currentPage = 1, perPage = 10) {
    const skip = (currentPage - 1) * perPage;
    const totalAuthors = await this.countAuthors();
    const authors = await postgres.prisma.author.findMany({
      skip: skip,
      take: perPage,
    });
    return {
      totalAuthors,
      currentPage,
      perPage,
      totalPages: Math.ceil(totalAuthors / perPage),
      authors,
    };
  }

  /**
   * Retrieves authors by country.
   * @param {string} country - The country to filter authors by.
   * @returns {Promise<Array>} - A promise that resolves to an array of authors.
   */
  async getAuthorsByCountry(country) {
    return await postgres.prisma.author.findMany({
      where: { country: country },
    });
  }

  /**
   * Retrieves an author by their ID.
   * @param {number} authorID - The ID of the author.
   * @returns {Promise<Object|null>} - A promise that resolves to the author object if found, or null if not found.
   */
  async getAuthorByID(authorID) {
    return await postgres.prisma.author.findUnique({
      where: { id: Number(authorID) },
    });
  }

  /**
   * Updates an author in the database.
   * @param {number} authorID - The ID of the author to update.
   * @param {object} author - The updated author data.
   * @returns {Promise<object>} - A promise that resolves to the updated author object.
   */
  async updateAuthor(authorID, author) {
    return await postgres.prisma.author.update({
      where: { id: Number(authorID) },
      data: author,
    });
  }

  /**
   * Deletes an author from the database.
   * @param {number} authorID - The ID of the author to delete.
   * @returns {Promise<void>} - A promise that resolves when the author is deleted.
   */
  async deleteAuthor(authorID) {
    return await postgres.prisma.author.delete({
      where: { id: Number(authorID) },
    });
  }
}

export default new AuthorRepository();
