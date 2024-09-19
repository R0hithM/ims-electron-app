"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowCrossDomain = (req, res, next) => {
    const allowedOrigins = [
        'localhost:4200',
        'localhost:8000',
        'http://localhost:4200',
        'http://localhost:8000',
        'http://139.59.62.15:4000',
        '159.65.155.140:8000',
        'http://139.59.62.15:4200',
        '159.65.155.140:8004',
        'https://ims.devlats.com',
        'ims-api.devlats.com', // Dev API - Domain
    ];
    const origin = req.headers.origin;
    const host = req.headers.host;
    console.log("ORIGIN ==> " + origin);
    console.log("HOST ==> " + host);
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    else {
        res.setHeader('Access-Control-Allow-Origin', host);
    }
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,POST,OPTIONS,DELETE");
    if (req.method.toLowerCase() == "options") {
        return res.status(200).end();
    }
    next();
};
class CorsMiddlewareConfig {
    static setup(expressApp) {
        expressApp.use(allowCrossDomain);
    }
}
exports.default = CorsMiddlewareConfig;
