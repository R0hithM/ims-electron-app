"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchase = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for createPurchase route
 */
class CreatePurchase {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for createPurchase route
     */
    static schema() {
        return joi_1.default.object({
            selectedItems: joi_1.default.array().items(joi_1.default.object({
                itemCode: joi_1.default.string().required(),
                itemName: joi_1.default.string().required(),
                rate: joi_1.default.number().required(),
                totalQuantity: joi_1.default.number().required(),
                availableQuantity: joi_1.default.number().required(),
                unitId: joi_1.default.string().required(),
                productId: joi_1.default.string().required(),
                categoryId: joi_1.default.string().required(),
                categoryTypeId: joi_1.default.string().required(),
                itemTagId: joi_1.default.string().allow('').allow(null),
                supplierId: joi_1.default.string().required(),
                image: joi_1.default.string().allow('').allow(null),
                description: joi_1.default.string().allow('').allow(null),
                purchasePrice: joi_1.default.number().required(),
                salePrice: joi_1.default.number().required(),
                discount: joi_1.default.number().required(),
                companyName: joi_1.default.string().required(),
                itemWeight: joi_1.default.number().required()
            }).unknown(true)).required(),
            calculation: joi_1.default.object({
                subTotal: joi_1.default.number().required(),
                discount: joi_1.default.number().required(),
                loadingCharges: joi_1.default.number().required(),
                unloadingCharges: joi_1.default.number().required(),
                transportCharges: joi_1.default.number().required(),
                totalAmount: joi_1.default.number().required(),
                paidAmount: joi_1.default.number().required(),
                remainingAmount: joi_1.default.number().required()
            }).required(),
            saleTypeId: joi_1.default.string().required(),
            weight: joi_1.default.number().required(),
            supplierId: joi_1.default.string().required(),
            userId: joi_1.default.string().required(),
            image: joi_1.default.string().allow('').allow(null),
        }).unknown(false);
    }
}
exports.CreatePurchase = CreatePurchase;
