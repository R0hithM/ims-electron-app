"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCustomerTransactions = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for getCustomerTransactions route
 */
class GetCustomerTransactions {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for getCustomerTransactions route
     */
    static schema() {
        return joi_1.default.object().keys({
            customerId: joi_1.default.string().required(),
            fromDate: joi_1.default.string().required(),
            toDate: joi_1.default.string().required(),
        }).unknown(false);
    }
}
exports.GetCustomerTransactions = GetCustomerTransactions;
