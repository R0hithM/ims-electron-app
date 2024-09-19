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
const sale_service_1 = require("../services/sale.service");
const sale_1 = require("../models/entities/sale");
let SaleController = class SaleController {
    constructor(saleService) {
        this.saleService = saleService;
    }
    getAllSales(organizationId = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saleService.getAllSales(organizationId);
        });
    }
    getSaleById(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saleService.getSaleById(saleId);
        });
    }
    createSale(sale) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saleService.createSale(sale);
        });
    }
    updateSale(saleId, sale) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saleService.updateSale(saleId, sale);
        });
    }
    deleteSale(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saleService.deleteSale(saleId);
        });
    }
    getSalesByCustomerId(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saleService.getSalesByCustomerId(customerId);
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
], SaleController.prototype, "getAllSales", null);
__decorate([
    (0, tsoa_1.Get)("/:saleId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "getSaleById", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "createSale", null);
__decorate([
    (0, tsoa_1.Put)("/:saleId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sale_1.Sale]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "updateSale", null);
__decorate([
    (0, tsoa_1.Delete)("/:saleId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "deleteSale", null);
__decorate([
    (0, tsoa_1.Get)("/customer/:customerId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "getSalesByCustomerId", null);
SaleController = __decorate([
    (0, tsoa_1.Tags)("Sales"),
    (0, tsoa_1.Route)("api/sales"),
    (0, tsoa_1.Security)("token"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [sale_service_1.SaleService])
], SaleController);
exports.default = SaleController;
