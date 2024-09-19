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
const search_controller_1 = __importDefault(require("../controllers/search.controller"));
const validation_1 = require("../middleware/validation");
const searchProducts_1 = require("../models/joi-schemas/searchProducts");
const searchCategories_1 = require("../models/joi-schemas/searchCategories");
const searchProductItems_1 = require("../models/joi-schemas/searchProductItems");
const searchCustomer_1 = require("../models/joi-schemas/searchCustomer");
const searchSuppliers_1 = require("../models/joi-schemas/searchSuppliers");
const searchRouter = express_1.default.Router();
const searchController = typedi_1.Container.get(search_controller_1.default);
searchRouter.post("/products", validation_1.Validation.run(searchProducts_1.SearchProducts.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield searchController.findProductsWithPagination(req.body, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("products.findProductsWithPagination", e === null || e === void 0 ? void 0 : e.message));
    }
}));
searchRouter.post("/categories", validation_1.Validation.run(searchCategories_1.SearchCategories.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield searchController.findCategoriesWithPagination(req.body, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("categories.findCategoriesWithPagination", e === null || e === void 0 ? void 0 : e.message));
    }
}));
searchRouter.post("/productItems", validation_1.Validation.run(searchProductItems_1.SearchProductItems.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield searchController.findProductItemsWithPagination(req.body, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("productItems.findProductItemsWithPagination", e === null || e === void 0 ? void 0 : e.message));
    }
}));
searchRouter.post("/customers", validation_1.Validation.run(searchCustomer_1.SearchCustomer.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield searchController.findCustomers(req.body, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("customers.findCustomers", e === null || e === void 0 ? void 0 : e.message));
    }
}));
searchRouter.post("/suppliers", validation_1.Validation.run(searchSuppliers_1.SearchSuppliers.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield searchController.findSuppliers(req.body, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("suppliers.findSuppliers", e === null || e === void 0 ? void 0 : e.message));
    }
}));
searchRouter.get("/invoice/:invoiceId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const invoiceId = req.params.invoiceId;
        const results = yield searchController.getInvoiceById(invoiceId, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("invoices.getInvoiceById", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = searchRouter;
