"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCreditNote = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for createCreditNote route
 */
class CreateCreditNote {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for createCreditNote route
     */
    static schema() {
        return joi_1.default.object().keys({
            customerId: joi_1.default.number().required(),
            saleId: joi_1.default.number().required(),
            invoiceId: joi_1.default.number().required(),
        }).unknown(false);
    }
}
exports.CreateCreditNote = CreateCreditNote;
