"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTag = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for createTag route
 */
class CreateTag {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for createTag route
     */
    static schema() {
        return joi_1.default.object().keys({
            name: joi_1.default.string().required(),
        }).unknown(false);
    }
}
exports.CreateTag = CreateTag;
