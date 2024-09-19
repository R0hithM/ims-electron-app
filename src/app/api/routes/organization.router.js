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
const organization_controller_1 = __importDefault(require("../controllers/organization.controller"));
const api_error_1 = require("../models/api-error");
const validation_1 = require("../middleware/validation");
const createOrganization_1 = require("../models/joi-schemas/createOrganization");
const organizationRouter = express_1.default.Router();
const organizationController = typedi_1.default.get(organization_controller_1.default);
organizationRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield organizationController.getAllOrganizations();
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("organizations.getAllOrganizations", e === null || e === void 0 ? void 0 : e.message));
    }
}));
organizationRouter.get("/types", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield organizationController.getAllOrganizationTypes();
        res.send(results).status(200);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.getAllOrganizationTypes", e === null || e === void 0 ? void 0 : e.message));
    }
}));
organizationRouter.get("/clear-db/:organizationId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizationId = req.params.organizationId;
        const results = yield organizationController.clearDatabaseByOrganizationId(organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.log(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("util.clearDatabaseByOrganizationId", e === null || e === void 0 ? void 0 : e.message));
    }
}));
organizationRouter.get("/:organizationId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizationId = req.params.organizationId;
        const results = yield organizationController.getOrganizationById(organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("organizations.getOrganizationById", e === null || e === void 0 ? void 0 : e.message));
    }
}));
organizationRouter.post("/", validation_1.Validation.run(createOrganization_1.CreateOrganization.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield organizationController.createOrganization(req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("organizations.createOrganization", e === null || e === void 0 ? void 0 : e.message));
    }
}));
organizationRouter.put("/:organizationId", validation_1.Validation.run(createOrganization_1.CreateOrganization.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizationId = req.params.organizationId;
        const results = yield organizationController.updateOrganization(organizationId, req.body);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("organizations.updateOrganization", e === null || e === void 0 ? void 0 : e.message));
    }
}));
organizationRouter.delete("/:organizationId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizationId = req.params.organizationId;
        const results = yield organizationController.deleteOrganization(organizationId);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("organizations.deleteOrganization", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = organizationRouter;
