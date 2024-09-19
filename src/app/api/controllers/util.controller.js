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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const typedi_1 = require("typedi");
const util_service_1 = __importDefault(require("../services/util.service"));
const unit_1 = require("../models/entities/unit");
const quality_1 = require("../models/entities/quality");
const sale_type_1 = require("../models/entities/sale-type");
let UtilController = class UtilController {
    constructor(utilService) {
        this.utilService = utilService;
    }
    getAllUnits() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.utilService.getAllUnits();
        });
    }
    createUnit(unit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.utilService.createUnit(unit);
        });
    }
    updateUnit(unitId, unit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.utilService.updateUnit(unitId, unit);
        });
    }
    deactivateUnit(unitId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.utilService.deactivateUnit(unitId);
        });
    }
    getAllQualities() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.utilService.getAllQualities();
        });
    }
    createQuality(Quality) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.utilService.createQuality(Quality);
        });
    }
    updateQuality(qualityId, quality) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.utilService.updateQuality(qualityId, quality);
        });
    }
    deactivateQuality(qualityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.utilService.deactivateQuality(qualityId);
        });
    }
    getAllSaleTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.utilService.getAllSaleTypes();
        });
    }
    createSaleType(saleType) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.utilService.createSaleType(saleType);
        });
    }
    updateSaleType(saleTypeId, saleType) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.utilService.updateSaleType(saleTypeId, saleType);
        });
    }
    deactivateSaleType(saleTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.utilService.deactivateSaleType(saleTypeId);
        });
    }
    getSalesAndPurchasesSummary(organizationId = "") {
        return __awaiter(this, void 0, void 0, function* () {
            return this.utilService.getSalesAndPurchasesSummary(organizationId);
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/units"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UtilController.prototype, "getAllUnits", null);
__decorate([
    (0, tsoa_1.Post)("/units"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unit_1.Unit]),
    __metadata("design:returntype", Promise)
], UtilController.prototype, "createUnit", null);
__decorate([
    (0, tsoa_1.Put)("/units/:unitId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, unit_1.Unit]),
    __metadata("design:returntype", Promise)
], UtilController.prototype, "updateUnit", null);
__decorate([
    (0, tsoa_1.Delete)("/units/:unitId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UtilController.prototype, "deactivateUnit", null);
__decorate([
    (0, tsoa_1.Get)("/quality"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UtilController.prototype, "getAllQualities", null);
__decorate([
    (0, tsoa_1.Post)("/quality"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quality_1.Quality]),
    __metadata("design:returntype", Promise)
], UtilController.prototype, "createQuality", null);
__decorate([
    (0, tsoa_1.Put)("/quality/:qualityId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, quality_1.Quality]),
    __metadata("design:returntype", Promise)
], UtilController.prototype, "updateQuality", null);
__decorate([
    (0, tsoa_1.Delete)("quality/:qualityId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UtilController.prototype, "deactivateQuality", null);
__decorate([
    (0, tsoa_1.Get)("/sale-types"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UtilController.prototype, "getAllSaleTypes", null);
__decorate([
    (0, tsoa_1.Post)("/sale-types"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sale_type_1.SaleType]),
    __metadata("design:returntype", Promise)
], UtilController.prototype, "createSaleType", null);
__decorate([
    (0, tsoa_1.Put)("/sale-types/:saleTypeId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sale_type_1.SaleType]),
    __metadata("design:returntype", Promise)
], UtilController.prototype, "updateSaleType", null);
__decorate([
    (0, tsoa_1.Delete)("/sale-types/:saleTypeId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UtilController.prototype, "deactivateSaleType", null);
__decorate([
    (0, tsoa_1.Get)("/summary"),
    __param(0, (0, tsoa_1.Query)()),
    __param(0, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UtilController.prototype, "getSalesAndPurchasesSummary", null);
UtilController = __decorate([
    (0, tsoa_1.Tags)("Utils"),
    (0, tsoa_1.Route)("api/utils"),
    (0, tsoa_1.Security)("token"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [util_service_1.default])
], UtilController);
exports.default = UtilController;
