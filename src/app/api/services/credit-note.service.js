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
exports.CreditNoteService = void 0;
const typedi_1 = require("typedi");
const credit_note_repository_1 = require("../repositories/credit-note.repository");
const credit_note_1 = require("../models/entities/credit-note");
const sale_repository_1 = __importDefault(require("../repositories/sale.repository"));
const common_service_1 = __importDefault(require("./common.service"));
const transaction_1 = require("../models/entities/transaction");
const transaction_repository_1 = __importDefault(require("../repositories/transaction.repository"));
let CreditNoteService = class CreditNoteService {
    constructor(creditNoteRepository, saleRepository, commonService, transactionRepository) {
        this.creditNoteRepository = creditNoteRepository;
        this.saleRepository = saleRepository;
        this.commonService = commonService;
        this.transactionRepository = transactionRepository;
    }
    getAllCreditNotes(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const creditNotes = yield this.creditNoteRepository.getAllCreditNotes(organizationId);
            return creditNotes.map(creditNote => {
                creditNote.status = creditNote.isActive ? "Active" : "Closed";
                return creditNote;
            });
        });
    }
    getAllActiveCreditNotes(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.creditNoteRepository.getAllActiveCreditNotes(organizationId);
        });
    }
    searchCreditNotes(invoiceId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const creditNote = yield this.creditNoteRepository.getCreditNoteByRefInvoiceId(invoiceId, organizationId);
            if (creditNote) {
                creditNote.status = creditNote.isActive ? "Active" : "Closed";
                return [creditNote];
            }
            const sale = yield this.saleRepository.getSaleByInvoiceId(invoiceId, organizationId);
            if (sale) {
                const newCreditNote = new credit_note_1.CreditNote();
                newCreditNote.customer = sale.customer;
                newCreditNote.refInvoiceId = invoiceId.toUpperCase();
                newCreditNote.creditNoteDate = sale.invoiceDate;
                newCreditNote.amount = 0;
                newCreditNote.status = "Not Generated";
                return [newCreditNote];
            }
            throw new Error("Invoice not found");
        });
    }
    getCreditNoteById(creditNoteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const creditNote = yield this.creditNoteRepository.getCreditNote(creditNoteId);
            if (!creditNote) {
                throw new Error("Credit Note not found");
            }
            return creditNote;
        });
    }
    createCreditNote(creditNote) {
        return __awaiter(this, void 0, void 0, function* () {
            creditNote.invoiceId = yield this.generateInvoiceId(creditNote.organizationId);
            creditNote.creditNoteDate = this.commonService.getIndiaDateTime();
            const existingCreditNote = yield this.creditNoteRepository.getCreditNoteByCustomerId(creditNote.customerId);
            if (!existingCreditNote) {
                return this.creditNoteRepository.createCreditNote(creditNote);
            }
            creditNote.amount = existingCreditNote.amount + creditNote.amount;
            const newCreditNote = yield this.creditNoteRepository.createCreditNote(creditNote);
            existingCreditNote.remarks = `Added in ${newCreditNote.invoiceId}`;
            existingCreditNote.isActive = false;
            existingCreditNote.updatedBy = creditNote.createdBy;
            yield this.creditNoteRepository.updateCreditNote(existingCreditNote);
            return newCreditNote;
        });
    }
    updateCreditNote(creditNoteId, creditNote) {
        return __awaiter(this, void 0, void 0, function* () {
            creditNote.creditNoteId = creditNoteId;
            return this.creditNoteRepository.updateCreditNote(creditNote);
        });
    }
    deleteCreditNote(creditNoteId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.creditNoteRepository.deleteCreditNote(creditNoteId);
        });
    }
    generateInvoiceId(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.creditNoteRepository.getCreditNotesCount(organizationId);
            const invoiceNumber = 10000 + count + 1;
            return `CN${invoiceNumber}`;
        });
    }
    getCreditNoteByCustomerId(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const creditNote = yield this.creditNoteRepository.getCreditNoteByCustomerId(customerId);
            if (!creditNote) {
                throw new Error("Credit Note not found");
            }
            return creditNote;
        });
    }
    settleCreditNoteByCustomerId(customerId, amount, type, userId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const creditNote = yield this.getCreditNoteByCustomerId(customerId);
            if (creditNote.amount !== amount) {
                throw new Error("Incorrect amount");
            }
            const currentDate = this.commonService.getIndiaDateTime();
            creditNote.isActive = false;
            creditNote.remarks = `Settled on ${currentDate} by ${type}`;
            creditNote.updatedBy = userId;
            const openingBalance = yield this.transactionRepository.getCustomerOpeningBalance(customerId);
            const closingBalance = openingBalance + amount;
            const transaction = new transaction_1.Transaction();
            transaction.transactionType = "Credit_Note";
            transaction.referenceId = creditNote.creditNoteId;
            transaction.invoiceId = creditNote.invoiceId;
            transaction.transactionDate = this.commonService.getIndiaDateTime();
            transaction.openingBalance = openingBalance;
            transaction.amount = amount;
            transaction.paidAmount = 0;
            transaction.remainingAmount = closingBalance;
            transaction.createdBy = userId;
            transaction.customerId = customerId;
            transaction.organizationId = organizationId;
            yield this.transactionRepository.createTransaction(transaction);
            return this.creditNoteRepository.updateCreditNote(creditNote);
        });
    }
    getCreditNoteByInvoiceId(invoiceId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const creditNote = yield this.creditNoteRepository.getCreditNoteByInvoiceId(invoiceId, organizationId);
            if (!creditNote) {
                throw new Error("Credit Note not found");
            }
            return creditNote;
        });
    }
};
CreditNoteService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [credit_note_repository_1.CreditNoteRepository,
        sale_repository_1.default,
        common_service_1.default,
        transaction_repository_1.default])
], CreditNoteService);
exports.CreditNoteService = CreditNoteService;
