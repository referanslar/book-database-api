import publishersService from "../services/publishers.service.js";

class PublishersController {
  async createPublisher(req, res, next) {
    try {
      const publisher = {
        name: req.body.name,
        country: req.body.country,
      };
      const result = await publishersService.createPublisher(publisher);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getPublisherByID(req, res, next) {
    try {
      const { publisherID } = req.params;
      const result = await publishersService.getPublisherByID(publisherID);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new PublishersController();
