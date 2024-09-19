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
const damage_controller_1 = __importDefault(require("../controllers/damage.controller"));
const api_error_1 = require("../models/api-error");
const validation_1 = require("../middleware/validation");
const createDamage_1 = require("../models/joi-schemas/createDamage");
const damageRouter = express_1.default.Router();
const damageController = typedi_1.default.get(damage_controller_1.default);
damageRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield damageController.getAllDamages(user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("damages.getAllDamages", e === null || e === void 0 ? void 0 : e.message));
    }
}));
damageRouter.get("/invoice/:invoiceId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const invoiceId = req.params.invoiceId;
        const results = yield damageController.getDamageByInvoiceId(invoiceId, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("damages.getDamageByInvoiceId", e === null || e === void 0 ? void 0 : e.message));
    }
}));
damageRouter.get("/:damageId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const damageId = req.params.damageId;
        const results = yield damageController.getDamageById(damageId, user.organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("damages.getDamageById", e === null || e === void 0 ? void 0 : e.message));
    }
}));
damageRouter.post("/", validation_1.Validation.run(createDamage_1.CreateDamage.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const results = yield damageController.createDamage(Object.assign(Object.assign({}, req.body), { user }));
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("damages.createDamage", e === null || e === void 0 ? void 0 : e.message));
    }
}));
damageRouter.put("/:damageId", validation_1.Validation.run(createDamage_1.CreateDamage.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const damageId = req.params.damageId;
        const results = yield damageController.updateDamage(damageId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("damages.updateDamage", e === null || e === void 0 ? void 0 : e.message));
    }
}));
damageRouter.delete("/:damageId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const damageId = req.params.damageId;
        const results = yield damageController.deleteDamage(damageId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("damages.deleteDamage", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = damageRouter;
