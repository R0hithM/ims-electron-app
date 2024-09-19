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
const typedi_1 = require("typedi");
const api_error_1 = require("../models/api-error");
const supplier_controller_1 = __importDefault(require("../controllers/supplier.controller"));
const validation_1 = require("../middleware/validation");
const createSupplier_1 = require("../models/joi-schemas/createSupplier");
const getPayments_1 = require("../models/joi-schemas/getPayments");
const supplierPayment_1 = require("../models/joi-schemas/supplierPayment");
const supplierRouter = express_1.default.Router();
const supplierController = typedi_1.Container.get(supplier_controller_1.default);
supplierRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield supplierController.getAllSuppliers(user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("suppliers.getAllSuppliers", e === null || e === void 0 ? void 0 : e.message));
    }
}));
supplierRouter.get("/payments", validation_1.Validation.run(getPayments_1.GetPayments.schema(), "query"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.query.status;
        const user = res.locals.user;
        const results = yield supplierController.getSuppliersPayments(status, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("suppliers.getSuppliersPayments", e === null || e === void 0 ? void 0 : e.message));
    }
}));
supplierRouter.post("/add-payment", validation_1.Validation.run(supplierPayment_1.SupplierPayment.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield supplierController.updateSupplierPayment(Object.assign(Object.assign({}, req.body), { user }));
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("suppliers.updateSupplierPayment", e === null || e === void 0 ? void 0 : e.message));
    }
}));
supplierRouter.get("/:supplierId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplierId = req.params.supplierId;
        const results = yield supplierController.getSupplierById(supplierId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("suppliers.getSupplierById", e === null || e === void 0 ? void 0 : e.message));
    }
}));
supplierRouter.post("/", validation_1.Validation.run(createSupplier_1.CreateSupplier.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield supplierController.createSupplier(Object.assign(Object.assign({}, req.body), { user }));
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("suppliers.createSupplier", e === null || e === void 0 ? void 0 : e.message));
    }
}));
supplierRouter.put("/:supplierId", validation_1.Validation.run(createSupplier_1.CreateSupplier.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplierId = req.params.supplierId;
        const results = yield supplierController.updateSupplier(supplierId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("suppliers.updateSupplier", e === null || e === void 0 ? void 0 : e.message));
    }
}));
supplierRouter.delete("/:supplierId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplierId = req.params.supplierId;
        const results = yield supplierController.deleteSupplier(supplierId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("suppliers.deleteSupplier", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = supplierRouter;
