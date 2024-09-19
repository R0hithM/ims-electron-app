"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductCategory = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for createProductCategory route
 */
class CreateProductCategory {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for createProductCategory route
     */
    static schema() {
        return joi_1.default.object().keys({
            categoryName: joi_1.default.string().required(),
            categoryImage: joi_1.default.string().allow('').allow(null),
            description: joi_1.default.string().allow('').allow(null),
        }).unknown(false);
    }
}
exports.CreateProductCategory = CreateProductCategory;
