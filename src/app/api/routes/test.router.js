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
const test_controller_1 = __importDefault(require("../controllers/test.controller"));
const validation_1 = require("../middleware/validation");
const getTestDataWithPaging_1 = require("../models/joi-schemas/getTestDataWithPaging");
const testRouter = express_1.default.Router();
const testController = typedi_1.Container.get(test_controller_1.default);
testRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const results = yield testController.getTestResp(name);
        res.send(results).status(200);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("Test.test", e === null || e === void 0 ? void 0 : e.message));
    }
}));
testRouter.get("/pagination", validation_1.Validation.run(getTestDataWithPaging_1.GetTestDataWithPaging.schema(), "query"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, pageSize, sortBy, sortDir, searchBy } = req.query;
        const getData = yield testController.getTestDataWithPaging(page, pageSize, sortBy, sortDir, searchBy);
        res.status(200).send(getData);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("Test.getTestDataWithPaging", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = testRouter;
