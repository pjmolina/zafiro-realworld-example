import * as express from "express";

export const forbidden = (res: express.Response) => {
    res.status(403).send("Forbidden");
}

export const unauthorized = (res: express.Response) => {
    res.status(401).send("Unauthorized");
}
