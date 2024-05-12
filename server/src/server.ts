import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/", (req, res) => {
  res.send("Server On");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
