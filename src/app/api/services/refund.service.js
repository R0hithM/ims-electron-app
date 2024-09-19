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
exports.RefundService = void 0;
const typedi_1 = require("typedi");
const refund_repository_1 = require("../repositories/refund.repository");
let RefundService = class RefundService {
    constructor(refundRepository) {
        this.refundRepository = refundRepository;
    }
    getAllRefunds() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.refundRepository.getAllRefunds();
        });
    }
    getRefundById(refundId) {
        return __awaiter(this, void 0, void 0, function* () {
            const refund = yield this.refundRepository.getRefundById(refundId);
            if (!refund) {
                throw new Error("Refund not found");
            }
            return refund;
        });
    }
    createRefund(refund) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.refundRepository.createRefund(refund);
        });
    }
    updateRefund(refundId, refund) {
        return __awaiter(this, void 0, void 0, function* () {
            refund.refundId = refundId;
            return yield this.refundRepository.updateRefund(refund);
        });
    }
    deleteRefund(refundId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.refundRepository.deleteRefund(refundId);
        });
    }
};
RefundService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [refund_repository_1.RefundRepository])
], RefundService);
exports.RefundService = RefundService;
