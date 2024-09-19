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
exports.UserGroup = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
let UserGroup = class UserGroup {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "group_id" }),
    __metadata("design:type", String)
], UserGroup.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "group_name" }),
    __metadata("design:type", String)
], UserGroup.prototype, "groupName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description" }),
    __metadata("design:type", String)
], UserGroup.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active" }),
    __metadata("design:type", Boolean)
], UserGroup.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], UserGroup.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], UserGroup.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], UserGroup.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], UserGroup.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_1.User, (user) => user.groupId),
    (0, typeorm_1.JoinColumn)({ name: "group_id", referencedColumnName: "group_id" }),
    __metadata("design:type", Array)
], UserGroup.prototype, "users", void 0);
UserGroup = __decorate([
    (0, typeorm_1.Entity)("user_groups")
], UserGroup);
exports.UserGroup = UserGroup;
