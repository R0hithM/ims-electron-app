"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductItem = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for createProductItem route
 */
class CreateProductItem {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for createProductItem route
     */
    static schema() {
        return joi_1.default.object().keys({
            itemCode: joi_1.default.string().required(),
            itemName: joi_1.default.string().required(),
            rate: joi_1.default.number().required(),
            totalQuantity: joi_1.default.number().required(),
            availableQuantity: joi_1.default.number().required(),
            unitId: joi_1.default.string().required(),
            productId: joi_1.default.string().required(),
            categoryId: joi_1.default.string().required(),
            categoryTypeId: joi_1.default.string().required(),
            itemTagId: joi_1.default.string(),
            supplierId: joi_1.default.string().required(),
            image: joi_1.default.string().allow('').allow(null),
            description: joi_1.default.string(),
            purchasePrice: joi_1.default.number().required(),
            salePrice: joi_1.default.number().required(),
            discount: joi_1.default.number().required(),
            companyName: joi_1.default.string().required(),
            itemWeight: joi_1.default.number().required()
        }).unknown(false);
    }
}
exports.CreateProductItem = CreateProductItem;
