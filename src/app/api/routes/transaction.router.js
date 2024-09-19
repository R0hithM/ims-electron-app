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
const transaction_controller_1 = __importDefault(require("../controllers/transaction.controller"));
const api_error_1 = require("../models/api-error");
const validation_1 = require("../middleware/validation");
const createTransaction_1 = require("../models/joi-schemas/createTransaction");
const getTransactions_1 = require("../models/joi-schemas/getTransactions");
const transactionRouter = express_1.default.Router();
const transactionController = typedi_1.default.get(transaction_controller_1.default);
transactionRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield transactionController.getAllTransactions(user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("transactions.getAllTransactions", e === null || e === void 0 ? void 0 : e.message));
    }
}));
transactionRouter.get("/:transactionId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionId = req.params.transactionId;
        const results = yield transactionController.getTransactionById(transactionId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("transactions.getTransactionById", e === null || e === void 0 ? void 0 : e.message));
    }
}));
transactionRouter.post("/", validation_1.Validation.run(createTransaction_1.CreateTransaction.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield transactionController.createTransaction(req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("transactions.createTransaction", e === null || e === void 0 ? void 0 : e.message));
    }
}));
transactionRouter.put("/:transactionId", validation_1.Validation.run(createTransaction_1.CreateTransaction.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionId = req.params.transactionId;
        const results = yield transactionController.updateTransaction(transactionId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("transactions.updateTransaction", e === null || e === void 0 ? void 0 : e.message));
    }
}));
transactionRouter.delete("/:transactionId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionId = req.params.transactionId;
        const results = yield transactionController.deleteTransaction(transactionId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("transactions.deleteTransaction", e === null || e === void 0 ? void 0 : e.message));
    }
}));
transactionRouter.post("/filter", validation_1.Validation.run(getTransactions_1.GetTransactions.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield transactionController.getTransactionsWithPagination(Object.assign(Object.assign({}, req.body), { user }));
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("transactions.getTransactionsWithPagination", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = transactionRouter;
