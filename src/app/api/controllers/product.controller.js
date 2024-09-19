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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const typedi_1 = require("typedi");
const product_service_1 = __importDefault(require("../services/product.service"));
const product_1 = require("../models/entities/product");
const product_category_1 = require("../models/entities/product-category");
const product_category_type_1 = require("../models/entities/product-category-type");
const tag_1 = require("../models/entities/tag");
const product_items_1 = require("../models/interface/product-items");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getAllProducts(organizationId = "", supplierId = "") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.getAllProducts(organizationId, supplierId);
        });
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.createProduct(product);
        });
    }
    updateProduct(productId, product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.updateProduct(productId, product);
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.deleteProduct(productId);
        });
    }
    getProductCategories(productId, organizationId = "") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.getProductCategories(productId, organizationId);
        });
    }
    createProductCategory(productId, productCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.createProductCategory(productId, productCategory);
        });
    }
    updateProductCategory(categoryId, productCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.updateProductCategory(categoryId, productCategory);
        });
    }
    deleteProductCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.deleteProductCategory(categoryId);
        });
    }
    getProductCategoryTypes(categoryId, organizationId = "") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.getProductCategoryTypes(categoryId, organizationId);
        });
    }
    createProductCategoryType(categoryId, productCategoryType) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.createProductCategoryType(categoryId, productCategoryType);
        });
    }
    updateProductCategoryType(categoryTypeId, productCategoryType) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.updateProductCategoryType(categoryTypeId, productCategoryType);
        });
    }
    deleteProductCategoryType(categoryTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.deleteProductCategoryType(categoryTypeId);
        });
    }
    getTags(categoryId, categoryTypeId) {
        return this.productService.getTags(categoryId, categoryTypeId);
    }
    createTag(categoryId, categoryTypeId, tag) {
        return this.productService.createTag(categoryId, categoryTypeId, tag);
    }
    updateTag(tagId, tag) {
        return this.productService.updateTag(tagId, tag);
    }
    deleteTag(tagId) {
        return this.productService.deleteTag(tagId);
    }
    createProductItemTag(itemTag) {
        return this.productService.createProductItemTag(itemTag);
    }
    getProductItems(productItemsObj) {
        return this.productService.getProductItems(productItemsObj);
    }
    createProductItem(productId, categoryId, categoryTypeId, productItem) {
        return this.productService.createProductItem(productId, categoryId, categoryTypeId, productItem);
    }
    updateProductItem(productId, categoryId, categoryTypeId, itemId, productItem) {
        return this.productService.updateProductItem(productId, categoryId, categoryTypeId, itemId, productItem);
    }
    deleteProductItem(itemId) {
        return this.productService.deleteProductItem(itemId);
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(0, (0, tsoa_1.Hidden)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, tsoa_1.Put)("/:productId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_1.Product]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, tsoa_1.Delete)("/:productId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, tsoa_1.Get)("/:productId/categories"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductCategories", null);
__decorate([
    (0, tsoa_1.Post)("/:productId/categories"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProductCategory", null);
__decorate([
    (0, tsoa_1.Put)("/categories/:categoryId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_category_1.ProductCategory]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductCategory", null);
__decorate([
    (0, tsoa_1.Delete)("/categories/:categoryId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProductCategory", null);
__decorate([
    (0, tsoa_1.Get)("/categories/:categoryId/categoryTypes"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductCategoryTypes", null);
__decorate([
    (0, tsoa_1.Post)("/categories/:categoryId/categoryTypes"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProductCategoryType", null);
__decorate([
    (0, tsoa_1.Put)("/categoryTypes/:categoryTypeId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_category_type_1.ProductCategoryType]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductCategoryType", null);
__decorate([
    (0, tsoa_1.Delete)("/categoryTypes/:categoryTypeId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProductCategoryType", null);
__decorate([
    (0, tsoa_1.Get)("/categories/:categoryId/categoryTypes/:categoryTypeId/tags"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getTags", null);
__decorate([
    (0, tsoa_1.Post)("/categories/:categoryId/categoryTypes/:categoryTypeId/tags"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createTag", null);
__decorate([
    (0, tsoa_1.Put)("/tags/:tagId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tag_1.Tag]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateTag", null);
__decorate([
    (0, tsoa_1.Delete)("/tags/:tagId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteTag", null);
__decorate([
    (0, tsoa_1.Post)("itemTags"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProductItemTag", null);
__decorate([
    (0, tsoa_1.Post)("/getProductItems"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_items_1.GetProductItemsObj]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductItems", null);
__decorate([
    (0, tsoa_1.Post)("/:productId/categories/:categoryId/categoryTypes/:categoryTypeId/items"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Path)()),
    __param(3, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProductItem", null);
__decorate([
    (0, tsoa_1.Put)("/:productId/categories/:categoryId/categoryTypes/:categoryTypeId/items/:itemId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Path)()),
    __param(3, (0, tsoa_1.Path)()),
    __param(4, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductItem", null);
__decorate([
    (0, tsoa_1.Delete)("/items/:itemId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProductItem", null);
ProductController = __decorate([
    (0, tsoa_1.Tags)("Products"),
    (0, tsoa_1.Route)("api/products"),
    (0, tsoa_1.Security)("token"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [product_service_1.default])
], ProductController);
exports.default = ProductController;
