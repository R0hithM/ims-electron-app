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
const api_error_1 = require("../models/api-error");
const sale_controller_1 = __importDefault(require("../controllers/sale.controller"));
const validation_1 = require("../middleware/validation");
const createSale_1 = require("../models/joi-schemas/createSale");
const saleRouter = express_1.default.Router();
const saleController = typedi_1.default.get(sale_controller_1.default);
saleRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield saleController.getAllSales(user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("sales.getAllSales", e === null || e === void 0 ? void 0 : e.message));
    }
}));
saleRouter.get("/:saleId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saleId = req.params.saleId;
        const results = yield saleController.getSaleById(saleId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("sales.getSaleById", e === null || e === void 0 ? void 0 : e.message));
    }
}));
saleRouter.post("/", validation_1.Validation.run(createSale_1.CreateSale.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield saleController.createSale(Object.assign(Object.assign({}, req.body), { user }));
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("sales.createSale", e === null || e === void 0 ? void 0 : e.message));
    }
}));
saleRouter.put("/:saleId", validation_1.Validation.run(createSale_1.CreateSale.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saleId = req.params.saleId;
        const results = yield saleController.updateSale(saleId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("sales.updateSale", e === null || e === void 0 ? void 0 : e.message));
    }
}));
saleRouter.delete("/:saleId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saleId = req.params.saleId;
        const results = yield saleController.deleteSale(saleId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("sales.deleteSale", e === null || e === void 0 ? void 0 : e.message));
    }
}));
saleRouter.get("/customer/:customerId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.customerId;
        const results = yield saleController.getSalesByCustomerId(customerId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("sales.getSalesByCustomerId", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = saleRouter;
