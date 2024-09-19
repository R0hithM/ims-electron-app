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
exports.EstimationItem = void 0;
const typeorm_1 = require("typeorm");
const product_item_1 = require("./product-item");
const estimation_1 = require("./estimation");
let EstimationItem = class EstimationItem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: 'estimation_item_id' }),
    __metadata("design:type", String)
], EstimationItem.prototype, "estimationItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estimation_id' }),
    __metadata("design:type", String)
], EstimationItem.prototype, "estimationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'item_id' }),
    __metadata("design:type", String)
], EstimationItem.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity' }),
    __metadata("design:type", Number)
], EstimationItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rate' }),
    __metadata("design:type", Number)
], EstimationItem.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], EstimationItem.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'purchase_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], EstimationItem.prototype, "purchasePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sale_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], EstimationItem.prototype, "salePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], EstimationItem.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], EstimationItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], EstimationItem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], EstimationItem.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], EstimationItem.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => estimation_1.Estimation, estimation => estimation.estimationId),
    (0, typeorm_1.JoinColumn)({ name: 'estimation_id', referencedColumnName: 'estimationId' }),
    __metadata("design:type", estimation_1.Estimation)
], EstimationItem.prototype, "estimation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => product_item_1.ProductItem, productItem => productItem.itemId),
    (0, typeorm_1.JoinColumn)({ name: 'item_id', referencedColumnName: 'itemId' }),
    __metadata("design:type", product_item_1.ProductItem)
], EstimationItem.prototype, "item", void 0);
EstimationItem = __decorate([
    (0, typeorm_1.Entity)('estimation_items')
], EstimationItem);
exports.EstimationItem = EstimationItem;
