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
exports.ReturnedInvoice = void 0;
const typeorm_1 = require("typeorm");
const return_1 = require("./return");
let ReturnedInvoice = class ReturnedInvoice {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: 'returned_invoice_id' }),
    __metadata("design:type", String)
], ReturnedInvoice.prototype, "returnedInvoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'return_id' }),
    __metadata("design:type", String)
], ReturnedInvoice.prototype, "returnId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_id' }),
    __metadata("design:type", String)
], ReturnedInvoice.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_date' }),
    __metadata("design:type", Date)
], ReturnedInvoice.prototype, "invoiceDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'remaining_amount' }),
    __metadata("design:type", Number)
], ReturnedInvoice.prototype, "remainingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'used_amount' }),
    __metadata("design:type", Number)
], ReturnedInvoice.prototype, "usedAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], ReturnedInvoice.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], ReturnedInvoice.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], ReturnedInvoice.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], ReturnedInvoice.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], ReturnedInvoice.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => return_1.Return, _return => _return.returnId),
    (0, typeorm_1.JoinColumn)({ name: 'return_id', referencedColumnName: 'returnId' }),
    __metadata("design:type", return_1.Return)
], ReturnedInvoice.prototype, "return", void 0);
ReturnedInvoice = __decorate([
    (0, typeorm_1.Entity)('returned_invoices')
], ReturnedInvoice);
exports.ReturnedInvoice = ReturnedInvoice;
