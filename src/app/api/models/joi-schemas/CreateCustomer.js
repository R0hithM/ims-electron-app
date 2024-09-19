"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomer = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for createCustomer route
 */
class CreateCustomer {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for createCustomer route
     */
    static schema() {
        return joi_1.default.object().keys({
            customerName: joi_1.default.string().required(),
            customerType: joi_1.default.string().valid('B2B', 'B2C').required(),
            contactNumber: joi_1.default.string().required(),
            gstNo: joi_1.default.string().allow('').optional(),
            email: joi_1.default.string().email().allow('').optional(),
            address: joi_1.default.string().allow('').optional(),
        }).unknown(false);
    }
}
exports.CreateCustomer = CreateCustomer;
