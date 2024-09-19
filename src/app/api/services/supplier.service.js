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
exports.SupplierService = void 0;
const typedi_1 = require("typedi");
const supplier_repository_1 = __importDefault(require("../repositories/supplier.repository"));
const supplier_1 = require("../models/entities/supplier");
const typeorm_1 = require("typeorm");
const purchase_repository_1 = __importDefault(require("../repositories/purchase.repository"));
const transaction_1 = require("../models/entities/transaction");
const common_service_1 = __importDefault(require("./common.service"));
const transaction_repository_1 = __importDefault(require("../repositories/transaction.repository"));
let SupplierService = class SupplierService {
    constructor(supplierRepository, purchaseRepository, transactionRepository, commonService) {
        this.supplierRepository = supplierRepository;
        this.purchaseRepository = purchaseRepository;
        this.transactionRepository = transactionRepository;
        this.commonService = commonService;
    }
    getAllSuppliers(organizationId) {
        return this.supplierRepository.getAllSuppliers(organizationId);
    }
    getSupplierById(supplierId) {
        return this.supplierRepository.getSupplierById(supplierId);
    }
    createSupplier(supplierObj) {
        const { supplierName, contactPerson, contactNumber, email, address, regNo, gstNo, bankDetails, user } = supplierObj;
        const newSupplier = new supplier_1.Supplier();
        newSupplier.supplierName = supplierName;
        newSupplier.contactPerson = contactPerson;
        newSupplier.contactNumber = contactNumber;
        newSupplier.email = email;
        newSupplier.address = address;
        newSupplier.regNo = regNo;
        newSupplier.gstNo = gstNo;
        newSupplier.bankDetails = bankDetails;
        newSupplier.createdBy = user.userId;
        newSupplier.organizationId = user.organizationId;
        return this.supplierRepository.createSupplier(newSupplier);
    }
    updateSupplier(supplierId, supplier) {
        supplier.supplierId = supplierId;
        return this.supplierRepository.updateSupplier(supplier);
    }
    deleteSupplier(supplierId) {
        return this.supplierRepository.deleteSupplier(supplierId);
    }
    getSuppliersPayments(status, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereCondition = {
                organizationId,
                isActive: true,
                remainingAmount: status === "In" ? (0, typeorm_1.LessThan)(0) : (0, typeorm_1.MoreThan)(0),
            };
            const orderBy = status === "In"
                ? { remainingAmount: "ASC", createdAt: "DESC" }
                : { remainingAmount: "DESC", createdAt: "DESC" };
            return this.purchaseRepository.getPurchasesByWhereCondition(whereCondition, orderBy);
        });
    }
    updateSupplierPayment(supplierPayment) {
        return __awaiter(this, void 0, void 0, function* () {
            const { supplierId, invoiceId, paidAmount, paymentModeId, user: { userId, organizationId } } = supplierPayment;
            const purchase = yield this.purchaseRepository.getPurchaseWithSupplierByInvoiceId(invoiceId, organizationId);
            if (!purchase) {
                throw new Error("Purchase not found");
            }
            if (purchase.supplier.supplierId !== supplierId) {
                throw new Error("Invoice does not belong to this supplier");
            }
            if (purchase.remainingAmount < paidAmount) {
                throw new Error("Paying amount is greater than due amount");
            }
            purchase.saleTypeId = paymentModeId;
            purchase.paidAmount = +purchase.paidAmount + paidAmount;
            purchase.remainingAmount = +purchase.remainingAmount - paidAmount;
            purchase.updatedBy = userId;
            const transaction = new transaction_1.Transaction();
            transaction.transactionType = "Purchase";
            transaction.referenceId = purchase.purchaseId;
            transaction.invoiceId = purchase.invoiceId;
            transaction.transactionDate = this.commonService.getIndiaDateTime();
            transaction.openingBalance = 0;
            transaction.amount = paidAmount;
            transaction.paidAmount = paidAmount;
            transaction.remainingAmount = purchase.remainingAmount;
            transaction.createdBy = userId;
            transaction.organizationId = organizationId;
            yield this.transactionRepository.createTransaction(transaction);
            return yield this.purchaseRepository.updatePurchase(purchase);
        });
    }
};
SupplierService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [supplier_repository_1.default,
        purchase_repository_1.default,
        transaction_repository_1.default,
        common_service_1.default])
], SupplierService);
exports.SupplierService = SupplierService;
