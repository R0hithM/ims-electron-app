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
exports.ProductItem = void 0;
const typeorm_1 = require("typeorm");
const unit_1 = require("./unit");
const product_1 = require("./product");
const product_category_1 = require("./product-category");
const product_category_type_1 = require("./product-category-type");
const supplier_1 = require("./supplier");
let ProductItem = class ProductItem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "item_id" }),
    __metadata("design:type", String)
], ProductItem.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "item_code" }),
    __metadata("design:type", String)
], ProductItem.prototype, "itemCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "item_name" }),
    __metadata("design:type", String)
], ProductItem.prototype, "itemName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "rate", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ProductItem.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "total_quantity" }),
    __metadata("design:type", Number)
], ProductItem.prototype, "totalQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "available_quantity" }),
    __metadata("design:type", Number)
], ProductItem.prototype, "availableQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "unit_id" }),
    __metadata("design:type", String)
], ProductItem.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_id" }),
    __metadata("design:type", String)
], ProductItem.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_id" }),
    __metadata("design:type", String)
], ProductItem.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_type_id" }),
    __metadata("design:type", String)
], ProductItem.prototype, "categoryTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "item_tag_id" }),
    __metadata("design:type", String)
], ProductItem.prototype, "itemTagId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "supplier_id" }),
    __metadata("design:type", String)
], ProductItem.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "image" }),
    __metadata("design:type", String)
], ProductItem.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description" }),
    __metadata("design:type", String)
], ProductItem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "purchase_price", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ProductItem.prototype, "purchasePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "sale_price", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ProductItem.prototype, "salePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "discount", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ProductItem.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "company_name" }),
    __metadata("design:type", String)
], ProductItem.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "item_weight", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ProductItem.prototype, "itemWeight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_id" }),
    __metadata("design:type", String)
], ProductItem.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], ProductItem.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], ProductItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], ProductItem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], ProductItem.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], ProductItem.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => unit_1.Unit, unit => unit.unitId),
    (0, typeorm_1.JoinColumn)({ name: "unit_id", referencedColumnName: "unitId" }),
    __metadata("design:type", unit_1.Unit)
], ProductItem.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => product_1.Product, product => product.productId),
    (0, typeorm_1.JoinColumn)({ name: "product_id", referencedColumnName: "productId" }),
    __metadata("design:type", product_1.Product)
], ProductItem.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => product_category_1.ProductCategory, productCategory => productCategory.categoryId),
    (0, typeorm_1.JoinColumn)({ name: "category_id", referencedColumnName: "categoryId" }),
    __metadata("design:type", product_category_1.ProductCategory)
], ProductItem.prototype, "productCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => product_category_type_1.ProductCategoryType, productCategoryType => productCategoryType.categoryTypeId),
    (0, typeorm_1.JoinColumn)({ name: "category_type_id", referencedColumnName: "categoryTypeId" }),
    __metadata("design:type", product_category_type_1.ProductCategoryType)
], ProductItem.prototype, "categoryTypeInfo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => supplier_1.Supplier, supplier => supplier.supplierId),
    (0, typeorm_1.JoinColumn)({ name: "supplier_id", referencedColumnName: "supplierId" }),
    __metadata("design:type", supplier_1.Supplier)
], ProductItem.prototype, "supplier", void 0);
ProductItem = __decorate([
    (0, typeorm_1.Entity)("product_item")
], ProductItem);
exports.ProductItem = ProductItem;
