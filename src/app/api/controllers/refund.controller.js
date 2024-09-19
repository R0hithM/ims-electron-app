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
const refund_service_1 = require("../services/refund.service");
const refund_1 = require("../models/entities/refund");
let RefundController = class RefundController {
    constructor(refundService) {
        this.refundService = refundService;
    }
    getAllRefunds() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.refundService.getAllRefunds();
        });
    }
    getRefundById(refundId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.refundService.getRefundById(refundId);
        });
    }
    createRefund(refund) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.refundService.createRefund(refund);
        });
    }
    updateRefund(refundId, refund) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.refundService.updateRefund(refundId, refund);
        });
    }
    deleteRefund(refundId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.refundService.deleteRefund(refundId);
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RefundController.prototype, "getAllRefunds", null);
__decorate([
    (0, tsoa_1.Get)("/:refundId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RefundController.prototype, "getRefundById", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refund_1.Refund]),
    __metadata("design:returntype", Promise)
], RefundController.prototype, "createRefund", null);
__decorate([
    (0, tsoa_1.Put)("/:refundId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, refund_1.Refund]),
    __metadata("design:returntype", Promise)
], RefundController.prototype, "updateRefund", null);
__decorate([
    (0, tsoa_1.Delete)("/:refundId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RefundController.prototype, "deleteRefund", null);
RefundController = __decorate([
    (0, tsoa_1.Tags)("Refunds"),
    (0, tsoa_1.Route)("api/refunds"),
    (0, tsoa_1.Security)("token"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [refund_service_1.RefundService])
], RefundController);
exports.default = RefundController;
