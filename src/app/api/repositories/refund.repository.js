"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundRepository = void 0;
const typedi_1 = require("typedi");
const db_1 = __importDefault(require("../config/db"));
const refund_1 = require("../models/entities/refund");
let RefundRepository = class RefundRepository {
    constructor() {
        this.refundsRepo = db_1.default.getRepository(refund_1.Refund);
    }
    getAllRefunds() {
        return this.refundsRepo.find({ where: { isActive: true } });
    }
    getRefundById(refundId) {
        return this.refundsRepo.findOneBy({ refundId, isActive: true });
    }
    createRefund(refund) {
        return this.refundsRepo.save(refund);
    }
    updateRefund(refund) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.refundsRepo.update({ refundId: refund.refundId, isActive: true }, refund);
            return result.affected ? result.affected > 0 : false;
        });
    }
    deleteRefund(refundId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.refundsRepo.update({ refundId, isActive: true }, { isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
};
RefundRepository = __decorate([
    (0, typedi_1.Service)()
], RefundRepository);
exports.RefundRepository = RefundRepository;
