import authService from "../services/auth.service.js";

class AuthController {
  async signup(req, res, next) {
    try {
      const user = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
      };

      const result = await authService.signup(user);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async signin(req, res, next) {
    try {
      const user = {
        email: req.body.email,
        password: req.body.password,
      };

      const result = await authService.signin(user);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const refreshToken = req.body.refreshToken;
      const result = await authService.refresh(refreshToken);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async signout(req, res, next) {
    try {
      const refreshToken = req.body.refreshToken;
      await authService.signout(refreshToken);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
