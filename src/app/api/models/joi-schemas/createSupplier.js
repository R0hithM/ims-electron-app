"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSupplier = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for createSupplier route
 */
class CreateSupplier {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for createSupplier route
     */
    static schema() {
        return joi_1.default.object().keys({
            supplierName: joi_1.default.string().required(),
            contactPerson: joi_1.default.string().required(),
            contactNumber: joi_1.default.string().required(),
            email: joi_1.default.string().email().allow('').allow(null),
            address: joi_1.default.string().allow('').allow(null),
            regNo: joi_1.default.string().allow('').allow(null),
            gstNo: joi_1.default.string().allow('').allow(null),
            bankDetails: joi_1.default.string().allow('').allow(null),
        }).unknown(false);
    }
}
exports.CreateSupplier = CreateSupplier;
