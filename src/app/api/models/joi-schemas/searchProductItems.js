"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchProductItems = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for searchProductItems route
 */
class SearchProductItems {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for searchProductItems route
     */
    static schema() {
        return joi_1.default.object().keys({
            productId: joi_1.default.string().optional(),
            categoryId: joi_1.default.string().optional(),
            categoryTypeId: joi_1.default.string().optional(),
            itemNameOrCode: joi_1.default.string().optional(),
            supplierId: joi_1.default.string().optional(),
            page: joi_1.default.number().default(1),
            pageSize: joi_1.default.number().default(20),
            sortBy: joi_1.default.string().default('itemName'),
            sortDir: joi_1.default.string().valid('ASC', 'DESC').default('ASC'),
        }).unknown(false);
    }
}
exports.SearchProductItems = SearchProductItems;
