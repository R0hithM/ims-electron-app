"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const typedi_1 = require("typedi");
const test_service_1 = require("../services/test.service");
let TestController = class TestController {
    constructor(testService) {
        this.testService = testService;
    }
    getTestResp(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return { Key: "name", Value: name };
        });
    }
    getTestDataWithPaging(page = "1", pageSize = "10", sortBy = "name", sortDir = "ASC", searchBy = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const pagingAndSortingOptions = {
                page: parseInt(page),
                pageSize: parseInt(pageSize),
                sortBy,
                sortDir,
                searchBy
            };
            return this.testService.getTestDataWithPagingAndSorting(pagingAndSortingOptions);
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    (0, tsoa_1.Security)("jwt", ["read"]),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getTestResp", null);
__decorate([
    (0, tsoa_1.Get)("/pagination"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __param(4, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getTestDataWithPaging", null);
TestController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [test_service_1.TestService])
], TestController);
exports.default = TestController;
