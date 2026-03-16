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

app.use("/api/v1/movies", movies);

app.all("/{*splat}", (request, response) => {
  res.status(404).json({ error: "not found" });
});

export default app;
