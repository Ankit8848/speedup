import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import { errorHandler, notFoundHandler } from "./middlewares/error";
import { UPLOAD_ROOT, UPLOAD_URL_PREFIX } from "./lib/uploads";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded media files.
app.use(UPLOAD_URL_PREFIX, express.static(UPLOAD_ROOT));

app.use("/api", router);

// 404 for unmatched API routes, then central error handler (must be last).
app.use("/api", notFoundHandler);
app.use(errorHandler);

export default app;
