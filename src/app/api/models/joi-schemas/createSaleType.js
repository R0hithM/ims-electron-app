"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSaleType = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for createSaleType route
 */
class CreateSaleType {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for createSaleType route
     */
    static schema() {
        return joi_1.default.object().keys({
            saleType: joi_1.default.string().valid('Cash', 'Bank_Transfer', 'Cheques', 'Credit', 'Credit_Note').required(),
        }).unknown(false);
    }
}
exports.CreateSaleType = CreateSaleType;
