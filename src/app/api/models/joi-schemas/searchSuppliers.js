"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchSuppliers = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for searchSuppliers route
 */
class SearchSuppliers {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for searchSuppliers route
     */
    static schema() {
        return joi_1.default.object().keys({
            supplierName: joi_1.default.string().required()
        }).unknown(false);
    }
}
exports.SearchSuppliers = SearchSuppliers;
