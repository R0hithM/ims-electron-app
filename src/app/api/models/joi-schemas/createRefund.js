"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRefund = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for CreateRefund route
 */
class CreateRefund {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for CreateRefund route
     */
    static schema() {
        return joi_1.default.object().keys({
            invoiceId: joi_1.default.string().required(),
            amount: joi_1.default.number().required(),
            refundDate: joi_1.default.string().required(),
            reason: joi_1.default.string().required()
        }).unknown(false);
    }
}
exports.CreateRefund = CreateRefund;
