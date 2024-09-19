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
const purchase_service_1 = require("../services/purchase.service");
const purchase_1 = require("../models/entities/purchase");
let PurchaseController = class PurchaseController {
    constructor(purchaseService) {
        this.purchaseService = purchaseService;
    }
    getAllPurchases(organizationId = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.purchaseService.getAllPurchases(organizationId);
        });
    }
    getPurchaseById(purchaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.purchaseService.getPurchaseById(purchaseId);
        });
    }
    createPurchase(purchase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.purchaseService.createPurchase(purchase);
        });
    }
    updatePurchase(purchaseId, purchase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.purchaseService.updatePurchase(purchaseId, purchase);
        });
    }
    deletePurchase(purchaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.purchaseService.deletePurchase(purchaseId);
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
], PurchaseController.prototype, "getAllPurchases", null);
__decorate([
    (0, tsoa_1.Get)("/:purchaseId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "getPurchaseById", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "createPurchase", null);
__decorate([
    (0, tsoa_1.Put)("/:purchaseId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, purchase_1.Purchase]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "updatePurchase", null);
__decorate([
    (0, tsoa_1.Delete)("/:purchaseId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "deletePurchase", null);
PurchaseController = __decorate([
    (0, tsoa_1.Tags)("Purchases"),
    (0, tsoa_1.Route)("api/purchases"),
    (0, tsoa_1.Security)("token"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [purchase_service_1.PurchaseService])
], PurchaseController);
exports.default = PurchaseController;
