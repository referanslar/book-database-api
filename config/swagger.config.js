import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import packageJSON from "../package.json" assert { type: "json" };

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: packageJSON.name,
      description: packageJSON.description,
      version: packageJSON.version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
});

export const serve = swaggerUI.serve;
export const setup = swaggerUI.setup(swaggerSpec);
