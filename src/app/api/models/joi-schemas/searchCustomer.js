"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchCustomer = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for searchCustomer route
 */
class SearchCustomer {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for searchCustomer route
     */
    static schema() {
        return joi_1.default.object().keys({
            customerName: joi_1.default.string().optional(),
            contactNumber: joi_1.default.string().optional(),
        }).unknown(false);
    }
}
exports.SearchCustomer = SearchCustomer;
