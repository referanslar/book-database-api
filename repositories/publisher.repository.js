import postgres from "../database/postgres.database.js";

/**
 * Repository for interacting with the publishers table.
 * @class PublisherRepository
 */
class PublisherRepository {
  /**
   * Creates a new publisher.
   * @param {Object} publisher - The publisher data.
   * @returns {Promise<Object>} The created publisher.
   */
  async createPublisher(publisher) {
    return await postgres.prisma.publisher.create({ data: publisher });
  }

  /**
   * Retrieves a publisher by its ID.
   * @param {number} publisherID - The ID of the publisher to retrieve.
   * @returns {Promise<Object|null>} A promise that resolves to the publisher object if found, or null if not found.
   */
  async getPublisherByID(publisherID) {
    return await postgres.prisma.publisher.findUnique({
      where: { id: Number(publisherID) },
    });
  }
}

export default new PublisherRepository();
