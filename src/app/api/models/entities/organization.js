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
exports.Organization = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
let Organization = class Organization {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "organization_id" }),
    __metadata("design:type", String)
], Organization.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_name" }),
    __metadata("design:type", String)
], Organization.prototype, "organizationName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "contact_person" }),
    __metadata("design:type", String)
], Organization.prototype, "contactPerson", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "contact_number", length: 20 }),
    __metadata("design:type", String)
], Organization.prototype, "contactNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "image" }),
    __metadata("design:type", String)
], Organization.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "gst_no" }),
    __metadata("design:type", String)
], Organization.prototype, "gstNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "email" }),
    __metadata("design:type", String)
], Organization.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address" }),
    __metadata("design:type", String)
], Organization.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description" }),
    __metadata("design:type", String)
], Organization.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_type" }),
    __metadata("design:type", String)
], Organization.prototype, "organizationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Organization.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Organization.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], Organization.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], Organization.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => user_1.User, user => user.organizationId),
    (0, typeorm_1.JoinColumn)({ name: "organization_id", referencedColumnName: "organizationId" }),
    __metadata("design:type", Array)
], Organization.prototype, "users", void 0);
Organization = __decorate([
    (0, typeorm_1.Entity)("organizations")
], Organization);
exports.Organization = Organization;
