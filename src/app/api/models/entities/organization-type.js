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
exports.OrganizationType = void 0;
const typeorm_1 = require("typeorm");
let OrganizationType = class OrganizationType {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "organization_type_id" }),
    __metadata("design:type", Number)
], OrganizationType.prototype, "organizationTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_type_name" }),
    __metadata("design:type", String)
], OrganizationType.prototype, "organizationTypeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], OrganizationType.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], OrganizationType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], OrganizationType.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by", nullable: true }),
    __metadata("design:type", String)
], OrganizationType.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by", nullable: true }),
    __metadata("design:type", String)
], OrganizationType.prototype, "updatedBy", void 0);
OrganizationType = __decorate([
    (0, typeorm_1.Entity)("organization_types")
], OrganizationType);
exports.OrganizationType = OrganizationType;
