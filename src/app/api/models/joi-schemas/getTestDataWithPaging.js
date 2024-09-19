"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTestDataWithPaging = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for getTestDataWithPagingAndSorting route
 */
class GetTestDataWithPaging {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for getTestDataWithPagingAndSorting route
     */
    static schema() {
        return joi_1.default.object().keys({
            page: joi_1.default.number(),
            pageSize: joi_1.default.number(),
            sortBy: joi_1.default.string(),
            sortDir: joi_1.default.string().valid("ASC", "DESC"),
            searchBy: joi_1.default.string().allow("").optional(),
        }).unknown(false);
    }
}
exports.GetTestDataWithPaging = GetTestDataWithPaging;
