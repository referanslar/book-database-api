import request from "supertest";
import bodyParser from "body-parser";

import app from "../../app.js";
import booksRouter from "../../routes/books.routes.js";

jest.mock("redis", () => ({
  createClient: () => ({
    on: jest.fn(),
    quit: jest.fn(),
  }),
}));

jest.mock("../../middleware/auth-check.middleware.js", () => (req, res, next) => next());
jest.mock("../../middleware/admin-check.middleware.js", () => (req, res, next) => next());

jest.mock("../../middleware/rate-limit.middleware.js", () => ({
  authLimiter: (req, res, next) => next(),
}));

jest.mock("../../validators/books.validator.js", () => ({
  createBook: (req, res, next) => next(),
  getBooks: (req, res, next) => next(),
  getBookByISBN: (req, res, next) => next(),
}));

jest.mock("../../controllers/books.controller.js", () => ({
  createBook: (req, res) => res.status(201).json({ message: "Book created" }),
  getBooks: (req, res) => res.status(200).json([]),
  getBookByISBN: (req, res) => res.status(200).json({}),
}));

app.use(bodyParser.json());
app.use("/api/books", booksRouter);

describe("Books Routes", () => {
  describe("POST /api/books", () => {
    it("should create a book and return 201", async () => {
      const response = await request(app)
        .post("/api/books")
        .send({
          title: "Harry Potter and the Philosopher's Stone",
          authorID: 1,
          image: "path/to/image.jpg",
          publisherID: 1,
          published: "1997",
          isbn13: "9780747532699",
          isbn10: "0747532699",
          status: "active",
        })
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: "Book created" });
    });
  });

  describe("GET /api/books", () => {
    it("should get a list of books and return 200", async () => {
      const response = await request(app).get("/api/books");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe("GET /api/books/search/:isbn", () => {
    it("should get a book by ISBN and return 200", async () => {
      const isbn = "9780747532699";
      const response = await request(app).get(`/api/books/search/${isbn}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });
  });
});
