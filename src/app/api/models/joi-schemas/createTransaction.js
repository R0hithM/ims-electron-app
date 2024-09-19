"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransaction = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for createTransaction route
 */
class CreateTransaction {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for createTransaction route
     */
    static schema() {
        return joi_1.default.object().keys({
            transactionType: joi_1.default.string().valid('Sale', 'Purchase', 'Return', 'Refund', 'Damage').required(),
            reference_id: joi_1.default.string().required(),
            amount: joi_1.default.number().required(),
            remainingAmount: joi_1.default.number().required(),
            transactionDate: joi_1.default.string().required(),
        }).unknown(false);
    }
}
exports.CreateTransaction = CreateTransaction;
