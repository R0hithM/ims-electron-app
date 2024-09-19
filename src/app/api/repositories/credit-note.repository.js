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
exports.CreditNoteRepository = void 0;
const typedi_1 = require("typedi");
const db_1 = __importDefault(require("../config/db"));
const credit_note_1 = require("../models/entities/credit-note");
const typeorm_1 = require("typeorm");
let CreditNoteRepository = class CreditNoteRepository {
    constructor() {
        this.creditNotesRepo = db_1.default.getRepository(credit_note_1.CreditNote);
    }
    getAllCreditNotes(organizationId) {
        return this.creditNotesRepo.find({ where: { organizationId }, relations: { customer: true }, order: { createdAt: "DESC" } });
    }
    getAllActiveCreditNotes(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.creditNotesRepo.find({
                where: { organizationId, isActive: true },
                relations: { customer: true },
                order: { amount: "DESC", createdAt: "asc" }
            });
        });
    }
    getCreditNoteByRefInvoiceId(refInvoiceId, organizationId) {
        return this.creditNotesRepo.findOne({ where: { refInvoiceId: (0, typeorm_1.Like)(`%${refInvoiceId}%`), organizationId }, relations: { customer: true } });
    }
    getCreditNote(creditNoteId) {
        return this.creditNotesRepo.findOne({ where: { creditNoteId }, relations: { customer: true, updateByUser: { organization: true } } });
    }
    getCreditNoteByCustomerId(customerId) {
        return this.creditNotesRepo.findOne({ where: { customerId, isActive: true } });
    }
    getAllCreditNotesByCustomerId(customerId) {
        return this.creditNotesRepo.find({ where: { customerId } });
    }
    createCreditNote(creditNote) {
        return this.creditNotesRepo.save(creditNote);
    }
    updateCreditNote(creditNote) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.creditNotesRepo.update({ creditNoteId: creditNote.creditNoteId, isActive: true }, creditNote);
            return result.affected ? result.affected > 0 : false;
        });
    }
    deleteCreditNote(creditNoteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.creditNotesRepo.update({ creditNoteId, isActive: true }, { isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
    getCreditNotesCount(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.creditNotesRepo.count({ where: { organizationId } });
        });
    }
    getCustomerByInvoiceId(invoiceId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const creditNote = yield this.creditNotesRepo.findOne({
                where: { invoiceId, organizationId },
                relations: {
                    customer: true
                }
            });
            return creditNote ? creditNote.customer : null;
        });
    }
    getCreditNoteByInvoiceId(invoiceId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.creditNotesRepo.findOne({ where: { invoiceId }, relations: { customer: true, updateByUser: { organization: true } } });
        });
    }
};
CreditNoteRepository = __decorate([
    (0, typedi_1.Service)()
], CreditNoteRepository);
exports.CreditNoteRepository = CreditNoteRepository;
