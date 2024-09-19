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
exports.Purchase = void 0;
const typeorm_1 = require("typeorm");
const supplier_1 = require("./supplier");
const sale_type_1 = require("./sale-type");
const user_1 = require("./user");
const purchase_item_1 = require("./purchase-item");
let Purchase = class Purchase {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "purchase_id" }),
    __metadata("design:type", String)
], Purchase.prototype, "purchaseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "invoice_id" }),
    __metadata("design:type", String)
], Purchase.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "supplier_id" }),
    __metadata("design:type", String)
], Purchase.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "sale_type_id" }),
    __metadata("design:type", String)
], Purchase.prototype, "saleTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id" }),
    __metadata("design:type", String)
], Purchase.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "purchase_date" }),
    __metadata("design:type", Date)
], Purchase.prototype, "purchaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sub_total', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Purchase.prototype, "subTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Purchase.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'loading_charges', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Purchase.prototype, "loadingCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unloading_charges', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Purchase.prototype, "unloadingCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transport_charges', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Purchase.prototype, "transportCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "weight", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Purchase.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "state_of_supply" }),
    __metadata("design:type", String)
], Purchase.prototype, "stateOfSupply", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "total_amount", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Purchase.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "remaining_amount", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Purchase.prototype, "remainingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "paid_amount", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Purchase.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "image" }),
    __metadata("design:type", String)
], Purchase.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_id" }),
    __metadata("design:type", String)
], Purchase.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Purchase.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Purchase.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Purchase.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], Purchase.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], Purchase.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => supplier_1.Supplier, supplier => supplier.supplierId),
    (0, typeorm_1.JoinColumn)({ name: "supplier_id", referencedColumnName: "supplierId" }),
    __metadata("design:type", supplier_1.Supplier)
], Purchase.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => sale_type_1.SaleType, saleType => saleType.saleTypeId),
    (0, typeorm_1.JoinColumn)({ name: "sale_type_id", referencedColumnName: "saleTypeId" }),
    __metadata("design:type", sale_type_1.SaleType)
], Purchase.prototype, "saleType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_1.User, user => user.userId),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_1.User)
], Purchase.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => purchase_item_1.PurchaseItem, purchaseItem => purchaseItem.purchase),
    (0, typeorm_1.JoinColumn)({ name: "purchase_id", referencedColumnName: "purchaseId" }),
    __metadata("design:type", Array)
], Purchase.prototype, "purchaseItems", void 0);
Purchase = __decorate([
    (0, typeorm_1.Entity)("purchases")
], Purchase);
exports.Purchase = Purchase;
