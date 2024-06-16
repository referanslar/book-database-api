import createError from "http-errors";

import publisherRepository from "../repositories/publisher.repository.js";

/**
 * Service for interacting with publishers.
 * @class PublishersService
 */
class PublishersService {
  /**
   * Creates a new publisher.
   * @param {Object} publisher - The publisher object to be created.
   * @returns {Promise<Object>} A promise that resolves to the created publisher object.
   */
  async createPublisher(publisher) {
    return await publisherRepository.createPublisher(publisher);
  }

  /**
   * Retrieves a publisher by ID.
   * @param {string} publisherID - The ID of the publisher to retrieve.
   * @returns {Promise<Object>} The publisher object.
   * @throws {createError.NotFound} If the publisher does not exist.
   */
  async getPublisherByID(publisherID) {
    const findPublisher = await publisherRepository.getPublisherByID(publisherID);

    if (!findPublisher) {
      throw new createError.NotFound(`Publisher does not exist.`);
    }

    return findPublisher;
  }
}

export default new PublishersService();
