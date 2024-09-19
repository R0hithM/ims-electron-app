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
const refund_controller_1 = __importDefault(require("../controllers/refund.controller"));
const api_error_1 = require("../models/api-error");
const validation_1 = require("../middleware/validation");
const createRefund_1 = require("../models/joi-schemas/createRefund");
const refundRouter = express_1.default.Router();
const refundController = typedi_1.default.get(refund_controller_1.default);
refundRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield refundController.getAllRefunds();
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("refunds.getAllRefunds", e === null || e === void 0 ? void 0 : e.message));
    }
}));
refundRouter.get("/:refundId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refundId = req.params.refundId;
        const results = yield refundController.getRefundById(refundId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("refunds.getRefundById", e === null || e === void 0 ? void 0 : e.message));
    }
}));
refundRouter.post("/", validation_1.Validation.run(createRefund_1.CreateRefund.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield refundController.createRefund(req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("refunds.createRefund", e === null || e === void 0 ? void 0 : e.message));
    }
}));
refundRouter.put("/:refundId", validation_1.Validation.run(createRefund_1.CreateRefund.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refundId = req.params.refundId;
        const results = yield refundController.updateRefund(refundId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("refunds.updateRefund", e === null || e === void 0 ? void 0 : e.message));
    }
}));
refundRouter.delete("/:refundId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refundId = req.params.refundId;
        const results = yield refundController.deleteRefund(refundId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("refunds.deleteRefund", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = refundRouter;
