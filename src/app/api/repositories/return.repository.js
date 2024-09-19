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
const return_1 = require("../models/entities/return");
const return_item_1 = require("../models/entities/return-item");
const return_invoice_1 = require("../models/entities/return-invoice");
const typeorm_1 = require("typeorm");
let ReturnRepository = class ReturnRepository {
    constructor() {
        this.returnRepo = db_1.default.getRepository(return_1.Return);
        this.returnItemsRepo = db_1.default.getRepository(return_item_1.ReturnItem);
        this.returnedInvoiceRepo = db_1.default.getRepository(return_invoice_1.ReturnedInvoice);
    }
    getAllReturns(organizationId) {
        return this.returnRepo.find({ where: { organizationId, isActive: true } });
    }
    getReturnById(returnId) {
        return this.returnRepo.findOneBy({ returnId, isActive: true });
    }
    createReturn(returnObj) {
        return this.returnRepo.save(returnObj);
    }
    updateReturn(returnObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.returnRepo.update({ returnId: returnObj.returnId, isActive: true }, returnObj);
            return result.affected ? result.affected > 0 : false;
        });
    }
    deleteReturn(returnId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.returnRepo.update({ returnId, isActive: true }, { isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
    getReturnsCount(organizationId) {
        return this.returnRepo.count({ where: { organizationId } });
    }
    createReturnItems(returnItems) {
        return this.returnItemsRepo.save(returnItems);
    }
    createReturnedInvoices(returnedInvoices) {
        return this.returnedInvoiceRepo.save(returnedInvoices);
    }
    getReturnIdsByInvoiceId(invoiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const returnIds = yield this.returnedInvoiceRepo.find({ where: { invoiceId }, select: ["returnId"] });
            return returnIds.map(returnId => returnId.returnId);
        });
    }
    getReturnsByReturnIds(returnIds, organizationId) {
        return this.returnRepo.find({
            where: {
                returnId: (0, typeorm_1.In)(returnIds),
                organizationId,
                isActive: true
            },
            relations: {
                returnedInvoices: true
            }
        });
    }
    getReturnByInvoiceId(invoiceId, organizationId) {
        return this.returnRepo.findOne({
            where: { invoiceId, organizationId, isActive: true },
            relations: {
                returnItems: {
                    item: {
                        categoryTypeInfo: true,
                        unit: true
                    }
                },
                returnedInvoices: true,
                saleType: true,
                user: { organization: true },
                customer: true
            }
        });
    }
    getOnlyReturnByInvoiceId(invoiceId, organizationId) {
        return this.returnRepo.findOne({
            where: { invoiceId, organizationId },
            relations: { saleType: true }
        });
    }
    getReturnsByCustomerId(customerId) {
        return this.returnRepo.find({
            where: { customerId, isActive: true },
            relations: {
                returnItems: {
                    item: true
                },
                saleType: true
            }
        });
    }
};
ReturnRepository = __decorate([
    (0, typedi_1.Service)()
], ReturnRepository);
exports.default = ReturnRepository;
