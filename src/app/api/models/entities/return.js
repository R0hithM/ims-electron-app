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
exports.Return = void 0;
const typeorm_1 = require("typeorm");
const sale_type_1 = require("./sale-type");
const user_1 = require("./user");
const return_item_1 = require("./return-item");
const customer_1 = require("./customer");
const return_invoice_1 = require("./return-invoice");
let Return = class Return {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "return_id" }),
    __metadata("design:type", String)
], Return.prototype, "returnId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_id' }),
    __metadata("design:type", String)
], Return.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ref_invoice_id' }),
    __metadata("design:type", String)
], Return.prototype, "refInvoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sale_type_id' }),
    __metadata("design:type", String)
], Return.prototype, "saleTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], Return.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    __metadata("design:type", String)
], Return.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sub_total', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Return.prototype, "subTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'loading_charges', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Return.prototype, "loadingCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unloading_charges', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Return.prototype, "unloadingCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transport_charges', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Return.prototype, "transportCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Return.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "return_date" }),
    __metadata("design:type", Date)
], Return.prototype, "returnDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "returns_type" }),
    __metadata("design:type", String)
], Return.prototype, "returnsType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "reason" }),
    __metadata("design:type", String)
], Return.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_id" }),
    __metadata("design:type", String)
], Return.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Return.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Return.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Return.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], Return.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], Return.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => sale_type_1.SaleType, saleType => saleType.saleTypeId),
    (0, typeorm_1.JoinColumn)({ name: 'sale_type_id', referencedColumnName: 'saleTypeId' }),
    __metadata("design:type", sale_type_1.SaleType)
], Return.prototype, "saleType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_1.User, user => user.userId),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_1.User)
], Return.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => return_item_1.ReturnItem, returnItem => returnItem.return),
    (0, typeorm_1.JoinColumn)({ name: 'return_id', referencedColumnName: 'returnId' }),
    __metadata("design:type", Array)
], Return.prototype, "returnItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => return_invoice_1.ReturnedInvoice, returnedInvoice => returnedInvoice.return),
    (0, typeorm_1.JoinColumn)({ name: 'return_id', referencedColumnName: 'returnId' }),
    __metadata("design:type", Array)
], Return.prototype, "returnedInvoices", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => customer_1.Customer, customer => customer.customerId),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id', referencedColumnName: 'customerId' }),
    __metadata("design:type", customer_1.Customer)
], Return.prototype, "customer", void 0);
Return = __decorate([
    (0, typeorm_1.Entity)("returns")
], Return);
exports.Return = Return;
