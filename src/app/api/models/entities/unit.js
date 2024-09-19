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
exports.Unit = void 0;
const typeorm_1 = require("typeorm");
let Unit = class Unit {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "unit_id" }),
    __metadata("design:type", String)
], Unit.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "unit_name" }),
    __metadata("design:type", String)
], Unit.prototype, "unitName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "unit_short_name" }),
    __metadata("design:type", String)
], Unit.prototype, "unitShortName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active" }),
    __metadata("design:type", Boolean)
], Unit.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at" }),
    __metadata("design:type", Date)
], Unit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Unit.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], Unit.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], Unit.prototype, "updatedBy", void 0);
Unit = __decorate([
    (0, typeorm_1.Entity)("units")
], Unit);
exports.Unit = Unit;
