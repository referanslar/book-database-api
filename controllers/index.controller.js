import apiService from "../services/index.service.js";

class IndexController {
  async welcomePage(req, res) {
    const result = await apiService.welcomePage();
    res.json({
      message: result,
    });
  }
}

export default new IndexController();
