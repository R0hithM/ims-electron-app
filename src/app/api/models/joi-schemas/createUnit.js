"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUnit = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for createUnit route
 */
class CreateUnit {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for createUnit route
     */
    static schema() {
        return joi_1.default.object().keys({
            unitName: joi_1.default.string().required(),
            unitShortName: joi_1.default.string().required(),
            isActive: joi_1.default.boolean().required(),
        }).unknown(false);
    }
}
exports.CreateUnit = CreateUnit;
