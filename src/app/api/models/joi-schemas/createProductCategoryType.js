"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductCategoryType = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for createProductCategoryType route
 */
class CreateProductCategoryType {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for createProductCategoryType route
     */
    static schema() {
        return joi_1.default.object().keys({
            categoryTypeName: joi_1.default.string().required(),
            categoryId: joi_1.default.string().required(),
            categoryTypeImage: joi_1.default.string().allow('').allow(null),
            description: joi_1.default.string().allow('').allow(null),
        }).unknown(false);
    }
}
exports.CreateProductCategoryType = CreateProductCategoryType;
