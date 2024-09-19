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
const credit_note_controller_1 = __importDefault(require("../controllers/credit-note.controller"));
const api_error_1 = require("../models/api-error");
const validation_1 = require("../middleware/validation");
const createCreditNote_1 = require("../models/joi-schemas/createCreditNote");
const settleCreditNote_1 = require("../models/joi-schemas/settleCreditNote");
const creditNoteRouter = express_1.default.Router();
const creditNoteController = typedi_1.default.get(credit_note_controller_1.default);
creditNoteRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield creditNoteController.getAllCreditNotes(user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("creditNotes.getAllCreditNotes", e === null || e === void 0 ? void 0 : e.message));
    }
}));
creditNoteRouter.get("/active", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield creditNoteController.getAllActiveCreditNotes(user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("creditNotes.getAllActiveCreditNotes", e === null || e === void 0 ? void 0 : e.message));
    }
}));
creditNoteRouter.get("/invoice/:invoiceId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const invoiceId = req.params.invoiceId;
        const results = yield creditNoteController.getCreditNoteByInvoiceId(invoiceId, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("creditNotes.getCreditNoteByInvoiceId", e === null || e === void 0 ? void 0 : e.message));
    }
}));
creditNoteRouter.get("/:creditNoteId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creditNoteId = req.params.creditNoteId;
        const results = yield creditNoteController.getCreditNoteById(creditNoteId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("creditNotes.getCreditNoteById", e === null || e === void 0 ? void 0 : e.message));
    }
}));
creditNoteRouter.post("/", validation_1.Validation.run(createCreditNote_1.CreateCreditNote.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield creditNoteController.createCreditNote(req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("creditNotes.createCreditNote", e === null || e === void 0 ? void 0 : e.message));
    }
}));
creditNoteRouter.put("/:creditNoteId", validation_1.Validation.run(createCreditNote_1.CreateCreditNote.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creditNoteId = req.params.creditNoteId;
        const results = yield creditNoteController.updateCreditNote(creditNoteId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("creditNotes.updateCreditNote", e === null || e === void 0 ? void 0 : e.message));
    }
}));
creditNoteRouter.delete("/:creditNoteId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creditNoteId = req.params.creditNoteId;
        const results = yield creditNoteController.deleteCreditNote(creditNoteId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("creditNotes.deleteCreditNote", e === null || e === void 0 ? void 0 : e.message));
    }
}));
creditNoteRouter.get("/search/:invoiceId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const invoiceId = req.params.invoiceId;
        const results = yield creditNoteController.getCreditNotesByInvoiceId(invoiceId, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("creditNotes.getCreditNotesByInvoiceId", e === null || e === void 0 ? void 0 : e.message));
    }
}));
creditNoteRouter.get("/customer/:customerId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.customerId;
        const results = yield creditNoteController.getCreditNoteByCustomerId(customerId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("creditNotes.getCreditNoteByCustomerId", e === null || e === void 0 ? void 0 : e.message));
    }
}));
creditNoteRouter.post("/settle", validation_1.Validation.run(settleCreditNote_1.SettleCreditNote.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield creditNoteController.settleCreditNoteByCustomerId(Object.assign(Object.assign({}, req.body), { user }));
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("creditNotes.settleCreditNoteByCustomerId", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = creditNoteRouter;
