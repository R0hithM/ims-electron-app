"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrganization = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for createOrganization route
 */
class CreateOrganization {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for createOrganization route
     */
    static schema() {
        return joi_1.default.object().keys({
            organizationName: joi_1.default.string().required(),
            contactPerson: joi_1.default.string().required(),
            contactNumber: joi_1.default.string().required(),
            address: joi_1.default.string().required(),
            description: joi_1.default.string().allow('').allow(null),
            image: joi_1.default.string().required(),
            gstNo: joi_1.default.string().allow(''),
            email: joi_1.default.string().email().allow('').allow(null),
            organizationType: joi_1.default.string().required(),
        }).unknown(false);
    }
}
exports.CreateOrganization = CreateOrganization;
