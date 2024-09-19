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
exports.Tag = void 0;
const typeorm_1 = require("typeorm");
const product_item_tags_1 = require("./product-item-tags");
let Tag = class Tag {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "tag_id" }),
    __metadata("design:type", String)
], Tag.prototype, "tagId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name" }),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_id" }),
    __metadata("design:type", String)
], Tag.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_type_id" }),
    __metadata("design:type", String)
], Tag.prototype, "categoryTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Tag.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Tag.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Tag.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], Tag.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], Tag.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => product_item_tags_1.ProductItemTag, productItemTag => productItemTag.tagId),
    (0, typeorm_1.JoinColumn)({ name: "tag_id", referencedColumnName: "tagId" }),
    __metadata("design:type", Array)
], Tag.prototype, "productItemTag", void 0);
Tag = __decorate([
    (0, typeorm_1.Entity)({ name: "tags" })
], Tag);
exports.Tag = Tag;
