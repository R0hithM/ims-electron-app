"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = require("../models/api-error");
class ErrorsMiddlewar {
    static setup(app) {
        //catch 404
        app.use((req, res, next) => {
            res.locals.status = 404;
            next(new Error("Not Found!"));
        });
        //Application errors
        app.use((err, req, res, next) => {
            if (err instanceof api_error_1.ApiError) {
                return res.status(400).json({
                    success: false,
                    errors: {
                        type: err.type,
                        message: err.message,
                    }
                });
            }
            next(err);
        });
        // Generic errors
        app.use((err, req, res, next) => {
            res.status(res.locals.status || 500).json({
                success: false,
                errors: {
                    type: "generic",
                    message: err.message
                }
            });
        });
    }
}
exports.default = ErrorsMiddlewar;
