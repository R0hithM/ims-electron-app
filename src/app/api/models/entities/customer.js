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
exports.Customer = void 0;
const typeorm_1 = require("typeorm");
let Customer = class Customer {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: 'customer_id' }),
    __metadata("design:type", String)
], Customer.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_name' }),
    __metadata("design:type", String)
], Customer.prototype, "customerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_type' }),
    __metadata("design:type", String)
], Customer.prototype, "customerType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_number' }),
    __metadata("design:type", String)
], Customer.prototype, "contactNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gst_no' }),
    __metadata("design:type", String)
], Customer.prototype, "gstNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email' }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address' }),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_id" }),
    __metadata("design:type", String)
], Customer.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Customer.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Customer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Customer.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], Customer.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], Customer.prototype, "updatedBy", void 0);
Customer = __decorate([
    (0, typeorm_1.Entity)('customers')
], Customer);
exports.Customer = Customer;
