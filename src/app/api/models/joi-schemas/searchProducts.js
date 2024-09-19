"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchProducts = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for searchProducts route
 */
class SearchProducts {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for searchProducts route
     */
    static schema() {
        return joi_1.default.object().keys({
            productName: joi_1.default.string().required(),
            page: joi_1.default.number().default(1),
            pageSize: joi_1.default.number().default(20),
            sortBy: joi_1.default.string().default('productName'),
            sortDir: joi_1.default.string().valid('ASC', 'DESC').default('ASC'),
        }).unknown(false);
    }
}
exports.SearchProducts = SearchProducts;
