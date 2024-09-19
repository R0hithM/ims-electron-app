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
const supplier_service_1 = require("../services/supplier.service");
const supplier_1 = require("../models/entities/supplier");
let SupplierController = class SupplierController {
    constructor(supplierService) {
        this.supplierService = supplierService;
    }
    getAllSuppliers(organizationId = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.supplierService.getAllSuppliers(organizationId);
        });
    }
    getSupplierById(supplierId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.supplierService.getSupplierById(supplierId);
        });
    }
    createSupplier(supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.supplierService.createSupplier(supplier);
        });
    }
    updateSupplier(supplierId, supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.supplierService.updateSupplier(supplierId, supplier);
        });
    }
    deleteSupplier(supplierId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.supplierService.deleteSupplier(supplierId);
        });
    }
    getSuppliersPayments(status, organizationId = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.supplierService.getSuppliersPayments(status, organizationId);
        });
    }
    updateSupplierPayment(supplierPayment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.supplierService.updateSupplierPayment(supplierPayment);
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
], SupplierController.prototype, "getAllSuppliers", null);
__decorate([
    (0, tsoa_1.Get)("/:supplierId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "getSupplierById", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "createSupplier", null);
__decorate([
    (0, tsoa_1.Put)("/:supplierId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, supplier_1.Supplier]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "updateSupplier", null);
__decorate([
    (0, tsoa_1.Delete)("/:supplierId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "deleteSupplier", null);
__decorate([
    (0, tsoa_1.Get)("/payments"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "getSuppliersPayments", null);
__decorate([
    (0, tsoa_1.Post)("/add-payment"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "updateSupplierPayment", null);
SupplierController = __decorate([
    (0, tsoa_1.Tags)("Suppliers"),
    (0, tsoa_1.Route)("api/suppliers"),
    (0, tsoa_1.Security)("token"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [supplier_service_1.SupplierService])
], SupplierController);
exports.default = SupplierController;
