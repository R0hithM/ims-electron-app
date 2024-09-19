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
const util_controller_1 = __importDefault(require("../controllers/util.controller"));
const api_error_1 = require("../models/api-error");
const validation_1 = require("../middleware/validation");
const createUnit_1 = require("../models/joi-schemas/createUnit");
const createQuality_1 = require("../models/joi-schemas/createQuality");
const createSaleType_1 = require("../models/joi-schemas/createSaleType");
const utilRouter = express_1.default.Router();
const utilController = typedi_1.Container.get(util_controller_1.default);
utilRouter.get("/units", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield utilController.getAllUnits();
        res.send(results).status(200);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.getAllUnits", e === null || e === void 0 ? void 0 : e.message));
    }
}));
utilRouter.post("/units", validation_1.Validation.run(createUnit_1.CreateUnit.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield utilController.createUnit(req.body);
        res.status(200).send(results);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.saveUnit", e === null || e === void 0 ? void 0 : e.message));
    }
}));
utilRouter.put("/units/:unitId", validation_1.Validation.run(createUnit_1.CreateUnit.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unitId = req.params.unitId;
        const results = yield utilController.updateUnit(unitId, req.body);
        res.status(200).send(results);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.updateUnit", e === null || e === void 0 ? void 0 : e.message));
    }
}));
utilRouter.delete("/units/:unitId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unitId = req.params.unitId;
        const results = yield utilController.deactivateUnit(unitId);
        res.status(200).send(results);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.deactivateUnit", e === null || e === void 0 ? void 0 : e.message));
    }
}));
utilRouter.get("/quality", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield utilController.getAllQualities();
        res.send(results).status(200);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.getAllQualities", e === null || e === void 0 ? void 0 : e.message));
    }
}));
utilRouter.post("/quality", validation_1.Validation.run(createQuality_1.CreateQuality.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield utilController.createQuality(req.body);
        res.status(200).send(results);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.saveQuality", e === null || e === void 0 ? void 0 : e.message));
    }
}));
utilRouter.put("/quality/:qualityId", validation_1.Validation.run(createQuality_1.CreateQuality.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const qualityId = req.params.qualityId;
        const results = yield utilController.updateQuality(qualityId, req.body);
        res.status(200).send(results);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.updateQuality", e === null || e === void 0 ? void 0 : e.message));
    }
}));
utilRouter.delete("/quality/:qualityId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const qualityId = req.params.qualityId;
        const results = yield utilController.deactivateQuality(qualityId);
        res.status(200).send(results);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.deactivateQuality", e === null || e === void 0 ? void 0 : e.message));
    }
}));
utilRouter.get("/sale-types", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield utilController.getAllSaleTypes();
        res.send(results).status(200);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.getAllSaleTypes", e === null || e === void 0 ? void 0 : e.message));
    }
}));
utilRouter.post("/sale-types", validation_1.Validation.run(createSaleType_1.CreateSaleType.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield utilController.createSaleType(req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.createSaleType", e === null || e === void 0 ? void 0 : e.message));
    }
}));
utilRouter.put("/sale-types/:saleTypeId", validation_1.Validation.run(createSaleType_1.CreateSaleType.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saleTypeId = req.params.saleTypeId;
        const results = yield utilController.updateSaleType(saleTypeId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.updateSaleType", e === null || e === void 0 ? void 0 : e.message));
    }
}));
utilRouter.delete("/sale-types/:saleTypeId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saleTypeId = req.params.saleTypeId;
        const results = yield utilController.deactivateSaleType(saleTypeId);
        res.send(results).status(200);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.deactivateSaleType", e === null || e === void 0 ? void 0 : e.message));
    }
}));
utilRouter.get("/summary", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield utilController.getSalesAndPurchasesSummary(user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.getSummary", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = utilRouter;
