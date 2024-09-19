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
exports.Sale = void 0;
const typeorm_1 = require("typeorm");
const sale_type_1 = require("./sale-type");
const user_1 = require("./user");
const customer_1 = require("./customer");
const sale_item_1 = require("./sale-item");
let Sale = class Sale {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: 'sale_id' }),
    __metadata("design:type", String)
], Sale.prototype, "saleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_id' }),
    __metadata("design:type", String)
], Sale.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estimation_id' }),
    __metadata("design:type", String)
], Sale.prototype, "estimationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sale_type_id' }),
    __metadata("design:type", String)
], Sale.prototype, "saleTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], Sale.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    __metadata("design:type", String)
], Sale.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'price_per_unit', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "pricePerUnit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sub_total', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "subTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'remaining_amount', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "remainingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paid_amount', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'weight', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'loading_charges', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "loadingCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unloading_charges', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "unloadingCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transport_charges', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "transportCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'due_date' }),
    __metadata("design:type", String)
], Sale.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_note_id' }),
    __metadata("design:type", String)
], Sale.prototype, "creditNoteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'utilized_credit_balance', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "utilizedCreditBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_date' }),
    __metadata("design:type", Date)
], Sale.prototype, "invoiceDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_id" }),
    __metadata("design:type", String)
], Sale.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Sale.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Sale.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Sale.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], Sale.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], Sale.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => sale_type_1.SaleType, saleType => saleType.saleTypeId),
    (0, typeorm_1.JoinColumn)({ name: 'sale_type_id', referencedColumnName: 'saleTypeId' }),
    __metadata("design:type", sale_type_1.SaleType)
], Sale.prototype, "saleType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_1.User, user => user.userId),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_1.User)
], Sale.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => customer_1.Customer, customer => customer.customerId),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id', referencedColumnName: 'customerId' }),
    __metadata("design:type", customer_1.Customer)
], Sale.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sale_item_1.SaleItem, saleItem => saleItem.sale),
    (0, typeorm_1.JoinColumn)({ name: "sale_id", referencedColumnName: "saleId" }),
    __metadata("design:type", Array)
], Sale.prototype, "saleItems", void 0);
Sale = __decorate([
    (0, typeorm_1.Entity)('sales')
], Sale);
exports.Sale = Sale;
