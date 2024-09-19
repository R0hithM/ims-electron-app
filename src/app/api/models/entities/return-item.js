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
exports.ReturnItem = void 0;
const typeorm_1 = require("typeorm");
const product_item_1 = require("./product-item");
const return_1 = require("./return");
let ReturnItem = class ReturnItem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: 'return_item_id' }),
    __metadata("design:type", String)
], ReturnItem.prototype, "returnItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'return_id' }),
    __metadata("design:type", String)
], ReturnItem.prototype, "returnId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'item_id' }),
    __metadata("design:type", String)
], ReturnItem.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity' }),
    __metadata("design:type", Number)
], ReturnItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rate' }),
    __metadata("design:type", Number)
], ReturnItem.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ReturnItem.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'purchase_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ReturnItem.prototype, "purchasePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sale_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ReturnItem.prototype, "salePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], ReturnItem.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], ReturnItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], ReturnItem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], ReturnItem.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], ReturnItem.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => return_1.Return, _return => _return.returnId),
    (0, typeorm_1.JoinColumn)({ name: 'return_id', referencedColumnName: 'returnId' }),
    __metadata("design:type", return_1.Return)
], ReturnItem.prototype, "return", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => product_item_1.ProductItem, productItem => productItem.itemId),
    (0, typeorm_1.JoinColumn)({ name: 'item_id', referencedColumnName: 'itemId' }),
    __metadata("design:type", product_item_1.ProductItem)
], ReturnItem.prototype, "item", void 0);
ReturnItem = __decorate([
    (0, typeorm_1.Entity)('return_items')
], ReturnItem);
exports.ReturnItem = ReturnItem;
