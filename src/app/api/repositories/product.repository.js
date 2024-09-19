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
const db_1 = __importDefault(require("../config/db"));
const product_1 = require("../models/entities/product");
const product_category_1 = require("../models/entities/product-category");
const product_category_type_1 = require("../models/entities/product-category-type");
const tag_1 = require("../models/entities/tag");
const product_item_tags_1 = require("../models/entities/product-item-tags");
const product_item_1 = require("../models/entities/product-item");
const paging_sorting_repository_1 = __importDefault(require("./paging-sorting.repository"));
const typeorm_1 = require("typeorm");
let ProductRepository = class ProductRepository extends paging_sorting_repository_1.default {
    constructor() {
        super(product_item_1.ProductItem);
        this.productsRepo = db_1.default.getRepository(product_1.Product);
        this.productCategoriesRepo = db_1.default.getRepository(product_category_1.ProductCategory);
        this.productCategoryTypesRepo = db_1.default.getRepository(product_category_type_1.ProductCategoryType);
        this.tagsRepo = db_1.default.getRepository(tag_1.Tag);
        this.productItemTagsRepo = db_1.default.getRepository(product_item_tags_1.ProductItemTag);
        this.productItemsRepo = db_1.default.getRepository(product_item_1.ProductItem);
    }
    getAllProducts(organizationId) {
        return this.productsRepo.find({ where: { organizationId, isActive: true }, relations: { productCategories: true } });
    }
    getAllProductsBySupplierId(organizationId, supplierId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productItems = yield this.productItemsRepo.find({
                where: { supplierId, organizationId, isActive: true },
                select: { productId: true },
            });
            const productIds = productItems.map(item => item.productId);
            return this.productsRepo.find({
                where: { productId: (0, typeorm_1.In)(productIds), organizationId, isActive: true },
                relations: { productCategories: true }
            });
        });
    }
    getProductById(productId) {
        return this.productsRepo.findOneBy({ productId, isActive: true });
    }
    createProduct(product) {
        return this.productsRepo.save(product);
    }
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.productsRepo.update({ productId: product.productId, isActive: true }, product);
            return result.affected ? result.affected > 0 : false;
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.productsRepo.update({ productId, isActive: true }, { isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
    getProductCategories(productId, organizationId) {
        return this.productCategoriesRepo.find({ where: { productId, organizationId, isActive: true }, relations: { productCategoryTypes: true } });
    }
    createProductCategory(productCategory) {
        return this.productCategoriesRepo.save(productCategory);
    }
    updateProductCategory(productCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.productCategoriesRepo.update({ categoryId: productCategory.categoryId, isActive: true }, productCategory);
            return result.affected ? result.affected > 0 : false;
        });
    }
    deleteProductCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.productCategoriesRepo.delete(categoryId);
            return result.affected ? result.affected > 0 : false;
        });
    }
    getProductCategoryTypes(categoryId, organizationId) {
        return this.productCategoryTypesRepo.find({ where: { categoryId, organizationId, isActive: true }, relations: { items: true } });
    }
    createProductCategoryType(productCategoryType) {
        return this.productCategoryTypesRepo.save(productCategoryType);
    }
    updateProductCategoryType(productCategoryType) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.productCategoryTypesRepo.update({ categoryTypeId: productCategoryType.categoryTypeId, isActive: true }, productCategoryType);
            return result.affected ? result.affected > 0 : false;
        });
    }
    deleteProductCategoryType(categoryTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.productCategoryTypesRepo.update({ categoryTypeId, isActive: true }, { isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
    getTags(categoryId, categoryTypeId) {
        return this.tagsRepo.find({
            where: { categoryId, categoryTypeId, isActive: true },
            relations: { productItemTag: true }
        });
    }
    createTag(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTag = yield this.tagsRepo.save(tag);
            const newProductItemTag = new product_item_tags_1.ProductItemTag();
            newProductItemTag.tagId = newTag.tagId;
            yield this.productItemTagsRepo.save(newProductItemTag);
            return this.tagsRepo.findOne({
                where: { tagId: newTag.tagId, isActive: true },
                relations: { productItemTag: true }
            });
        });
    }
    updateTag(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.tagsRepo.update({ tagId: tag.tagId, isActive: true }, tag);
            return result.affected ? result.affected > 0 : false;
        });
    }
    deleteTag(tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.tagsRepo.update({ tagId, isActive: true }, { isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
    createProductItemTag(productItemTag) {
        return this.productItemTagsRepo.save(productItemTag);
    }
    getProductItems(productItemsObj) {
        const { productId, categoryId, categoryTypeId, user } = productItemsObj;
        const whereCondition = {
            productId,
            categoryId,
            categoryTypeId,
            organizationId: user.organizationId,
            isActive: true
        };
        return this.getEntitiesWithPagingAndSorting(productItemsObj, whereCondition);
    }
    createProductItem(productItem) {
        return this.productItemsRepo.save(productItem);
    }
    updateProductItem(productItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.productItemsRepo.update({ itemId: productItem.itemId, isActive: true }, productItem);
            return result.affected ? result.affected > 0 : false;
        });
    }
    deleteProductItem(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.productItemsRepo.update({ itemId, isActive: true }, { isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
    updateProductItemsAvailability(productItems, transactionType) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemIds = productItems.map(item => item.itemId);
            const existingItems = yield this.productItemsRepo.find({ where: { itemId: (0, typeorm_1.In)(itemIds) } });
            for (const existingItem of existingItems) {
                const productItem = productItems.find(item => item.itemId === existingItem.itemId);
                if (productItem) {
                    if (transactionType === "SALE") {
                        existingItem.availableQuantity -= productItem.totalQuantity;
                    }
                    else if (transactionType === "PURCHASE") {
                        existingItem.availableQuantity += productItem.totalQuantity;
                        existingItem.purchasePrice = productItem.purchasePrice;
                    }
                }
                yield this.productItemsRepo.save(existingItem);
            }
            return true;
        });
    }
    getProductItemByItemCode(itemCode, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productItemsRepo.findOneBy({ itemCode, organizationId, isActive: true });
        });
    }
    getProductItemById(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productItemsRepo.findOneBy({ itemId, isActive: true });
        });
    }
};
ProductRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], ProductRepository);
exports.default = ProductRepository;
