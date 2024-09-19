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
exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
let UserRole = class UserRole {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "role_id" }),
    __metadata("design:type", String)
], UserRole.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "role_name" }),
    __metadata("design:type", String)
], UserRole.prototype, "roleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description" }),
    __metadata("design:type", String)
], UserRole.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active" }),
    __metadata("design:type", Boolean)
], UserRole.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], UserRole.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], UserRole.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], UserRole.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], UserRole.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_1.User, user => user.roleId),
    (0, typeorm_1.JoinColumn)({ name: "role_id", referencedColumnName: "role_id" }),
    __metadata("design:type", Array)
], UserRole.prototype, "users", void 0);
UserRole = __decorate([
    (0, typeorm_1.Entity)("user_roles")
], UserRole);
exports.UserRole = UserRole;
