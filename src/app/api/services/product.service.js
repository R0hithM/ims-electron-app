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
const typedi_1 = require("typedi");
const product_repository_1 = __importDefault(require("../repositories/product.repository"));
const product_1 = require("../models/entities/product");
const product_category_1 = require("../models/entities/product-category");
const product_category_type_1 = require("../models/entities/product-category-type");
const product_item_1 = require("../models/entities/product-item");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    getAllProducts(organizationId, supplierId) {
        if (supplierId) {
            return this.productRepository.getAllProductsBySupplierId(organizationId, supplierId);
        }
        return this.productRepository.getAllProducts(organizationId);
    }
    createProduct(productObj) {
        const { productName, description, productImage, user } = productObj;
        const product = new product_1.Product();
        product.productName = productName;
        product.description = description;
        product.productImage = productImage;
        product.createdBy = user.userId;
        product.organizationId = user.organizationId;
        return this.productRepository.createProduct(product);
    }
    updateProduct(productId, product) {
        product.productId = productId;
        return this.productRepository.updateProduct(product);
    }
    deleteProduct(productId) {
        return this.productRepository.deleteProduct(productId);
    }
    getProductCategories(productId, organizationId) {
        return this.productRepository.getProductCategories(productId, organizationId);
    }
    createProductCategory(productId, productCategoryObj) {
        const { categoryName, categoryImage, description, user } = productCategoryObj;
        const productCategory = new product_category_1.ProductCategory();
        productCategory.productId = productId;
        productCategory.categoryName = categoryName;
        productCategory.categoryImage = categoryImage;
        productCategory.description = description;
        productCategory.createdBy = user.userId;
        productCategory.organizationId = user.organizationId;
        return this.productRepository.createProductCategory(productCategory);
    }
    updateProductCategory(categoryId, productCategory) {
        productCategory.categoryId = categoryId;
        return this.productRepository.updateProductCategory(productCategory);
    }
    deleteProductCategory(categoryId) {
        return this.productRepository.deleteProductCategory(categoryId);
    }
    getProductCategoryTypes(categoryId, organizationId) {
        return this.productRepository.getProductCategoryTypes(categoryId, organizationId);
    }
    createProductCategoryType(categoryId, productCategoryTypeObj) {
        const { categoryTypeName, categoryTypeImage, description, user } = productCategoryTypeObj;
        const productCategoryType = new product_category_type_1.ProductCategoryType();
        productCategoryType.categoryId = categoryId;
        productCategoryType.categoryTypeName = categoryTypeName;
        productCategoryType.categoryTypeImage = categoryTypeImage;
        productCategoryType.description = description;
        productCategoryType.createdBy = user.userId;
        productCategoryType.organizationId = user.organizationId;
        return this.productRepository.createProductCategoryType(productCategoryType);
    }
    updateProductCategoryType(categoryTypeId, productCategoryType) {
        productCategoryType.categoryTypeId = categoryTypeId;
        return this.productRepository.updateProductCategoryType(productCategoryType);
    }
    deleteProductCategoryType(categoryTypeId) {
        return this.productRepository.deleteProductCategoryType(categoryTypeId);
    }
    getTags(categoryId, categoryTypeId) {
        return this.productRepository.getTags(categoryId, categoryTypeId);
    }
    createTag(categoryId, categoryTypeId, tag) {
        tag.categoryId = categoryId;
        tag.categoryTypeId = categoryTypeId;
        return this.productRepository.createTag(tag);
    }
    updateTag(tagId, tag) {
        tag.tagId = tagId;
        return this.productRepository.updateTag(tag);
    }
    deleteTag(tagId) {
        return this.productRepository.deleteTag(tagId);
    }
    createProductItemTag(productItemTag) {
        return this.productRepository.createProductItemTag(productItemTag);
    }
    getProductItems(productItemsObj) {
        return this.productRepository.getProductItems(productItemsObj);
    }
    createProductItem(productId, categoryId, categoryTypeId, productItemObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProductItem = yield this.productRepository.getProductItemByItemCode(productItemObj.itemCode, productItemObj.user.organizationId);
            if (existingProductItem) {
                throw new Error("Item code already exists");
            }
            const { itemCode, itemName, rate, totalQuantity, availableQuantity, unitId, supplierId, image, description, purchasePrice, salePrice, discount, companyName, itemWeight, user } = productItemObj;
            const productItem = new product_item_1.ProductItem();
            productItem.productId = productId;
            productItem.categoryId = categoryId;
            productItem.categoryTypeId = categoryTypeId;
            productItem.itemCode = itemCode;
            productItem.itemName = itemName;
            productItem.rate = rate;
            productItem.totalQuantity = totalQuantity;
            productItem.availableQuantity = availableQuantity;
            productItem.unitId = unitId;
            productItem.supplierId = supplierId;
            productItem.image = image;
            productItem.description = description;
            productItem.purchasePrice = purchasePrice;
            productItem.salePrice = salePrice;
            productItem.discount = discount;
            productItem.companyName = companyName;
            productItem.itemWeight = itemWeight;
            productItem.createdBy = user.userId;
            productItem.organizationId = user.organizationId;
            return this.productRepository.createProductItem(productItem);
        });
    }
    updateProductItem(productId, categoryId, categoryTypeId, itemId, productItem) {
        productItem.productId = productId;
        productItem.categoryId = categoryId;
        productItem.categoryTypeId = categoryTypeId;
        productItem.itemId = itemId;
        return this.productRepository.updateProductItem(productItem);
    }
    deleteProductItem(itemId) {
        return this.productRepository.deleteProductItem(itemId);
    }
};
ProductService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [product_repository_1.default])
], ProductService);
exports.default = ProductService;
