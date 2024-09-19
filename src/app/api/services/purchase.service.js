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
exports.PurchaseService = void 0;
const typedi_1 = require("typedi");
const purchase_repository_1 = __importDefault(require("../repositories/purchase.repository"));
const purchase_1 = require("../models/entities/purchase");
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const supplier_repository_1 = __importDefault(require("../repositories/supplier.repository"));
const purchase_item_1 = require("../models/entities/purchase-item");
const product_repository_1 = __importDefault(require("../repositories/product.repository"));
const transaction_repository_1 = __importDefault(require("../repositories/transaction.repository"));
const transaction_1 = require("../models/entities/transaction");
const common_service_1 = __importDefault(require("./common.service"));
let PurchaseService = class PurchaseService {
    constructor(purchaseRepository, userRepository, supplierRepository, productRepository, transactionRepository, commonService) {
        this.purchaseRepository = purchaseRepository;
        this.userRepository = userRepository;
        this.supplierRepository = supplierRepository;
        this.productRepository = productRepository;
        this.transactionRepository = transactionRepository;
        this.commonService = commonService;
    }
    getAllPurchases(organizationId) {
        return this.purchaseRepository.getAllPurchases(organizationId);
    }
    getPurchaseById(purchaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const purchase = yield this.purchaseRepository.getPurchaseById(purchaseId);
            if (!purchase) {
                throw new Error("Purchase not found");
            }
            return purchase;
        });
    }
    createPurchase(purchase) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield this.supplierRepository.getSupplierById(purchase.supplierId);
            if (!supplier) {
                throw new Error("Supplier not found");
            }
            const { supplierId, saleTypeId, weight, image, selectedItems, user: { userId, organizationId }, calculation: { subTotal, discount, loadingCharges, unloadingCharges, transportCharges, totalAmount, remainingAmount, paidAmount } } = purchase;
            const invoiceId = yield this.generateInvoiceId(organizationId);
            const purchaseObj = new purchase_1.Purchase();
            purchaseObj.invoiceId = invoiceId;
            purchaseObj.purchaseDate = this.commonService.getIndiaDateTime();
            purchaseObj.supplierId = supplierId;
            purchaseObj.saleTypeId = saleTypeId;
            purchaseObj.userId = userId;
            purchaseObj.weight = weight;
            purchaseObj.stateOfSupply = "";
            purchaseObj.subTotal = subTotal;
            purchaseObj.discount = discount;
            purchaseObj.loadingCharges = loadingCharges;
            purchaseObj.unloadingCharges = unloadingCharges;
            purchaseObj.transportCharges = transportCharges;
            purchaseObj.totalAmount = totalAmount;
            purchaseObj.remainingAmount = remainingAmount;
            purchaseObj.paidAmount = paidAmount;
            purchaseObj.image = image;
            purchaseObj.createdBy = userId;
            purchaseObj.organizationId = organizationId;
            const newPurchase = yield this.purchaseRepository.createPurchase(purchaseObj);
            const purchaseItems = selectedItems.map(item => {
                const purchaseItem = new purchase_item_1.PurchaseItem();
                purchaseItem.purchaseId = newPurchase.purchaseId;
                purchaseItem.itemId = item.itemId;
                purchaseItem.quantity = item.totalQuantity;
                purchaseItem.rate = item.rate;
                purchaseItem.discount = item.discount;
                purchaseItem.purchasePrice = item.purchasePrice;
                purchaseItem.salePrice = item.salePrice;
                return purchaseItem;
            });
            yield this.purchaseRepository.createPurchaseItems(purchaseItems);
            yield this.productRepository.updateProductItemsAvailability(purchase.selectedItems, "PURCHASE");
            const transaction = new transaction_1.Transaction();
            transaction.transactionType = "Purchase";
            transaction.referenceId = newPurchase.purchaseId;
            transaction.invoiceId = newPurchase.invoiceId;
            transaction.transactionDate = this.commonService.getIndiaDateTime();
            transaction.openingBalance = 0;
            transaction.amount = totalAmount;
            transaction.paidAmount = paidAmount;
            transaction.remainingAmount = newPurchase.remainingAmount;
            transaction.createdBy = userId;
            transaction.organizationId = organizationId;
            yield this.transactionRepository.createTransaction(transaction);
            return newPurchase;
        });
    }
    updatePurchase(purchaseId, purchase) {
        return __awaiter(this, void 0, void 0, function* () {
            purchase.purchaseId = purchaseId;
            return this.purchaseRepository.updatePurchase(purchase);
        });
    }
    deletePurchase(purchaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.purchaseRepository.deletePurchase(purchaseId);
        });
    }
    generateInvoiceId(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const salesCount = yield this.purchaseRepository.getPurchaseCount(organizationId);
            const invoiceNumber = 10000 + salesCount + 1;
            return `PID${invoiceNumber}`;
        });
    }
};
PurchaseService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [purchase_repository_1.default,
        user_repository_1.default,
        supplier_repository_1.default,
        product_repository_1.default,
        transaction_repository_1.default,
        common_service_1.default])
], PurchaseService);
exports.PurchaseService = PurchaseService;
