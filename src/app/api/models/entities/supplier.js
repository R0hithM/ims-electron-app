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
exports.Supplier = void 0;
const typeorm_1 = require("typeorm");
let Supplier = class Supplier {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "supplier_id" }),
    __metadata("design:type", String)
], Supplier.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "supplier_name" }),
    __metadata("design:type", String)
], Supplier.prototype, "supplierName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "contact_person" }),
    __metadata("design:type", String)
], Supplier.prototype, "contactPerson", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "contact_number", length: 20 }),
    __metadata("design:type", String)
], Supplier.prototype, "contactNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "email" }),
    __metadata("design:type", String)
], Supplier.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address" }),
    __metadata("design:type", String)
], Supplier.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "reg_no", length: 20 }),
    __metadata("design:type", String)
], Supplier.prototype, "regNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "gst_no", length: 20 }),
    __metadata("design:type", String)
], Supplier.prototype, "gstNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "bank_details" }),
    __metadata("design:type", String)
], Supplier.prototype, "bankDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_id" }),
    __metadata("design:type", String)
], Supplier.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Supplier.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Supplier.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Supplier.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], Supplier.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], Supplier.prototype, "updatedBy", void 0);
Supplier = __decorate([
    (0, typeorm_1.Entity)({ name: "suppliers" })
], Supplier);
exports.Supplier = Supplier;
