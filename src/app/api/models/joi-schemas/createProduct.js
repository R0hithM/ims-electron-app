"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProduct = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for createProduct route
 */
class CreateProduct {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for createProduct route
     */
    static schema() {
        return joi_1.default.object().keys({
            productName: joi_1.default.string().required(),
            description: joi_1.default.string().allow('').allow(null),
            productImage: joi_1.default.string().allow('').allow(null),
        }).unknown(false);
    }
}
exports.CreateProduct = CreateProduct;
