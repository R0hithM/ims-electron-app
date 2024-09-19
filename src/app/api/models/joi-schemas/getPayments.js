"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPayments = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for getPayments route
 */
class GetPayments {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for getPayments route
     */
    static schema() {
        return joi_1.default.object().keys({
            status: joi_1.default.string().valid('In', 'Out').required(),
        }).unknown(false);
    }
}
exports.GetPayments = GetPayments;
