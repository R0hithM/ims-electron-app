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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const util_repository_1 = __importDefault(require("../repositories/util.repository"));
let UtilService = class UtilService {
    constructor(utilRepository) {
        this.utilRepository = utilRepository;
    }
    getAllUnits() {
        return this.utilRepository.getAllUnits();
    }
    createUnit(unit) {
        return this.utilRepository.createUnit(unit);
    }
    updateUnit(unitId, unit) {
        unit.unitId = unitId;
        return this.utilRepository.updateUnit(unit);
    }
    deactivateUnit(unitId) {
        return this.utilRepository.deactivateUnit(unitId);
    }
    getAllQualities() {
        return this.utilRepository.getAllQualities();
    }
    createQuality(quality) {
        return this.utilRepository.createQuality(quality);
    }
    updateQuality(qualityId, quality) {
        quality.qualityId = qualityId;
        return this.utilRepository.updateQuality(quality);
    }
    deactivateQuality(qualityId) {
        return this.utilRepository.deactivateQuality(qualityId);
    }
    getAllSaleTypes() {
        return this.utilRepository.getAllSaleTypes();
    }
    createSaleType(saleType) {
        return this.utilRepository.createSaleType(saleType);
    }
    updateSaleType(saleTypeId, saleType) {
        saleType.saleTypeId = saleTypeId;
        return this.utilRepository.updateSaleType(saleType);
    }
    deactivateSaleType(saleTypeId) {
        return this.utilRepository.deactivateSaleType(saleTypeId);
    }
    getSalesAndPurchasesSummary(organizationId) {
        return this.utilRepository.getDashboardSummarySP(organizationId);
    }
};
UtilService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [util_repository_1.default])
], UtilService);
exports.default = UtilService;
