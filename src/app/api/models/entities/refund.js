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
exports.Refund = void 0;
const typeorm_1 = require("typeorm");
let Refund = class Refund {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "refund_id" }),
    __metadata("design:type", String)
], Refund.prototype, "refundId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "invoice_id" }),
    __metadata("design:type", String)
], Refund.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "amount", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Refund.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "refund_date" }),
    __metadata("design:type", Date)
], Refund.prototype, "refundDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "reason" }),
    __metadata("design:type", String)
], Refund.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_id" }),
    __metadata("design:type", String)
], Refund.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Refund.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Refund.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Refund.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], Refund.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], Refund.prototype, "updatedBy", void 0);
Refund = __decorate([
    (0, typeorm_1.Entity)("refunds")
], Refund);
exports.Refund = Refund;
