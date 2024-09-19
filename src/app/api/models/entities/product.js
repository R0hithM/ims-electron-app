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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const product_category_1 = require("./product-category");
let Product = class Product {
    validateProductCategories() {
        if (this.productCategories) {
            this.categoryCount = this.productCategories.filter(x => x.isActive).length;
        }
        this.productCategories = undefined;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "product_id" }),
    __metadata("design:type", String)
], Product.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_name" }),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description" }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_image" }),
    __metadata("design:type", String)
], Product.prototype, "productImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_id" }),
    __metadata("design:type", String)
], Product.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], Product.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], Product.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_category_1.ProductCategory, ProductCategory => ProductCategory.productInfo),
    (0, typeorm_1.JoinColumn)({ name: "product_id", referencedColumnName: "productId" }),
    __metadata("design:type", Object)
], Product.prototype, "productCategories", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Product.prototype, "validateProductCategories", null);
Product = __decorate([
    (0, typeorm_1.Entity)({ name: "products" })
], Product);
exports.Product = Product;
