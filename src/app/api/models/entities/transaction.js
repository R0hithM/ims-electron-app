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
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
const sale_1 = require("./sale");
const purchase_1 = require("./purchase");
const return_1 = require("./return");
const refund_1 = require("./refund");
const damage_1 = require("./damage");
let Transaction = class Transaction {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "transaction_id" }),
    __metadata("design:type", String)
], Transaction.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "transaction_type" }),
    __metadata("design:type", String)
], Transaction.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "reference_id" }),
    __metadata("design:type", String)
], Transaction.prototype, "referenceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "invoice_id" }),
    __metadata("design:type", String)
], Transaction.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "opening_balance", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Transaction.prototype, "openingBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "amount", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "paid_amount", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Transaction.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "remaining_amount", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Transaction.prototype, "remainingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "transaction_date" }),
    __metadata("design:type", Date)
], Transaction.prototype, "transactionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "customer_id" }),
    __metadata("design:type", String)
], Transaction.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_id" }),
    __metadata("design:type", String)
], Transaction.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Transaction.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Transaction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Transaction.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], Transaction.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], Transaction.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => sale_1.Sale, sale => sale.saleId),
    (0, typeorm_1.JoinColumn)({ name: "reference_id", referencedColumnName: "saleId" }),
    __metadata("design:type", sale_1.Sale)
], Transaction.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => purchase_1.Purchase, purchase => purchase.purchaseId),
    (0, typeorm_1.JoinColumn)({ name: "reference_id", referencedColumnName: "purchaseId" }),
    __metadata("design:type", purchase_1.Purchase)
], Transaction.prototype, "purchase", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => return_1.Return, _return => _return.returnId),
    (0, typeorm_1.JoinColumn)({ name: "reference_id", referencedColumnName: "returnId" }),
    __metadata("design:type", return_1.Return)
], Transaction.prototype, "return", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => refund_1.Refund, refund => refund.refundId),
    (0, typeorm_1.JoinColumn)({ name: "reference_id", referencedColumnName: "refundId" }),
    __metadata("design:type", refund_1.Refund)
], Transaction.prototype, "refund", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => damage_1.Damage, damage => damage.damageId),
    (0, typeorm_1.JoinColumn)({ name: "reference_id", referencedColumnName: "damageId" }),
    __metadata("design:type", damage_1.Damage)
], Transaction.prototype, "damage", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)("transactions")
], Transaction);
exports.Transaction = Transaction;
