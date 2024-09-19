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
const typedi_1 = __importDefault(require("typedi"));
const purchase_controller_1 = __importDefault(require("../controllers/purchase.controller"));
const api_error_1 = require("../models/api-error");
const validation_1 = require("../middleware/validation");
const createPurchase_1 = require("../models/joi-schemas/createPurchase");
const purchaseRouter = express_1.default.Router();
const purchaseController = typedi_1.default.get(purchase_controller_1.default);
purchaseRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield purchaseController.getAllPurchases(user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("purchases.getAllPurchases", e === null || e === void 0 ? void 0 : e.message));
    }
}));
purchaseRouter.get("/:purchaseId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchaseId = req.params.purchaseId;
        const results = yield purchaseController.getPurchaseById(purchaseId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("purchases.getPurchaseById", e === null || e === void 0 ? void 0 : e.message));
    }
}));
purchaseRouter.post("/", validation_1.Validation.run(createPurchase_1.CreatePurchase.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield purchaseController.createPurchase(Object.assign(Object.assign({}, req.body), { user }));
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("purchases.createPurchase", e === null || e === void 0 ? void 0 : e.message));
    }
}));
purchaseRouter.put("/:purchaseId", validation_1.Validation.run(createPurchase_1.CreatePurchase.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchaseId = req.params.purchaseId;
        const results = yield purchaseController.updatePurchase(purchaseId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("purchases.updatePurchase", e === null || e === void 0 ? void 0 : e.message));
    }
}));
purchaseRouter.delete("/:purchaseId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchaseId = req.params.purchaseId;
        const results = yield purchaseController.deletePurchase(purchaseId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("purchases.deletePurchase", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = purchaseRouter;
