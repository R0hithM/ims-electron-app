"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductItems = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for getProductItems route
 */
class GetProductItems {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for getProductItems route
     */
    static schema() {
        return joi_1.default.object().keys({
            productId: joi_1.default.string().required(),
            categoryId: joi_1.default.string().required(),
            categoryTypeId: joi_1.default.string().required(),
            itemTagId: joi_1.default.string(),
            page: joi_1.default.number().default(1),
            pageSize: joi_1.default.number().default(20),
            sortBy: joi_1.default.string().default('itemName'),
            sortDir: joi_1.default.string().valid('ASC', 'DESC').default('ASC'),
        }).unknown(false);
    }
}
exports.GetProductItems = GetProductItems;
