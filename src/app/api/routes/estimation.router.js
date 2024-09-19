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
const estimation_controller_1 = __importDefault(require("../controllers/estimation.controller"));
const validation_1 = require("../middleware/validation");
const createEstimation_1 = require("../models/joi-schemas/createEstimation");
const estimationRouter = express_1.default.Router();
const estimationController = typedi_1.Container.get(estimation_controller_1.default);
estimationRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield estimationController.getAllEstimations(user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("estimations.getAllEstimations", e === null || e === void 0 ? void 0 : e.message));
    }
}));
estimationRouter.get("/:estimationId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estimationId = req.params.estimationId;
        const results = yield estimationController.getEstimationById(estimationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("estimations.getEstimationById", e === null || e === void 0 ? void 0 : e.message));
    }
}));
estimationRouter.post("/", validation_1.Validation.run(createEstimation_1.CreateEstimation.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const result = yield estimationController.createEstimation(Object.assign(Object.assign({}, req.body), { user }));
        res.send(result).status(201);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("estimations.createEstimation", e === null || e === void 0 ? void 0 : e.message));
    }
}));
estimationRouter.put("/:estimationId", validation_1.Validation.run(createEstimation_1.CreateEstimation.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estimationId = req.params.estimationId;
        const result = yield estimationController.updateEstimation(estimationId, req.body);
        res.send(result).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("estimations.updateEstimation", e === null || e === void 0 ? void 0 : e.message));
    }
}));
estimationRouter.delete("/:estimationId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estimationId = req.params.estimationId;
        const result = yield estimationController.deleteEstimation(estimationId);
        res.send(result).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("estimations.deleteEstimation", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = estimationRouter;
