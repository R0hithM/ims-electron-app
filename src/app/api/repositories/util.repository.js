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
const typedi_1 = require("typedi");
const db_1 = __importDefault(require("../config/db"));
const unit_1 = require("../models/entities/unit");
const quality_1 = require("../models/entities/quality");
const sale_type_1 = require("../models/entities/sale-type");
let UtilRepository = class UtilRepository {
    constructor() {
        this.unitsRepo = db_1.default.getRepository(unit_1.Unit);
        this.qualityRepo = db_1.default.getRepository(quality_1.Quality);
        this.saleTypeRepo = db_1.default.getRepository(sale_type_1.SaleType);
    }
    getAllUnits() {
        return this.unitsRepo.find({ where: { isActive: true } });
    }
    createUnit(unit) {
        return this.unitsRepo.save(unit);
    }
    updateUnit(unit) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.unitsRepo.update({ unitId: unit.unitId, isActive: true }, unit);
            return true;
        });
    }
    deactivateUnit(unitId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.unitsRepo.update({ unitId, isActive: true }, { isActive: false });
            return true;
        });
    }
    getAllQualities() {
        return this.qualityRepo.find({ where: { isActive: true } });
    }
    createQuality(quality) {
        return this.qualityRepo.save(quality);
    }
    updateQuality(quality) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.qualityRepo.update({ qualityId: quality.qualityId, isActive: true }, quality);
            return true;
        });
    }
    deactivateQuality(qualityId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.qualityRepo.update({ qualityId, isActive: true }, { isActive: false });
            return true;
        });
    }
    getAllSaleTypes() {
        return this.saleTypeRepo.find({ where: { isActive: true } });
    }
    getSaleTypeById(saleTypeId) {
        return this.saleTypeRepo.findOne({ where: { saleTypeId, isActive: true } });
    }
    getSaleTypeNameById(saleTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.saleTypeRepo.findOne({ where: { saleTypeId, isActive: true }, select: ["saleType"] });
            return result ? result.saleType : null;
        });
    }
    createSaleType(saleType) {
        return this.saleTypeRepo.save(saleType);
    }
    updateSaleType(saleType) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.saleTypeRepo.update({ saleTypeId: saleType.saleTypeId, isActive: true }, saleType);
            return result.affected ? result.affected > 0 : false;
        });
    }
    deactivateSaleType(saleTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.saleTypeRepo.update({ saleTypeId, isActive: true }, { isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
    getSalesSummarySP() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query("CALL GetSalesSummary");
            return { sales: result[0][0] };
        });
    }
    getPurchasesSummarySP() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query("CALL GetPurchaseSummary");
            return { purchases: result[0][0] };
        });
    }
    getSalesAndPurchasesSummarySP() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query("CALL GetSalesAndPurchaseSummary");
            return { sales: result[0][0], purchases: result[1][0] };
        });
    }
    getDashboardSummarySP(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query("CALL GetDashboardSummary(?)", [organizationId]);
            return {
                sales: result[0][0], purchases: result[1][0],
                items: result[2][0], lowStockItems: result[3],
                customerDues: result[4], returns: result[5][0]
            };
        });
    }
};
UtilRepository = __decorate([
    (0, typedi_1.Service)()
], UtilRepository);
exports.default = UtilRepository;
