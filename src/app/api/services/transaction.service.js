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
exports.TransactionService = void 0;
const typedi_1 = require("typedi");
const transaction_repository_1 = __importDefault(require("../repositories/transaction.repository"));
const sale_repository_1 = __importDefault(require("../repositories/sale.repository"));
const purchase_repository_1 = __importDefault(require("../repositories/purchase.repository"));
const return_repository_1 = __importDefault(require("../repositories/return.repository"));
const typeorm_1 = require("typeorm");
const common_service_1 = __importDefault(require("./common.service"));
const customer_repository_1 = __importDefault(require("../repositories/customer.repository"));
const credit_note_repository_1 = require("../repositories/credit-note.repository");
let TransactionService = class TransactionService {
    constructor(transactionRepository, saleRepository, purchaseRepository, returnRepository, commonService, customerRepository, creditNoteRepository) {
        this.transactionRepository = transactionRepository;
        this.saleRepository = saleRepository;
        this.purchaseRepository = purchaseRepository;
        this.returnRepository = returnRepository;
        this.commonService = commonService;
        this.customerRepository = customerRepository;
        this.creditNoteRepository = creditNoteRepository;
    }
    getAllTransactions(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = yield this.transactionRepository.getAllTransactions(organizationId);
            return this.getAndMapCustomerOrSupplier(transactions);
        });
    }
    getTransactionById(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield this.transactionRepository.getTransactionById(transactionId);
            if (!transaction) {
                throw new Error("Transaction not found");
            }
            return transaction;
        });
    }
    createTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transactionRepository.createTransaction(transaction);
        });
    }
    updateTransaction(transactionId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            transaction.transactionId = transactionId;
            return yield this.transactionRepository.updateTransaction(transaction);
        });
    }
    deleteTransaction(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transactionRepository.deleteTransaction(transactionId);
        });
    }
    getAndMapCustomerOrSupplier(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionsWithCustomer = transactions.map((transaction) => __awaiter(this, void 0, void 0, function* () {
                const { invoiceId, organizationId } = transaction;
                const transactionType = transaction.transactionType;
                switch (transactionType) {
                    case "Sale":
                        transaction.customer = yield this.saleRepository.getCustomerByInvoiceId(invoiceId, organizationId);
                        break;
                    case "Purchase":
                        transaction.supplier = yield this.purchaseRepository.getSupplierByInvoiceId(invoiceId, organizationId);
                        break;
                    case "Return":
                        const _return = yield this.returnRepository.getOnlyReturnByInvoiceId(invoiceId, organizationId);
                        if (_return && _return.returnsType === "BY_SALE") {
                            transaction.customer = yield this.customerRepository.getCustomerById(_return.customerId);
                        }
                        else if (_return && _return.returnsType === "BY_PURCHASE") {
                            transaction.supplier = yield this.purchaseRepository.getSupplierByInvoiceId(_return.refInvoiceId, organizationId);
                        }
                        break;
                    case "Credit_Note":
                        transaction.customer = yield this.creditNoteRepository.getCustomerByInvoiceId(transaction.invoiceId, organizationId);
                    default:
                        break;
                }
                return transaction;
            }));
            return yield Promise.all(transactionsWithCustomer);
        });
    }
    getTransactionsWithPagination(transactionsObj) {
        return __awaiter(this, void 0, void 0, function* () {
            transactionsObj.page = transactionsObj.page ? transactionsObj.page : 1;
            transactionsObj.pageSize = transactionsObj.pageSize ? transactionsObj.pageSize : 20;
            transactionsObj.sortBy = transactionsObj.sortBy ? transactionsObj.sortBy : "transactionDate";
            transactionsObj.sortDir = transactionsObj.sortDir ? transactionsObj.sortDir : "DESC";
            const { fromDate, toDate, duration, transactionType } = transactionsObj;
            const whereConditions = {
                organizationId: transactionsObj.user.organizationId
            };
            if (fromDate && toDate) {
                whereConditions.transactionDate = (0, typeorm_1.Between)(new Date(fromDate), new Date(toDate));
            }
            else if (duration || duration === 0) {
                const currentDate = this.commonService.getIndiaDateTime();
                const toDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} 23:59:59`;
                const updatedDate = new Date(currentDate.getTime() - duration * 24 * 60 * 60 * 1000);
                const fromDate = `${updatedDate.getFullYear()}-${updatedDate.getMonth() + 1}-${updatedDate.getDate()} 00:00:00`;
                whereConditions.transactionDate = (0, typeorm_1.Between)(new Date(fromDate), new Date(toDate));
            }
            if (transactionType) {
                whereConditions.transactionType = transactionType;
            }
            const transactions = yield this.transactionRepository.getEntitiesWithPagingAndSorting(transactionsObj, whereConditions);
            transactions.data = yield this.getAndMapCustomerOrSupplier(transactions.data);
            return transactions;
        });
    }
};
TransactionService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [transaction_repository_1.default,
        sale_repository_1.default,
        purchase_repository_1.default,
        return_repository_1.default,
        common_service_1.default,
        customer_repository_1.default,
        credit_note_repository_1.CreditNoteRepository])
], TransactionService);
exports.TransactionService = TransactionService;
