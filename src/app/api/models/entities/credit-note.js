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
exports.CreditNote = void 0;
const typeorm_1 = require("typeorm");
const customer_1 = require("./customer");
const user_1 = require("./user");
let CreditNote = class CreditNote {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "credit_note_id" }),
    __metadata("design:type", String)
], CreditNote.prototype, "creditNoteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "customer_id" }),
    __metadata("design:type", String)
], CreditNote.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "invoice_id" }),
    __metadata("design:type", String)
], CreditNote.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "ref_invoice_id" }),
    __metadata("design:type", String)
], CreditNote.prototype, "refInvoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "amount" }),
    __metadata("design:type", Number)
], CreditNote.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "credit_note_date" }),
    __metadata("design:type", Date)
], CreditNote.prototype, "creditNoteDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "credit_note_type" }),
    __metadata("design:type", String)
], CreditNote.prototype, "creditNoteType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "remarks" }),
    __metadata("design:type", String)
], CreditNote.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_id" }),
    __metadata("design:type", String)
], CreditNote.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], CreditNote.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], CreditNote.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], CreditNote.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], CreditNote.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], CreditNote.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => customer_1.Customer, customer => customer.customerId),
    (0, typeorm_1.JoinColumn)({ name: "customer_id", referencedColumnName: "customerId" }),
    __metadata("design:type", customer_1.Customer)
], CreditNote.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_1.User, user => user.userId),
    (0, typeorm_1.JoinColumn)({ name: "updated_by", referencedColumnName: "userId" }),
    __metadata("design:type", user_1.User)
], CreditNote.prototype, "updateByUser", void 0);
CreditNote = __decorate([
    (0, typeorm_1.Entity)("credit_note")
], CreditNote);
exports.CreditNote = CreditNote;
