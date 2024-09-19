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
const purchase_1 = require("../models/entities/purchase");
const purchase_item_1 = require("../models/entities/purchase-item");
let PurchaseRepository = class PurchaseRepository {
    constructor() {
        this.purchaseRepo = db_1.default.getRepository(purchase_1.Purchase);
        this.purchaseItemsRepo = db_1.default.getRepository(purchase_item_1.PurchaseItem);
    }
    getAllPurchases(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.purchaseRepo.find({ where: { organizationId, isActive: true }, relations: { supplier: true }, order: { createdAt: "DESC" } });
        });
    }
    getPurchaseById(purchaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.purchaseRepo.findOneBy({ purchaseId, isActive: true });
        });
    }
    createPurchase(purchase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.purchaseRepo.save(purchase);
        });
    }
    updatePurchase(purchase) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.purchaseRepo.update({ purchaseId: purchase.purchaseId, isActive: true }, purchase);
            return result.affected ? result.affected > 0 : false;
        });
    }
    deletePurchase(purchaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.purchaseRepo.update({ purchaseId, isActive: true }, { isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
    getPurchaseCount(organizationId) {
        return this.purchaseRepo.count({ where: { organizationId } });
    }
    createPurchaseItems(purchaseItems) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.purchaseItemsRepo.save(purchaseItems);
        });
    }
    getPurchaseByInvoiceId(invoiceId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.purchaseRepo.findOne({
                where: { invoiceId, organizationId, isActive: true },
                relations: {
                    purchaseItems: {
                        item: {
                            categoryTypeInfo: true
                        }
                    },
                    supplier: true,
                    saleType: true,
                    user: {
                        organization: true
                    }
                }
            });
        });
    }
    getSupplierByInvoiceId(invoiceId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const purchase = yield this.purchaseRepo.findOne({
                where: { invoiceId, organizationId },
                relations: {
                    supplier: true
                }
            });
            return purchase ? purchase.supplier : null;
        });
    }
    getPurchasesByWhereCondition(whereCondition, order) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.purchaseRepo.find({ where: whereCondition, relations: { supplier: true }, order });
        });
    }
    getPurchaseWithSupplierByInvoiceId(invoiceId, organizationId) {
        return this.purchaseRepo.findOne({
            where: { invoiceId, organizationId },
            relations: {
                supplier: true
            }
        });
    }
};
PurchaseRepository = __decorate([
    (0, typedi_1.Service)()
], PurchaseRepository);
exports.default = PurchaseRepository;
