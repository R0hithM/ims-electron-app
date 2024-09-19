"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransactions = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for getTransactions route
 */
class GetTransactions {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for getTransactions route
     */
    static schema() {
        return joi_1.default.object().keys({
            fromDate: joi_1.default.string(),
            toDate: joi_1.default.string(),
            duration: joi_1.default.number(),
            transactionType: joi_1.default.string().valid('Sale', 'Purchase', 'Return', 'Refund', 'Damage', 'Credit_Note'),
            page: joi_1.default.number().default(1),
            pageSize: joi_1.default.number().default(20),
            sortBy: joi_1.default.string().default('itemName'),
            sortDir: joi_1.default.string().valid('ASC', 'DESC').default('ASC'),
        }).unknown(false);
    }
}
exports.GetTransactions = GetTransactions;
