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
const customer_1 = require("../models/entities/customer");
const customer_repository_1 = __importDefault(require("../repositories/customer.repository"));
const sale_repository_1 = __importDefault(require("../repositories/sale.repository"));
const typeorm_1 = require("typeorm");
const transaction_1 = require("../models/entities/transaction");
const transaction_repository_1 = __importDefault(require("../repositories/transaction.repository"));
const common_service_1 = __importDefault(require("./common.service"));
const return_repository_1 = __importDefault(require("../repositories/return.repository"));
const credit_note_1 = require("../models/entities/credit-note");
const credit_note_service_1 = require("./credit-note.service");
let CustomerService = class CustomerService {
    constructor(customerRepository, saleRepository, transactionRepository, returnRepository, commonService, creditNoteService) {
        this.customerRepository = customerRepository;
        this.saleRepository = saleRepository;
        this.transactionRepository = transactionRepository;
        this.returnRepository = returnRepository;
        this.commonService = commonService;
        this.creditNoteService = creditNoteService;
    }
    getAllCustomers(organizationId) {
        return this.customerRepository.getAllCustomers(organizationId);
    }
    getCustomerById(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerRepository.getCustomerById(customerId);
            if (!customer) {
                throw new Error("Customer not found");
            }
            return customer;
        });
    }
    createCustomer(customerObj) {
        const { customerName, contactNumber, customerType, email, gstNo, address, user } = customerObj;
        const newCustomer = new customer_1.Customer();
        newCustomer.customerName = customerName;
        newCustomer.contactNumber = contactNumber;
        newCustomer.customerType = customerType;
        newCustomer.email = email;
        newCustomer.gstNo = gstNo;
        newCustomer.address = address;
        newCustomer.createdBy = user.userId;
        newCustomer.organizationId = user.organizationId;
        return this.customerRepository.createCustomer(newCustomer);
    }
    updateCustomer(customerId, customer) {
        customer.customerId = customerId;
        return this.customerRepository.updateCustomer(customer);
    }
    deleteCustomer(customerId) {
        return this.customerRepository.deleteCustomer(customerId);
    }
    getCustomersPayments(status, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereCondition = {
                organizationId,
                isActive: true,
                remainingAmount: status === "In" ? (0, typeorm_1.MoreThan)(0) : (0, typeorm_1.LessThan)(0),
            };
            const orderBy = { remainingAmount: "DESC", createdAt: "DESC" };
            return this.saleRepository.getSalesByWhereCondition(whereCondition, orderBy);
        });
    }
    updateCustomerPayment(customerPayment) {
        return __awaiter(this, void 0, void 0, function* () {
            const { customerId, invoiceId, paidAmount, paymentModeId, user: { userId, organizationId } } = customerPayment;
            const sale = yield this.saleRepository.getSaleWithCustomerByInvoiceId(invoiceId, organizationId);
            let extraAmount = 0;
            if (!sale) {
                throw new Error("Sale not found");
            }
            if (sale.customer.customerId !== customerId) {
                throw new Error("Invoice does not belong to this customer");
            }
            if (sale.remainingAmount < paidAmount) {
                extraAmount = paidAmount - +sale.remainingAmount;
                // throw new Error("Paying amount is greater than due amount");
            }
            const remainingAmount = +sale.remainingAmount - paidAmount;
            sale.saleTypeId = paymentModeId;
            sale.paidAmount = +sale.paidAmount + paidAmount;
            sale.remainingAmount = remainingAmount > 0 ? remainingAmount : 0;
            sale.updatedBy = userId;
            const openingBalance = yield this.transactionRepository.getCustomerOpeningBalance(customerId);
            const closingBalance = openingBalance - paidAmount;
            if (extraAmount > 0) {
                const creditNote = new credit_note_1.CreditNote();
                creditNote.customerId = customerId;
                creditNote.refInvoiceId = sale.invoiceId;
                creditNote.amount = extraAmount;
                creditNote.creditNoteType = "Sale";
                creditNote.createdBy = userId;
                creditNote.organizationId = organizationId;
                yield this.creditNoteService.createCreditNote(creditNote);
            }
            const transaction = new transaction_1.Transaction();
            transaction.transactionType = "Sale";
            transaction.referenceId = sale.saleId;
            transaction.invoiceId = sale.invoiceId;
            transaction.transactionDate = this.commonService.getIndiaDateTime();
            transaction.openingBalance = openingBalance;
            transaction.amount = 0;
            transaction.paidAmount = paidAmount;
            transaction.remainingAmount = closingBalance;
            transaction.createdBy = userId;
            transaction.customerId = customerId;
            transaction.organizationId = organizationId;
            yield this.transactionRepository.createTransaction(transaction);
            return yield this.saleRepository.updateSale(sale);
        });
    }
    getCustomerTransactions(customerObj, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { customerId, fromDate, toDate } = customerObj;
            const transactions = yield this.transactionRepository.getAllCustomerTransactions(customerId, fromDate, toDate, organizationId);
            return Promise.all((transactions.map((transaction) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const amounts = { returnedAmount: 0, utilizedCreditBalance: 0 };
                if (transaction.transactionType === "Sale") {
                    const utilizedCreditBalance = yield this.saleRepository.getUtilizedCreditBalanceByInvoiceId(transaction.invoiceId, organizationId);
                    amounts.utilizedCreditBalance = utilizedCreditBalance;
                    const saleObj = yield this.saleRepository.getSaleByInvoiceId(transaction.invoiceId, organizationId);
                    return Object.assign(Object.assign(Object.assign({}, transaction), amounts), { saleObj });
                }
                else if (transaction.transactionType === "Return") {
                    const _return = yield this.returnRepository.getOnlyReturnByInvoiceId(transaction.invoiceId, organizationId);
                    const totalAmount = (_a = _return === null || _return === void 0 ? void 0 : _return.totalAmount) !== null && _a !== void 0 ? _a : 0;
                    if ((_return === null || _return === void 0 ? void 0 : _return.saleType.saleType.toLowerCase()) === "credit_note") {
                        amounts.utilizedCreditBalance = totalAmount;
                    }
                    else {
                        amounts.returnedAmount = totalAmount;
                    }
                    const returnObj = yield this.returnRepository.getReturnByInvoiceId(transaction.invoiceId, organizationId);
                    return Object.assign(Object.assign(Object.assign({}, transaction), amounts), { returnObj });
                }
                return Object.assign(Object.assign({}, transaction), amounts);
            }))));
        });
    }
    updateCustomerDueAmount(paymentObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const { customerId, paidAmount: totalPaid, paymentModeId, user: { userId, organizationId } } = paymentObj;
            const customerDueSales = yield this.saleRepository.getSalesByWhereCondition({ customerId, isActive: true, remainingAmount: (0, typeorm_1.MoreThan)(0) }, { createdAt: "asc" });
            let amountLeft = totalPaid;
            let saleInvoiceId = '';
            for (const sale of customerDueSales) {
                if (amountLeft > 0) {
                    const salePaidAmount = +sale.paidAmount;
                    const saleRemainingAmount = +sale.remainingAmount;
                    let paidAmount = amountLeft;
                    if (saleRemainingAmount > amountLeft) {
                        sale.paidAmount = salePaidAmount + amountLeft;
                        sale.remainingAmount = saleRemainingAmount - amountLeft;
                        amountLeft = 0;
                    }
                    else {
                        sale.paidAmount = salePaidAmount + saleRemainingAmount;
                        amountLeft = amountLeft - saleRemainingAmount;
                        paidAmount = saleRemainingAmount;
                        sale.remainingAmount = 0;
                    }
                    sale.saleTypeId = paymentModeId;
                    sale.updatedBy = userId;
                    yield this.saleRepository.updateSale(sale);
                    saleInvoiceId = sale.invoiceId;
                    const openingBalance = yield this.transactionRepository.getCustomerOpeningBalance(customerId);
                    const closingBalance = openingBalance - paidAmount;
                    const transaction = new transaction_1.Transaction();
                    transaction.transactionType = "Sale";
                    transaction.referenceId = sale.saleId;
                    transaction.invoiceId = sale.invoiceId;
                    transaction.transactionDate = this.commonService.getIndiaDateTime();
                    transaction.openingBalance = openingBalance;
                    transaction.amount = 0;
                    transaction.paidAmount = paidAmount;
                    transaction.remainingAmount = closingBalance;
                    transaction.createdBy = userId;
                    transaction.customerId = customerId;
                    transaction.organizationId = organizationId;
                    yield this.transactionRepository.createTransaction(transaction);
                }
                else {
                    break;
                }
            }
            if (amountLeft > 0 && saleInvoiceId) {
                const creditNote = new credit_note_1.CreditNote();
                creditNote.customerId = customerId;
                creditNote.refInvoiceId = saleInvoiceId;
                creditNote.amount = amountLeft;
                creditNote.creditNoteType = "Sale";
                creditNote.createdBy = userId;
                creditNote.organizationId = organizationId;
                yield this.creditNoteService.createCreditNote(creditNote);
            }
            return true;
        });
    }
};
CustomerService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [customer_repository_1.default,
        sale_repository_1.default,
        transaction_repository_1.default,
        return_repository_1.default,
        common_service_1.default,
        credit_note_service_1.CreditNoteService])
], CustomerService);
exports.default = CustomerService;
