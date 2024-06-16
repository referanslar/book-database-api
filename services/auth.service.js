import createError from "http-errors";

import usersService from "./users.service.js";
import tokenService from "./token.service.js";

/**
 * Service class for handling user authentication.
 * @class AuthService
 */
class AuthService {
  /**
   * Sign up a new user.
   * @param {Object} user - The user object containing the user's information.
   * @returns {Object} - The created user object with the following properties:
   *   - id: The ID of the created user.
   *   - name: The name of the created user.
   *   - surname: The surname of the created user.
   *   - email: The email address of the created user.
   */
  async signup(user) {
    const createdUser = await usersService.createUser(user);

    return {
      id: createdUser.id,
      name: createdUser.name,
      surname: createdUser.surname,
      email: createdUser.email,
    };
  }

  /**
   * Sign in a user.
   * @param {Object} user - The user object containing email and password.
   * @returns {Object} - The user object with id, name, surname, email, and tokens.
   * @throws {Error} - If the email or password is invalid.
   */
  async signin(user) {
    const findUser = await usersService.getUserByEmail(user.email);

    if (!findUser) {
      throw createError.Unauthorized("Invalid email or password.");
    }

    const isValidPassword = await usersService.isValidPassword(user.password, findUser.password);

    if (!isValidPassword) {
      throw createError.Unauthorized("Invalid email or password.");
    }

    const access_token = await tokenService.createAccessToken(findUser.id);
    const refresh_token = await tokenService.createRefreshToken(findUser.id);

    return {
      id: findUser.id,
      name: findUser.name,
      surname: findUser.surname,
      email: findUser.email,
      tokens: {
        access_token,
        refresh_token,
      },
    };
  }

  /**
   * Refreshes the access and refresh tokens for a given token.
   * @param {string} token - The refresh token to be verified and refreshed.
   * @returns {Promise<Object>} - An object containing the userID and the new access and refresh tokens.
   */
  async refresh(token) {
    const userID = await tokenService.verifyRefreshToken(token);

    const access_token = await tokenService.createAccessToken(userID);
    const refresh_token = await tokenService.createRefreshToken(userID);

    return {
      userID,
      tokens: {
        access_token: access_token,
        refresh_token: refresh_token,
      },
    };
  }

  /**
   * Signs out the user by deleting the refresh token associated with the given token.
   * @param {string} refreshToken - The refresh token to be verified and deleted.
   * @returns {Promise<void>} - A promise that resolves when the refresh token is deleted.
   */
  async signout(refreshToken) {
    const userID = await tokenService.verifyRefreshToken(refreshToken);
    await tokenService.deleteRefreshToken(userID);
  }
}

export default new AuthService();
