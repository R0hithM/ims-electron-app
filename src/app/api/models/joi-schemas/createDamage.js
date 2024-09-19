"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDamage = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for CreateDamage route
 */
class CreateDamage {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for CreateDamage route
     */
    static schema() {
        return joi_1.default.object().keys({
            itemId: joi_1.default.string().required(),
            quantity: joi_1.default.number().required(),
            reason: joi_1.default.string().required(),
            userId: joi_1.default.string().required()
        }).unknown(false);
    }
}
exports.CreateDamage = CreateDamage;
