"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleItem = void 0;
const typeorm_1 = require("typeorm");
const product_item_1 = require("./product-item");
const sale_1 = require("./sale");
let SaleItem = class SaleItem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: 'sale_item_id' }),
    __metadata("design:type", String)
], SaleItem.prototype, "saleItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sale_id' }),
    __metadata("design:type", String)
], SaleItem.prototype, "saleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'item_id' }),
    __metadata("design:type", String)
], SaleItem.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity' }),
    __metadata("design:type", Number)
], SaleItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rate' }),
    __metadata("design:type", Number)
], SaleItem.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SaleItem.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'purchase_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SaleItem.prototype, "purchasePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sale_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SaleItem.prototype, "salePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], SaleItem.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], SaleItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], SaleItem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], SaleItem.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], SaleItem.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => sale_1.Sale, sale => sale.saleItems),
    (0, typeorm_1.JoinColumn)({ name: 'sale_id', referencedColumnName: 'saleId' }),
    __metadata("design:type", sale_1.Sale)
], SaleItem.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => product_item_1.ProductItem, productItem => productItem.itemId),
    (0, typeorm_1.JoinColumn)({ name: 'item_id', referencedColumnName: 'itemId' }),
    __metadata("design:type", product_item_1.ProductItem)
], SaleItem.prototype, "item", void 0);
SaleItem = __decorate([
    (0, typeorm_1.Entity)('sale_items')
], SaleItem);
exports.SaleItem = SaleItem;
