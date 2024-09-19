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
exports.ProductCategory = void 0;
const typeorm_1 = require("typeorm");
const product_1 = require("./product");
const product_category_type_1 = require("./product-category-type");
let ProductCategory = class ProductCategory {
    validateProductCategoryTypes() {
        if (this.productCategoryTypes) {
            this.categoryTypesCount = this.productCategoryTypes.filter(x => x.isActive).length;
        }
        this.productCategoryTypes = undefined;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "category_id" }),
    __metadata("design:type", String)
], ProductCategory.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_name" }),
    __metadata("design:type", String)
], ProductCategory.prototype, "categoryName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_id" }),
    __metadata("design:type", String)
], ProductCategory.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_image" }),
    __metadata("design:type", String)
], ProductCategory.prototype, "categoryImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description" }),
    __metadata("design:type", String)
], ProductCategory.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_id" }),
    __metadata("design:type", String)
], ProductCategory.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], ProductCategory.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], ProductCategory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], ProductCategory.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], ProductCategory.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], ProductCategory.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => product_1.Product, product => product.productCategories),
    (0, typeorm_1.JoinColumn)({ name: "product_id", referencedColumnName: "productId" }),
    __metadata("design:type", product_1.Product)
], ProductCategory.prototype, "productInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_category_type_1.ProductCategoryType, productCategoryType => productCategoryType.productCategoryInfo),
    (0, typeorm_1.JoinColumn)({ name: "category_id", referencedColumnName: "categoryId" }),
    __metadata("design:type", Object)
], ProductCategory.prototype, "productCategoryTypes", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductCategory.prototype, "validateProductCategoryTypes", null);
ProductCategory = __decorate([
    (0, typeorm_1.Entity)({ name: "product_category" })
], ProductCategory);
exports.ProductCategory = ProductCategory;
