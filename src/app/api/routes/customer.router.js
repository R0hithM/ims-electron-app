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
const customer_controller_1 = __importDefault(require("../controllers/customer.controller"));
const api_error_1 = require("../models/api-error");
const validation_1 = require("../middleware/validation");
const CreateCustomer_1 = require("../models/joi-schemas/CreateCustomer");
const getPayments_1 = require("../models/joi-schemas/getPayments");
const addPayment_1 = require("../models/joi-schemas/addPayment");
const getCustomerTransactions_1 = require("../models/joi-schemas/getCustomerTransactions");
const duePayment_1 = require("../models/joi-schemas/duePayment");
const customerRouter = express_1.default.Router();
const customerController = typedi_1.Container.get(customer_controller_1.default);
customerRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield customerController.getAllCustomers(user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("customers.getAllCustomers", e === null || e === void 0 ? void 0 : e.message));
    }
}));
customerRouter.get("/payments", validation_1.Validation.run(getPayments_1.GetPayments.schema(), "query"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const status = req.query.status;
        const results = yield customerController.getCustomersPayments(status, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("customers.getCustomerPayments", e === null || e === void 0 ? void 0 : e.message));
    }
}));
customerRouter.post("/add-payment", validation_1.Validation.run(addPayment_1.AddPayment.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield customerController.updateCustomerPayment(Object.assign(Object.assign({}, req.body), { user }));
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("customers.updateCustomerPayment", e === null || e === void 0 ? void 0 : e.message));
    }
}));
customerRouter.get("/:customerId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.customerId;
        const results = yield customerController.getCustomerById(customerId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("customers.getCustomerById", e === null || e === void 0 ? void 0 : e.message));
    }
}));
customerRouter.post("/", validation_1.Validation.run(CreateCustomer_1.CreateCustomer.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield customerController.createCustomer(Object.assign(Object.assign({}, req.body), { user }));
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("customers.createCustomer", e === null || e === void 0 ? void 0 : e.message));
    }
}));
customerRouter.put("/:customerId", validation_1.Validation.run(CreateCustomer_1.CreateCustomer.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.customerId;
        const results = yield customerController.updateCustomer(customerId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("customers.updateCustomer", e === null || e === void 0 ? void 0 : e.message));
    }
}));
customerRouter.delete("/:customerId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.customerId;
        const results = yield customerController.deleteCustomer(customerId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("customers.deleteCustomer", e === null || e === void 0 ? void 0 : e.message));
    }
}));
customerRouter.post("/transactions", validation_1.Validation.run(getCustomerTransactions_1.GetCustomerTransactions.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield customerController.getCustomerTransactions(req.body, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("customers.getCustomerTransactions", e === null || e === void 0 ? void 0 : e.message));
    }
}));
customerRouter.post("/due-payment", validation_1.Validation.run(duePayment_1.DuePayment.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield customerController.updateCustomerDueAmount(Object.assign(Object.assign({}, req.body), { user }));
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("customers.updateCustomerDueAmount", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = customerRouter;
