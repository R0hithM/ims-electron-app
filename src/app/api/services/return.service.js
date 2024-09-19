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
exports.ReturnService = void 0;
const typedi_1 = require("typedi");
const return_repository_1 = __importDefault(require("../repositories/return.repository"));
const return_1 = require("../models/entities/return");
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const return_item_1 = require("../models/entities/return-item");
const product_repository_1 = __importDefault(require("../repositories/product.repository"));
const credit_note_service_1 = require("./credit-note.service");
const util_repository_1 = __importDefault(require("../repositories/util.repository"));
const credit_note_1 = require("../models/entities/credit-note");
const sale_repository_1 = __importDefault(require("../repositories/sale.repository"));
const transaction_1 = require("../models/entities/transaction");
const transaction_repository_1 = __importDefault(require("../repositories/transaction.repository"));
const typeorm_1 = require("typeorm");
const common_service_1 = __importDefault(require("./common.service"));
const return_invoice_1 = require("../models/entities/return-invoice");
let ReturnService = class ReturnService {
    constructor(returnRepository, userRepository, productRepository, creditNoteService, utilsRepository, saleRepository, transactionRepository, commonService) {
        this.returnRepository = returnRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.creditNoteService = creditNoteService;
        this.utilsRepository = utilsRepository;
        this.saleRepository = saleRepository;
        this.transactionRepository = transactionRepository;
        this.commonService = commonService;
    }
    getAllReturns(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.returnRepository.getAllReturns(organizationId);
        });
    }
    getReturnById(returnId) {
        return __awaiter(this, void 0, void 0, function* () {
            const returnData = yield this.returnRepository.getReturnById(returnId);
            if (!returnData) {
                throw new Error("Return not found");
            }
            return returnData;
        });
    }
    createReturn(returnObj) {
        return __awaiter(this, void 0, void 0, function* () {
            let salesInvoices = [];
            let dueInvoicesMap = {};
            const { refInvoiceId, saleTypeId, returnsType, customerId, reason, selectedItems, dueInvoices, user: { userId, organizationId }, calculation: { subTotal, loadingCharges, unloadingCharges, transportCharges, totalAmount }, } = returnObj;
            if (dueInvoices && dueInvoices.length) {
                salesInvoices = yield this.getSalesByDueInvoices(dueInvoices, organizationId);
                dueInvoicesMap = yield this.validateDueInvoices(dueInvoices, salesInvoices);
            }
            const invoiceId = yield this.generateInvoiceId(organizationId);
            const returnData = new return_1.Return();
            returnData.invoiceId = invoiceId;
            returnData.returnDate = this.commonService.getIndiaDateTime();
            returnData.refInvoiceId = refInvoiceId;
            returnData.saleTypeId = saleTypeId;
            returnData.returnsType = returnsType;
            returnData.userId = userId;
            returnData.customerId = customerId;
            returnData.subTotal = subTotal;
            returnData.loadingCharges = loadingCharges;
            returnData.unloadingCharges = unloadingCharges;
            returnData.transportCharges = transportCharges;
            returnData.totalAmount = totalAmount;
            returnData.reason = reason;
            returnData.createdBy = userId;
            returnData.organizationId = organizationId;
            const newReturn = yield this.returnRepository.createReturn(returnData);
            const returnItems = selectedItems.map(item => {
                const returnItem = new return_item_1.ReturnItem();
                returnItem.returnId = newReturn.returnId;
                returnItem.itemId = item.itemId;
                returnItem.quantity = item.totalQuantity;
                returnItem.rate = item.rate;
                returnItem.discount = item.discount;
                returnItem.purchasePrice = item.purchasePrice;
                returnItem.salePrice = item.salePrice;
                return returnItem;
            });
            yield this.returnRepository.createReturnItems(returnItems);
            let dueClearedAmount = 0;
            if (salesInvoices.length && dueInvoicesMap) {
                const returnedInvoices = [];
                const updatedSales = salesInvoices.map(sale => {
                    const usedAmount = dueInvoicesMap[sale.invoiceId];
                    const returnedInvoice = new return_invoice_1.ReturnedInvoice();
                    returnedInvoice.returnId = newReturn.returnId;
                    returnedInvoice.invoiceId = sale.invoiceId;
                    returnedInvoice.invoiceDate = sale.invoiceDate;
                    returnedInvoice.remainingAmount = sale.remainingAmount;
                    returnedInvoice.usedAmount = usedAmount;
                    returnedInvoices.push(returnedInvoice);
                    dueClearedAmount += usedAmount;
                    sale.remainingAmount = +sale.remainingAmount - usedAmount;
                    sale.paidAmount = +sale.paidAmount + usedAmount;
                    sale.updatedBy = userId;
                    return sale;
                });
                yield this.saleRepository.updateSales(updatedSales);
                yield this.returnRepository.createReturnedInvoices(returnedInvoices);
            }
            // If updateType is 'PURCHASE' items will be incremented else items will be decremented.
            const updateType = returnObj.returnsType == "BY_SALE" ? "PURCHASE" : "SALE";
            yield this.productRepository.updateProductItemsAvailability(returnObj.selectedItems, updateType);
            const saleType = yield this.utilsRepository.getSaleTypeNameById(returnObj.saleTypeId);
            if (returnObj.returnsType == "BY_SALE" && (saleType === null || saleType === void 0 ? void 0 : saleType.toLowerCase()) == "credit_note") {
                const creditNote = new credit_note_1.CreditNote();
                creditNote.customerId = returnObj.customerId;
                creditNote.refInvoiceId = newReturn.invoiceId;
                creditNote.amount = newReturn.totalAmount;
                creditNote.creditNoteType = "Return";
                creditNote.createdBy = userId;
                creditNote.organizationId = organizationId;
                yield this.creditNoteService.createCreditNote(creditNote);
            }
            const invoiceTotal = subTotal - loadingCharges - unloadingCharges - transportCharges;
            const openingBalance = yield this.transactionRepository.getCustomerOpeningBalance(customerId);
            let closingBalance = openingBalance - dueClearedAmount;
            if ((saleType === null || saleType === void 0 ? void 0 : saleType.toLowerCase()) == "credit_note") {
                closingBalance -= totalAmount;
            }
            const transaction = new transaction_1.Transaction();
            transaction.transactionType = "Return";
            transaction.referenceId = newReturn.returnId;
            transaction.invoiceId = newReturn.invoiceId;
            transaction.transactionDate = this.commonService.getIndiaDateTime();
            transaction.openingBalance = openingBalance;
            transaction.amount = invoiceTotal;
            transaction.paidAmount = dueClearedAmount;
            transaction.remainingAmount = closingBalance;
            transaction.createdBy = userId;
            transaction.customerId = customerId;
            transaction.organizationId = organizationId;
            yield this.transactionRepository.createTransaction(transaction);
            return newReturn;
        });
    }
    updateReturn(returnId, returnObj) {
        return __awaiter(this, void 0, void 0, function* () {
            returnObj.returnId = returnId;
            return this.returnRepository.updateReturn(returnObj);
        });
    }
    deleteReturn(returnId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.returnRepository.deleteReturn(returnId);
        });
    }
    generateInvoiceId(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.returnRepository.getReturnsCount(organizationId);
            const invoiceNumber = 10000 + count + 1;
            return `RID${invoiceNumber}`;
        });
    }
    getSalesByDueInvoices(dueInvoices, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dueInvoicesIds = dueInvoices.map(due => due.invoiceId);
            const whereCondition = { invoiceId: (0, typeorm_1.In)(dueInvoicesIds), organizationId, isActive: true };
            return yield this.saleRepository.getSalesByWhereCondition(whereCondition);
        });
    }
    validateDueInvoices(dueInvoices, salesInvoices) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoiceAmountMap = dueInvoices.reduce((acc, dueInvoice) => {
                acc[dueInvoice.invoiceId] = dueInvoice.amount;
                return acc;
            }, {});
            salesInvoices.forEach(saleInvoice => {
                var _a;
                const { invoiceId, remainingAmount } = saleInvoice;
                const dueAmount = (_a = invoiceAmountMap[invoiceId]) !== null && _a !== void 0 ? _a : 0;
                if (dueAmount > remainingAmount) {
                    throw new Error(`Incorrect due amount for invoice ${invoiceId}.`);
                }
            });
            return invoiceAmountMap;
        });
    }
};
ReturnService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [return_repository_1.default,
        user_repository_1.default,
        product_repository_1.default,
        credit_note_service_1.CreditNoteService,
        util_repository_1.default,
        sale_repository_1.default,
        transaction_repository_1.default,
        common_service_1.default])
], ReturnService);
exports.ReturnService = ReturnService;
