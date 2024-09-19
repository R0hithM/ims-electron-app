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
exports.ProductCategoryType = void 0;
const typeorm_1 = require("typeorm");
const product_category_1 = require("./product-category");
const product_item_1 = require("./product-item");
let ProductCategoryType = class ProductCategoryType {
    validateProductItems() {
        if (this.items) {
            this.itemsCount = this.items.filter(x => x.isActive).length;
        }
        this.items = undefined;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "category_type_id" }),
    __metadata("design:type", String)
], ProductCategoryType.prototype, "categoryTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_type_name" }),
    __metadata("design:type", String)
], ProductCategoryType.prototype, "categoryTypeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_id" }),
    __metadata("design:type", String)
], ProductCategoryType.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_type_image" }),
    __metadata("design:type", String)
], ProductCategoryType.prototype, "categoryTypeImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description" }),
    __metadata("design:type", String)
], ProductCategoryType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_id" }),
    __metadata("design:type", String)
], ProductCategoryType.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], ProductCategoryType.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], ProductCategoryType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], ProductCategoryType.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], ProductCategoryType.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], ProductCategoryType.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => product_category_1.ProductCategory, productCategory => productCategory.productCategoryTypes),
    (0, typeorm_1.JoinColumn)({ name: "category_id", referencedColumnName: "categoryId" }),
    __metadata("design:type", product_category_1.ProductCategory)
], ProductCategoryType.prototype, "productCategoryInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_item_1.ProductItem, productItem => productItem.categoryTypeInfo),
    (0, typeorm_1.JoinColumn)({ name: "product_category_type", referencedColumnName: "productCategoryTypeId" }),
    __metadata("design:type", Object)
], ProductCategoryType.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductCategoryType.prototype, "validateProductItems", null);
ProductCategoryType = __decorate([
    (0, typeorm_1.Entity)({ name: "product_category_type" })
], ProductCategoryType);
exports.ProductCategoryType = ProductCategoryType;
