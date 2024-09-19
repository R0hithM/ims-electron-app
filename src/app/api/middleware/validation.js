"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
/**
 * @description Class to run validation on given Joi schemas
 */
class Validation {
    static run(schema, property) {
        return (req, res, next) => {
            const { error } = schema.validate(req[property], { abortEarly: false });
            if (error === null || error === undefined) {
                next();
            }
            else {
                const { details } = error;
                const message = details.map(i => i.message);
                res.status(422).json({ error: message });
            }
        };
    }
}
exports.Validation = Validation;
