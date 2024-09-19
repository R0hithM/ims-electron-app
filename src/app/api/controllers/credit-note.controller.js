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
const credit_note_service_1 = require("../services/credit-note.service");
const credit_note_1 = require("../models/entities/credit-note");
let CreditNoteController = class CreditNoteController {
    constructor(creditNoteService) {
        this.creditNoteService = creditNoteService;
    }
    getAllCreditNotes(organizationId = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return this.creditNoteService.getAllCreditNotes(organizationId);
        });
    }
    getAllActiveCreditNotes(organizationId = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return this.creditNoteService.getAllActiveCreditNotes(organizationId);
        });
    }
    getCreditNoteByInvoiceId(invoiceId, organizationId = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return this.creditNoteService.getCreditNoteByInvoiceId(invoiceId, organizationId);
        });
    }
    getCreditNoteById(creditNoteId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.creditNoteService.getCreditNoteById(creditNoteId);
        });
    }
    createCreditNote(creditNote) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.creditNoteService.createCreditNote(creditNote);
        });
    }
    updateCreditNote(creditNoteId, creditNote) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.creditNoteService.updateCreditNote(creditNoteId, creditNote);
        });
    }
    deleteCreditNote(creditNoteId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.creditNoteService.deleteCreditNote(creditNoteId);
        });
    }
    getCreditNotesByInvoiceId(invoiceId, organizationId = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return this.creditNoteService.searchCreditNotes(invoiceId, organizationId);
        });
    }
    getCreditNoteByCustomerId(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.creditNoteService.getCreditNoteByCustomerId(customerId);
        });
    }
    settleCreditNoteByCustomerId(settleObj) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.creditNoteService.settleCreditNoteByCustomerId(settleObj.customerId, settleObj.amount, settleObj.type, settleObj.user.userId, settleObj.user.organizationId);
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
], CreditNoteController.prototype, "getAllCreditNotes", null);
__decorate([
    (0, tsoa_1.Get)("/active"),
    __param(0, (0, tsoa_1.Query)()),
    __param(0, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreditNoteController.prototype, "getAllActiveCreditNotes", null);
__decorate([
    (0, tsoa_1.Get)("/invoice/:invoiceId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CreditNoteController.prototype, "getCreditNoteByInvoiceId", null);
__decorate([
    (0, tsoa_1.Get)("/:creditNoteId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CreditNoteController.prototype, "getCreditNoteById", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [credit_note_1.CreditNote]),
    __metadata("design:returntype", Promise)
], CreditNoteController.prototype, "createCreditNote", null);
__decorate([
    (0, tsoa_1.Put)("/:creditNoteId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, credit_note_1.CreditNote]),
    __metadata("design:returntype", Promise)
], CreditNoteController.prototype, "updateCreditNote", null);
__decorate([
    (0, tsoa_1.Delete)("/:creditNoteId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CreditNoteController.prototype, "deleteCreditNote", null);
__decorate([
    (0, tsoa_1.Get)("/search/:invoiceId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CreditNoteController.prototype, "getCreditNotesByInvoiceId", null);
__decorate([
    (0, tsoa_1.Get)("/customer/:customerId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CreditNoteController.prototype, "getCreditNoteByCustomerId", null);
__decorate([
    (0, tsoa_1.Post)("/settle"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreditNoteController.prototype, "settleCreditNoteByCustomerId", null);
CreditNoteController = __decorate([
    (0, tsoa_1.Tags)("Credit Notes"),
    (0, tsoa_1.Route)("api/credit-notes"),
    (0, tsoa_1.Security)("token"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [credit_note_service_1.CreditNoteService])
], CreditNoteController);
exports.default = CreditNoteController;
