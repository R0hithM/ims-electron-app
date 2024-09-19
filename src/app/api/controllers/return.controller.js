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
const return_service_1 = require("../services/return.service");
const return_1 = require("../models/entities/return");
let ReturnController = class ReturnController {
    constructor(returnService) {
        this.returnService = returnService;
    }
    getAllReturns(organizationId = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return this.returnService.getAllReturns(organizationId);
        });
    }
    getReturnById(returnId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.returnService.getReturnById(returnId);
        });
    }
    createReturn(returnObj) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.returnService.createReturn(returnObj);
        });
    }
    updateReturn(returnId, returnObj) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.returnService.updateReturn(returnId, returnObj);
        });
    }
    deleteReturn(returnId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.returnService.deleteReturn(returnId);
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(0, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReturnController.prototype, "getAllReturns", null);
__decorate([
    (0, tsoa_1.Get)("/:returnId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReturnController.prototype, "getReturnById", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReturnController.prototype, "createReturn", null);
__decorate([
    (0, tsoa_1.Put)("/:returnId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, return_1.Return]),
    __metadata("design:returntype", Promise)
], ReturnController.prototype, "updateReturn", null);
__decorate([
    (0, tsoa_1.Delete)("/:returnId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReturnController.prototype, "deleteReturn", null);
ReturnController = __decorate([
    (0, tsoa_1.Tags)("Returns"),
    (0, tsoa_1.Route)("api/returns"),
    (0, tsoa_1.Security)("token"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [return_service_1.ReturnService])
], ReturnController);
exports.default = ReturnController;
