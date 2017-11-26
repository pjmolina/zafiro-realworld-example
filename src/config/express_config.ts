import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";

export const expressConfig = (app: express.Application) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(helmet());
};
