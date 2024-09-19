"use strict";
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
const express_1 = __importDefault(require("express"));
const api_error_1 = require("../models/api-error");
const typedi_1 = require("typedi");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const validation_1 = require("../middleware/validation");
const createProduct_1 = require("../models/joi-schemas/createProduct");
const createProductCategory_1 = require("../models/joi-schemas/createProductCategory");
const createProductCategoryType_1 = require("../models/joi-schemas/createProductCategoryType");
const CreateTag_1 = require("../models/joi-schemas/CreateTag");
const createProductItem_1 = require("../models/joi-schemas/createProductItem");
const getProductItems_1 = require("../models/joi-schemas/getProductItems");
const productRouter = express_1.default.Router();
const productController = typedi_1.Container.get(product_controller_1.default);
productRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const supplierId = req.query.supplierId;
        const results = yield productController.getAllProducts(user.organizationId, supplierId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.getAllProducts", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.post("/", validation_1.Validation.run(createProduct_1.CreateProduct.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const productObj = Object.assign(Object.assign({}, req.body), { user });
        const results = yield productController.createProduct(productObj);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.createProduct", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.put("/:productId", validation_1.Validation.run(createProduct_1.CreateProduct.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const results = yield productController.updateProduct(productId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.updateProduct", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.delete("/:productId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const results = yield productController.deleteProduct(productId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.deleteProduct", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.get("/:productId/categories", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const productId = req.params.productId;
        const results = yield productController.getProductCategories(productId, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.getProductCategories", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.post("/:productId/categories", validation_1.Validation.run(createProductCategory_1.CreateProductCategory.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const productId = req.params.productId;
        const productCategoryObj = Object.assign(Object.assign({}, req.body), { user });
        const results = yield productController.createProductCategory(productId, productCategoryObj);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.createProductCategory", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.put("/categories/:categoryId", validation_1.Validation.run(createProductCategory_1.CreateProductCategory.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const results = yield productController.updateProductCategory(categoryId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.updateProductCategory", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.delete("/categories/:categoryId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const results = yield productController.deleteProductCategory(categoryId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.deleteProductCategory", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.get("/categories/:categoryId/categoryTypes", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const categoryId = req.params.categoryId;
        const results = yield productController.getProductCategoryTypes(categoryId, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.getProductCategoryTypes", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.post("/categories/:categoryId/categoryTypes", validation_1.Validation.run(createProductCategoryType_1.CreateProductCategoryType.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const categoryId = req.params.categoryId;
        const productCategoryTypeObj = Object.assign(Object.assign({}, req.body), { user });
        const results = yield productController.createProductCategoryType(categoryId, productCategoryTypeObj);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.createProductCategoryType", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.put("/categoryTypes/:categoryTypeId", validation_1.Validation.run(createProductCategoryType_1.CreateProductCategoryType.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryTypeId = req.params.categoryTypeId;
        const results = yield productController.updateProductCategoryType(categoryTypeId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.updateProductCategoryType", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.delete("/categoryTypes/:categoryTypeId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryTypeId = req.params.categoryTypeId;
        const results = yield productController.deleteProductCategoryType(categoryTypeId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.deleteProductCategoryType", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.get("categories/:categoryId/categoryTypes/:categoryTypeId/tags", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const categoryTypeId = req.params.categoryTypeId;
        const results = yield productController.getTags(categoryId, categoryTypeId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.getTags", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.post("categories/:categoryId/categoryTypes/:categoryTypeId/tags", validation_1.Validation.run(CreateTag_1.CreateTag.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const categoryTypeId = req.params.categoryTypeId;
        const results = yield productController.createTag(categoryId, categoryTypeId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.createTag", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.put("tags/:tagId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagId = req.params.tagId;
        const results = yield productController.updateTag(tagId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.updateTag", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.delete("tags/:tagId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagId = req.params.tagId;
        const results = yield productController.deleteTag(tagId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.deleteTag", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.post("itemTags", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield productController.createProductItemTag(req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.createProductItemTag", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.post("/getProductItems", validation_1.Validation.run(getProductItems_1.GetProductItems.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const getProductItemsObj = Object.assign(Object.assign({}, req.body), { user });
        const results = yield productController.getProductItems(getProductItemsObj);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.getProductItems", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.post("/:productId/categories/:categoryId/categoryTypes/:categoryTypeId/items", validation_1.Validation.run(createProductItem_1.CreateProductItem.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const productId = req.params.productId;
        const categoryId = req.params.categoryId;
        const categoryTypeId = req.params.categoryTypeId;
        const productItemObj = Object.assign(Object.assign({}, req.body), { user });
        const results = yield productController.createProductItem(productId, categoryId, categoryTypeId, productItemObj);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.createProductItem", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.put("/:productId/categories/:categoryId/categoryTypes/:categoryTypeId/items/:itemId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const categoryId = req.params.categoryId;
        const categoryTypeId = req.params.categoryTypeId;
        const itemId = req.params.itemId;
        const results = yield productController.updateProductItem(productId, categoryId, categoryTypeId, itemId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.updateProductItem", e === null || e === void 0 ? void 0 : e.message));
    }
}));
productRouter.delete("/items/:itemId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.itemId;
        const results = yield productController.deleteProductItem(itemId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.deleteProductItem", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = productRouter;
