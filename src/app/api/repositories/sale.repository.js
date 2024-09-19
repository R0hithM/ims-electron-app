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
const sale_1 = require("../models/entities/sale");
const sale_item_1 = require("../models/entities/sale-item");
let SaleRepository = class SaleRepository {
    constructor() {
        this.saleRepo = db_1.default.getRepository(sale_1.Sale);
        this.saleItemsRepo = db_1.default.getRepository(sale_item_1.SaleItem);
    }
    getAllSales(organizationId) {
        return this.saleRepo.find({ where: { organizationId, isActive: true }, relations: { customer: true }, order: { createdAt: "DESC" } });
    }
    getSaleById(saleId) {
        return this.saleRepo.findOneBy({ saleId, isActive: true });
    }
    createSale(sale) {
        return this.saleRepo.save(sale);
    }
    updateSale(sale) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.saleRepo.update({ saleId: sale.saleId, isActive: true }, sale);
            return result.affected ? result.affected > 0 : false;
        });
    }
    deleteSale(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.saleRepo.update({ saleId, isActive: true }, { isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
    getSalesCount(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saleRepo.count({ where: { organizationId } });
        });
    }
    createSaleItems(saleItems) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saleItemsRepo.save(saleItems);
        });
    }
    getSaleByInvoiceId(invoiceId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saleRepo.findOne({ where: { invoiceId, isActive: true, organizationId },
                relations: {
                    saleItems: {
                        item: {
                            categoryTypeInfo: true,
                            unit: true
                        }
                    },
                    customer: true,
                    saleType: true,
                    user: { organization: true }
                }
            });
        });
    }
    getSalesByCustomerId(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saleRepo.find({ where: { customerId, isActive: true },
                relations: {
                    saleItems: {
                        item: {
                            categoryTypeInfo: true
                        }
                    },
                    saleType: true
                },
                order: { createdAt: "DESC" }
            });
        });
    }
    getCustomerByInvoiceId(invoiceId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = yield this.saleRepo.findOne({
                where: { invoiceId, organizationId },
                relations: {
                    customer: true
                }
            });
            return sale ? sale.customer : null;
        });
    }
    getSalesByWhereCondition(whereCondition, order) {
        return this.saleRepo.find({ where: whereCondition, relations: { customer: true }, order });
    }
    getSaleWithCustomerByInvoiceId(invoiceId, organizationId) {
        return this.saleRepo.findOne({
            where: { invoiceId, organizationId, isActive: true },
            relations: {
                customer: true
            }
        });
    }
    updateSales(salesToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(salesToUpdate.map(sale => this.saleRepo.update({ saleId: sale.saleId }, sale)));
            return true;
        });
    }
    getUtilizedCreditBalanceByInvoiceId(invoiceId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = yield this.saleRepo.findOne({
                where: { invoiceId, organizationId },
                select: ["utilizedCreditBalance"]
            });
            return sale ? sale.utilizedCreditBalance : 0;
        });
    }
};
SaleRepository = __decorate([
    (0, typedi_1.Service)()
], SaleRepository);
exports.default = SaleRepository;
