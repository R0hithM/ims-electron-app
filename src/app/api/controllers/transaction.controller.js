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
const transaction_service_1 = require("../services/transaction.service");
const transaction_1 = require("../models/entities/transaction");
const transaction_2 = require("../models/interface/transaction");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    getAllTransactions(organizationId = "") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transactionService.getAllTransactions(organizationId);
        });
    }
    getTransactionById(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transactionService.getTransactionById(transactionId);
        });
    }
    createTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transactionService.createTransaction(transaction);
        });
    }
    updateTransaction(transactionId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transactionService.updateTransaction(transactionId, transaction);
        });
    }
    deleteTransaction(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transactionService.deleteTransaction(transactionId);
        });
    }
    getTransactionsWithPagination(transactionsObj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transactionService.getTransactionsWithPagination(transactionsObj);
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
], TransactionController.prototype, "getAllTransactions", null);
__decorate([
    (0, tsoa_1.Get)("/:transactionId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransactionById", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_1.Transaction]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "createTransaction", null);
__decorate([
    (0, tsoa_1.Put)("/:transactionId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, transaction_1.Transaction]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "updateTransaction", null);
__decorate([
    (0, tsoa_1.Delete)("/:transactionId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "deleteTransaction", null);
__decorate([
    (0, tsoa_1.Post)("/filter"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_2.GetTransactionsObj]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransactionsWithPagination", null);
TransactionController = __decorate([
    (0, tsoa_1.Tags)("Transactions"),
    (0, tsoa_1.Route)("api/transactions"),
    (0, tsoa_1.Security)("token"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
exports.default = TransactionController;
