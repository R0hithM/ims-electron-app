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
exports.Damage = void 0;
const typeorm_1 = require("typeorm");
const product_item_1 = require("./product-item");
const product_1 = require("./product");
const user_1 = require("./user");
let Damage = class Damage {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "damage_id" }),
    __metadata("design:type", String)
], Damage.prototype, "damageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "invoice_id" }),
    __metadata("design:type", String)
], Damage.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "item_id" }),
    __metadata("design:type", String)
], Damage.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_id" }),
    __metadata("design:type", String)
], Damage.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "quantity" }),
    __metadata("design:type", Number)
], Damage.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sale_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Damage.prototype, "salePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "damage_date" }),
    __metadata("design:type", Date)
], Damage.prototype, "damageDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "reason" }),
    __metadata("design:type", String)
], Damage.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_id" }),
    __metadata("design:type", String)
], Damage.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Damage.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Damage.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Damage.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], Damage.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], Damage.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_item_1.ProductItem, productItem => productItem.itemId),
    (0, typeorm_1.JoinColumn)({ name: "item_id", referencedColumnName: "itemId" }),
    __metadata("design:type", product_item_1.ProductItem)
], Damage.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_1.Product, product => product.productId),
    (0, typeorm_1.JoinColumn)({ name: "product_id", referencedColumnName: "productId" }),
    __metadata("design:type", product_1.Product)
], Damage.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_1.User, user => user.userId),
    (0, typeorm_1.JoinColumn)({ name: 'created_by', referencedColumnName: 'userId' }),
    __metadata("design:type", user_1.User)
], Damage.prototype, "user", void 0);
Damage = __decorate([
    (0, typeorm_1.Entity)("damages")
], Damage);
exports.Damage = Damage;
