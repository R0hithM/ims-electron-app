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
const transaction_1 = require("../models/entities/transaction");
const paging_sorting_repository_1 = __importDefault(require("./paging-sorting.repository"));
const typeorm_1 = require("typeorm");
let TransactionRepository = class TransactionRepository extends paging_sorting_repository_1.default {
    constructor() {
        super(transaction_1.Transaction);
        this.transactionRepo = db_1.default.getRepository(transaction_1.Transaction);
    }
    getAllTransactions(organizationId) {
        return this.transactionRepo.find({ where: { organizationId, isActive: true }, order: { createdAt: "DESC" } });
    }
    getTransactionById(transactionId) {
        return this.transactionRepo.findOneBy({ transactionId, isActive: true });
    }
    createTransaction(transaction) {
        return this.transactionRepo.save(transaction);
    }
    updateTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.transactionRepo.update({ transactionId: transaction.transactionId, isActive: true }, transaction);
            return result.affected ? result.affected > 0 : false;
        });
    }
    deleteTransaction(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.transactionRepo.update({ transactionId, isActive: true }, { isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
    getCustomerOpeningBalance(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield this.transactionRepo.findOne({ where: { customerId, isActive: true }, order: { createdAt: "DESC" } });
            return transaction ? +transaction.remainingAmount : 0;
        });
    }
    getTransactionsByInvoiceId(invoiceId, organizationId) {
        return this.transactionRepo.find({ where: { invoiceId, organizationId, paidAmount: (0, typeorm_1.MoreThan)(0), isActive: true } });
    }
    getAllCustomerTransactions(customerId, fromDate, toDate, organizationId) {
        return this.transactionRepo.find({
            where: {
                customerId,
                organizationId,
                transactionDate: (0, typeorm_1.Between)(new Date(fromDate), new Date(toDate)),
                isActive: true
            },
            order: { createdAt: "ASC" }
        });
    }
};
TransactionRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], TransactionRepository);
exports.default = TransactionRepository;
