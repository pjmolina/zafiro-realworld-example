import * as express from "express";
import * as request from "supertest";
import { injectable } from "inversify";
import { Repository } from "typeorm";
import { interfaces as expressInterfaces } from "inversify-express-utils";

function _httRequest<TData>(
    app: express.Application,
    url: string,
    data?: TData | null,
    requestHeaders?: ([string, string][]) | null,
    expectedResponseCode?: number | null,
    expectedResponseHeaders?: ([string, string][]) | null
) {
    return new Promise<request.Response>((resolve, reject) => {

        let r = request(app).post("/api/v1/posts/");

        if (requestHeaders) {
            requestHeaders.forEach(h => {
                r = r.set(h[0], h[1])
            });
        }

        if (data) {
            r = r.send(data);
        }
        
        if (expectedResponseCode) {
            r = r.expect(expectedResponseCode)
        }

        if (expectedResponseHeaders) {
            expectedResponseHeaders.forEach(h => {
                r = r.expect(h[0], h[1])
            });
        }
        
        r.end(function(err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });

    });
}

export function httGet(
    app: express.Application,
    url: string,
    requestHeaders?: ([string, string][]) | null,
    expectedResponseCode?: number | null,
    expectedResponseHeaders?: ([string, string][]) | null
) {
    return _httRequest(
        app,
        url,
        null,
        requestHeaders,
        expectedResponseCode,
        expectedResponseHeaders
    );
}

export function httPost<TData>(
    app: express.Application,
    url: string,
    data: TData,
    requestHeaders?: ([string, string][]) | null,
    expectedResponseCode?: number | null,
    expectedResponseHeaders?: ([string, string][]) | null
) {
    return _httRequest<TData>(
        app,
        url,
        data,
        requestHeaders,
        expectedResponseCode,
        expectedResponseHeaders
    );
}
