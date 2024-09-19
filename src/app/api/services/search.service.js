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
exports.SearchService = void 0;
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const paging_sorting_repository_1 = __importDefault(require("../repositories/paging-sorting.repository"));
const product_1 = require("../models/entities/product");
const product_category_1 = require("../models/entities/product-category");
const product_item_1 = require("../models/entities/product-item");
const customer_repository_1 = __importDefault(require("../repositories/customer.repository"));
const supplier_repository_1 = __importDefault(require("../repositories/supplier.repository"));
const sale_repository_1 = __importDefault(require("../repositories/sale.repository"));
const estimation_repository_1 = __importDefault(require("../repositories/estimation.repository"));
const purchase_repository_1 = __importDefault(require("../repositories/purchase.repository"));
const return_repository_1 = __importDefault(require("../repositories/return.repository"));
const transaction_repository_1 = __importDefault(require("../repositories/transaction.repository"));
let SearchService = class SearchService {
    constructor(customerRepository, supplierRepository, saleRepository, estimationRepository, purchaseRepository, returnRepository, transactionRepository) {
        this.customerRepository = customerRepository;
        this.supplierRepository = supplierRepository;
        this.saleRepository = saleRepository;
        this.estimationRepository = estimationRepository;
        this.purchaseRepository = purchaseRepository;
        this.returnRepository = returnRepository;
        this.transactionRepository = transactionRepository;
    }
    findProductsWithPagination(findProductsObj, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereCondition = {
                productName: (0, typeorm_1.Like)(`%${findProductsObj.productName}%`),
                organizationId
            };
            const productPaginationRepo = new paging_sorting_repository_1.default(product_1.Product);
            return yield productPaginationRepo.getEntitiesWithPagingAndSorting(findProductsObj, whereCondition);
        });
    }
    findCategoriesWithPagination(findCategoriesObj, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereCondition = {
                categoryName: (0, typeorm_1.Like)(`%${findCategoriesObj.categoryName}%`),
                organizationId
            };
            const categoryPaginationRepo = new paging_sorting_repository_1.default(product_category_1.ProductCategory);
            return yield categoryPaginationRepo.getEntitiesWithPagingAndSorting(findCategoriesObj, whereCondition);
        });
    }
    findProductItemsWithPagination(findProductItemsObj, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereConditions = [];
            const { productId, categoryId, categoryTypeId, itemNameOrCode, supplierId } = findProductItemsObj;
            if (productId || categoryId || categoryTypeId) {
                whereConditions.push({
                    productId,
                    categoryId,
                    categoryTypeId,
                    supplierId,
                    isActive: true,
                    organizationId
                });
            }
            if (itemNameOrCode) {
                whereConditions.push({
                    itemCode: itemNameOrCode,
                    isActive: true,
                    supplierId,
                    organizationId
                });
                whereConditions.push({
                    itemName: (0, typeorm_1.Like)(`%${itemNameOrCode}%`),
                    isActive: true,
                    supplierId,
                    organizationId
                });
            }
            const productItemPaginationRepo = new paging_sorting_repository_1.default(product_item_1.ProductItem);
            return yield productItemPaginationRepo.getEntitiesWithPagingAndSorting(findProductItemsObj, whereConditions);
        });
    }
    findCustomers(findCustomersObj, organizationId) {
        const { customerName, contactNumber } = findCustomersObj;
        if (customerName) {
            return this.customerRepository.findCustomers("customerName", customerName, organizationId);
        }
        else if (contactNumber) {
            return this.customerRepository.findCustomers("contactNumber", contactNumber, organizationId);
        }
        else {
            throw new Error("Either customerName or contactNumber is required");
        }
    }
    findSuppliers(findSupplierObj, organizationId) {
        return this.supplierRepository.findSuppliers(findSupplierObj.supplierName, organizationId);
    }
    getInvoiceById(invoiceId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const startsWith = invoiceId.substring(0, 3);
            let invoice;
            switch (startsWith) {
                case "SID":
                    return yield this.getSalesWithTransactions(invoiceId, organizationId);
                case "EID":
                    invoice = yield this.estimationRepository.getEstimationByInvoiceId(invoiceId, organizationId);
                    break;
                case "PID":
                    invoice = yield this.purchaseRepository.getPurchaseByInvoiceId(invoiceId, organizationId);
                    break;
                case "RID":
                    invoice = yield this.returnRepository.getReturnByInvoiceId(invoiceId, organizationId);
                    break;
                default:
                    throw new Error("Invalid Invoice Id");
            }
            if (!invoice) {
                throw new Error("Invoice not found");
            }
            return invoice;
        });
    }
    getSalesWithTransactions(invoiceId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = yield this.saleRepository.getSaleByInvoiceId(invoiceId, organizationId);
            if (!sale) {
                throw new Error("Invoice not found");
            }
            const transactions = yield this.transactionRepository.getTransactionsByInvoiceId(invoiceId, organizationId);
            const InvocieTransactions = transactions.map(transaction => {
                return {
                    invoiceId, date: transaction.transactionDate, amount: transaction.paidAmount
                };
            });
            const returnIds = yield this.returnRepository.getReturnIdsByInvoiceId(invoiceId);
            if (returnIds.length > 0) {
                const returns = yield this.returnRepository.getReturnsByReturnIds(returnIds, organizationId);
                returns.forEach(_return => {
                    _return.returnedInvoices.forEach(returnedInvoice => {
                        if (returnedInvoice.invoiceId === invoiceId) {
                            InvocieTransactions.push({
                                invoiceId: _return.invoiceId,
                                date: _return.returnDate,
                                amount: returnedInvoice.usedAmount
                            });
                        }
                    });
                });
            }
            return Object.assign(Object.assign({}, sale), { transactions: InvocieTransactions });
        });
    }
};
SearchService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [customer_repository_1.default,
        supplier_repository_1.default,
        sale_repository_1.default,
        estimation_repository_1.default,
        purchase_repository_1.default,
        return_repository_1.default,
        transaction_repository_1.default])
], SearchService);
exports.SearchService = SearchService;
