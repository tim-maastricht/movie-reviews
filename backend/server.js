import express from "express";
import cors from "cors";
import movies from "./api/movies.route.js";

const app = express();

app.use(
  cors(
    {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  ),
);

// enable preflight response for all routes
app.options("*", cors());

app.use(express.json());

app.use("/api/v1/movies", movies); // TODO: refactor
app.use("/./", (request, response) => {
  // using regex because wildcard * was invalid
  response.status(404).json({ error: "not found" });
});
// TODO: add more custom response status codes
export default app;
