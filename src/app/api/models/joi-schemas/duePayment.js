"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuePayment = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for DuePayment route
 */
class DuePayment {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for DuePayment route
     */
    static schema() {
        return joi_1.default.object().keys({
            customerId: joi_1.default.string().required(),
            paidAmount: joi_1.default.number().required(),
            paymentModeId: joi_1.default.string().required()
        }).unknown(false);
    }
}
exports.DuePayment = DuePayment;
