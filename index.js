const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const Pack = require("./package.json");
const mongoose = require("mongoose");
const HapiSwagger = require("hapi-swagger");
require("dotenv").config();

const Routes = require("./backend/routes/index");
const { checkAccess } = require("./backend/utils/auth");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const init = async () => {
  const server = Hapi.server({
    port: 4000,
    host: "localhost",
  });

  const swaggerOptions = {
    host: process.env.HOST,
    info: {
      title: "Learning management system API Documentation",
      version: Pack.version,
      contact: {
        name: "OOSHA",
      },
    },
    grouping: "tags",
    schemes: ["http", "https"],
    securityDefinitions: {
      jwt: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    security: [{ jwt: [] }],
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  try {
    await server.start();
    console.log("Server running at:", server.info.uri);
    console.log(
      `Swagger documentation is running on ${server.info.uri}/documentation`
    );
  } catch (err) {
    console.log(err.message);
  }

  server.auth.scheme("custom", checkAccess);
  server.auth.strategy("default", "custom");

  server.route(Routes);
};

db.on("connected", () => {
  console.log("Connected to DB");
  init();
});

db.on("error", (err) => {
  console.log("Connection to DB failed", err);
  process.exit(0);
});

db.on("disconnected", () => {
  console.log("Connection teminated to DB");
  process.exit(0);
});

process.on("unhandledRejection", (err) => {
  console.error("DB unhandled rejection", err);
  process.exit(1);
});
