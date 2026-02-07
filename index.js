import express from "express";
import swaggerUI from "swagger-ui-express";
import Yaml from "yamljs";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

const app = express();
const swaggerDocs = Yaml.load("./swagger.yaml");

// middleware
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs)); // setup and configure yaml file


// routers
app.get("/health", (req, res) => {
  res.send("this is health");
});


// connect database
const PASSWORD = process.env.DB_USER_PASSWORD;
const connectURL = process.env.DB_URL.replace("<db_password>", PASSWORD);

mongoose
  .connect(`${connectURL}/${process.env.DB_NAME}`)
  .then(() => {
    console.log("Database connected");

    app.listen(3000, () => {
      console.log("server on...");
    });
  })
  .catch((e) => {
    console.log(e);
  });
