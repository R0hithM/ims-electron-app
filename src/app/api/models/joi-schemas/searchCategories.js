"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchCategories = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for searchCategories route
 */
class SearchCategories {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for searchCategories route
     */
    static schema() {
        return joi_1.default.object().keys({
            categoryName: joi_1.default.string().required(),
            page: joi_1.default.number().default(1),
            pageSize: joi_1.default.number().default(20),
            sortBy: joi_1.default.string().default('categoryName'),
            sortDir: joi_1.default.string().valid('ASC', 'DESC').default('ASC'),
        }).unknown(false);
    }
}
exports.SearchCategories = SearchCategories;
