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
exports.SaleService = void 0;
const typedi_1 = require("typedi");
const sale_repository_1 = __importDefault(require("../repositories/sale.repository"));
const sale_1 = require("../models/entities/sale");
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const customer_repository_1 = __importDefault(require("../repositories/customer.repository"));
const sale_item_1 = require("../models/entities/sale-item");
const product_repository_1 = __importDefault(require("../repositories/product.repository"));
const transaction_1 = require("../models/entities/transaction");
const transaction_repository_1 = __importDefault(require("../repositories/transaction.repository"));
const estimation_repository_1 = __importDefault(require("../repositories/estimation.repository"));
const credit_note_service_1 = require("./credit-note.service");
const credit_note_1 = require("../models/entities/credit-note");
const credit_note_repository_1 = require("../repositories/credit-note.repository");
const return_repository_1 = __importDefault(require("../repositories/return.repository"));
const common_service_1 = __importDefault(require("./common.service"));
let SaleService = class SaleService {
    constructor(saleRepository, userRepository, customerRepository, productRepository, transactionRepository, estimationRepository, creditNoteService, creditNoteRepository, returnRepository, commonService) {
        this.saleRepository = saleRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.transactionRepository = transactionRepository;
        this.estimationRepository = estimationRepository;
        this.creditNoteService = creditNoteService;
        this.creditNoteRepository = creditNoteRepository;
        this.returnRepository = returnRepository;
        this.commonService = commonService;
    }
    getAllSales(organizationId) {
        return this.saleRepository.getAllSales(organizationId);
    }
    getSaleById(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = yield this.saleRepository.getSaleById(saleId);
            if (!sale) {
                throw new Error("Sale not found");
            }
            return sale;
        });
    }
    createSale(saleReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const { saleTypeId, customerId, weight, dueDate, estimationId, isCreditNoteApplied, selectedItems, calculation, user: { userId, organizationId }, calculation: { subTotal, discount, loadingCharges, unloadingCharges, transportCharges, totalAmount, paidAmount, remainingAmount } } = saleReq;
            const customer = yield this.customerRepository.getCustomerById(customerId);
            if (!customer) {
                throw new Error("Customer not found");
            }
            const customerCreditNote = yield this.creditNoteRepository.getCreditNoteByCustomerId(customerId);
            if (isCreditNoteApplied && !customerCreditNote) {
                throw new Error("Customer credit note not found");
            }
            this.validateCalculation(selectedItems, calculation, isCreditNoteApplied, customerCreditNote);
            const invoiceId = yield this.generateInvoiceId(organizationId);
            const saleObj = new sale_1.Sale();
            saleObj.invoiceId = invoiceId;
            saleObj.invoiceDate = this.commonService.getIndiaDateTime();
            saleObj.saleTypeId = saleTypeId;
            saleObj.userId = userId;
            saleObj.customerId = customerId;
            saleObj.discount = discount;
            saleObj.subTotal = subTotal;
            saleObj.loadingCharges = loadingCharges;
            saleObj.unloadingCharges = unloadingCharges;
            saleObj.transportCharges = transportCharges;
            saleObj.totalAmount = totalAmount;
            saleObj.paidAmount = paidAmount;
            saleObj.remainingAmount = remainingAmount > 0 ? remainingAmount : 0;
            saleObj.weight = weight;
            saleObj.dueDate = dueDate;
            saleObj.createdBy = userId;
            saleObj.organizationId = organizationId;
            if (estimationId) {
                saleObj.estimationId = estimationId;
                yield this.estimationRepository.updateEstimationToSale(estimationId, userId);
            }
            if (isCreditNoteApplied && customerCreditNote) {
                saleObj.creditNoteId = customerCreditNote.invoiceId;
                saleObj.utilizedCreditBalance = customerCreditNote.amount > totalAmount ? totalAmount : customerCreditNote.amount;
            }
            const newSale = yield this.saleRepository.createSale(saleObj);
            const saleItems = selectedItems.map(item => {
                const saleItem = new sale_item_1.SaleItem();
                const { itemId, totalQuantity, rate, discount, purchasePrice, salePrice } = item;
                saleItem.saleId = newSale.saleId;
                saleItem.itemId = itemId;
                saleItem.quantity = totalQuantity;
                saleItem.rate = rate;
                saleItem.discount = discount;
                saleItem.purchasePrice = purchasePrice;
                saleItem.salePrice = salePrice;
                return saleItem;
            });
            yield this.saleRepository.createSaleItems(saleItems);
            if (isCreditNoteApplied && customerCreditNote) {
                customerCreditNote.isActive = false;
                customerCreditNote.remarks = `Utilized in ${newSale.invoiceId}`;
                customerCreditNote.updatedBy = userId;
                yield this.creditNoteService.updateCreditNote(customerCreditNote.creditNoteId, customerCreditNote);
            }
            // Negative remaining amount ? create credit note.  
            if (remainingAmount < 0) {
                const creditNote = new credit_note_1.CreditNote();
                creditNote.customerId = newSale.customerId;
                creditNote.refInvoiceId = newSale.invoiceId;
                creditNote.amount = Math.abs(remainingAmount);
                creditNote.creditNoteType = "Sale";
                creditNote.createdBy = userId;
                creditNote.organizationId = organizationId;
                yield this.creditNoteService.createCreditNote(creditNote);
            }
            yield this.productRepository.updateProductItemsAvailability(selectedItems, "SALE");
            const openingBalance = yield this.transactionRepository.getCustomerOpeningBalance(customerId);
            const closingBalance = openingBalance + totalAmount - paidAmount;
            const transaction = new transaction_1.Transaction();
            transaction.transactionType = "Sale";
            transaction.referenceId = newSale.saleId;
            transaction.invoiceId = newSale.invoiceId;
            transaction.transactionDate = this.commonService.getIndiaDateTime();
            transaction.openingBalance = openingBalance;
            transaction.amount = newSale.totalAmount;
            transaction.paidAmount = newSale.paidAmount;
            transaction.remainingAmount = closingBalance;
            transaction.createdBy = userId;
            transaction.customerId = customerId;
            transaction.organizationId = organizationId;
            yield this.transactionRepository.createTransaction(transaction);
            return newSale;
        });
    }
    updateSale(saleId, sale) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saleRepository.updateSale(sale);
        });
    }
    deleteSale(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saleRepository.deleteSale(saleId);
        });
    }
    validateCalculation(selectedItems, calculation, isCreditNoteApplied, customerCreditNote) {
        let subTotal = 0;
        selectedItems.forEach(item => {
            subTotal += (item.salePrice * item.totalQuantity);
        });
        if (subTotal !== calculation.subTotal) {
            throw new Error("Incorrect SubTotal Amount.");
        }
        const { discount, loadingCharges, unloadingCharges, transportCharges, totalAmount, paidAmount, remainingAmount } = calculation;
        const subTotalWithCharges = (subTotal - discount) + loadingCharges + unloadingCharges + transportCharges;
        if (subTotalWithCharges !== totalAmount) {
            throw new Error("Incorrect Total Amount.");
        }
        const amount = customerCreditNote ? customerCreditNote.amount : 0;
        if (isCreditNoteApplied && (totalAmount - amount) - paidAmount !== remainingAmount) {
            throw new Error("Incorrect Remaining Amount");
        }
        else if (!isCreditNoteApplied && (totalAmount - paidAmount) !== remainingAmount) {
            throw new Error("Incorrect Remaining Amount.");
        }
    }
    generateInvoiceId(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const salesCount = yield this.saleRepository.getSalesCount(organizationId);
            const invoiceNumber = 10000 + salesCount + 1;
            return `SID${invoiceNumber}`;
        });
    }
    getSalesByCustomerId(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerRepository.getCustomerById(customerId);
            if (!customer) {
                throw new Error("Customer not found");
            }
            const sales = yield this.saleRepository.getSalesByCustomerId(customerId);
            const returns = yield this.returnRepository.getReturnsByCustomerId(customerId);
            const allInvoices = sales.length;
            const amountSpent = sales.reduce((acc, sale) => acc + Number(sale.totalAmount), 0);
            const dueInvoices = sales.filter(sale => Number(sale.remainingAmount) > 0);
            const dueAmount = dueInvoices.reduce((acc, sale) => acc + Number(sale.remainingAmount), 0);
            const creditNoteInvoices = yield this.creditNoteRepository.getAllCreditNotesByCustomerId(customerId);
            const activeCreditNote = creditNoteInvoices.find(creditNote => creditNote.isActive);
            const creditNoteBalance = activeCreditNote ? activeCreditNote.amount : 0;
            const result = {
                customer,
                sales,
                returns,
                counts: {
                    allInvoices,
                    amountSpent,
                    dueInvoices: dueInvoices.length,
                    dueAmount,
                    creditNoteInvoices: creditNoteInvoices.length,
                    creditNoteBalance
                }
            };
            return result;
        });
    }
};
SaleService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [sale_repository_1.default,
        user_repository_1.default,
        customer_repository_1.default,
        product_repository_1.default,
        transaction_repository_1.default,
        estimation_repository_1.default,
        credit_note_service_1.CreditNoteService,
        credit_note_repository_1.CreditNoteRepository,
        return_repository_1.default,
        common_service_1.default])
], SaleService);
exports.SaleService = SaleService;
