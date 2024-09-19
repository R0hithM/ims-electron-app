"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuality = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for createQuality route
 */
class CreateQuality {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for createQuality route
     */
    static schema() {
        return joi_1.default.object().keys({
            qualityName: joi_1.default.string().required(),
            categoryId: joi_1.default.string().required(),
            categoryTypeId: joi_1.default.string().required(),
            isActive: joi_1.default.boolean().required(),
        }).unknown(false);
    }
}
exports.CreateQuality = CreateQuality;
