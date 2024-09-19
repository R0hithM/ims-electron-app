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
const validation_1 = require("../middleware/validation");
const return_controller_1 = __importDefault(require("../controllers/return.controller"));
const createReturn_1 = require("../models/joi-schemas/createReturn");
const returnRouter = express_1.default.Router();
const returnController = typedi_1.default.get(return_controller_1.default);
returnRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield returnController.getAllReturns(user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("returns.getAllReturns", e === null || e === void 0 ? void 0 : e.message));
    }
}));
returnRouter.get("/:returnId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnId = req.params.returnId;
        const results = yield returnController.getReturnById(returnId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("returns.getReturnById", e === null || e === void 0 ? void 0 : e.message));
    }
}));
returnRouter.post("/", validation_1.Validation.run(createReturn_1.CreateReturn.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield returnController.createReturn(Object.assign(Object.assign({}, req.body), { user }));
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("returns.createReturn", e === null || e === void 0 ? void 0 : e.message));
    }
}));
returnRouter.put("/:returnId", validation_1.Validation.run(createReturn_1.CreateReturn.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnId = req.params.returnId;
        const results = yield returnController.updateReturn(returnId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("returns.updateReturn", e === null || e === void 0 ? void 0 : e.message));
    }
}));
returnRouter.delete("/:returnId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnId = req.params.returnId;
        const results = yield returnController.deleteReturn(returnId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("returns.deleteReturn", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = returnRouter;
