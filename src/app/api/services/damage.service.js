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
exports.DamageService = void 0;
const typedi_1 = require("typedi");
const damage_repository_1 = require("../repositories/damage.repository");
const damage_1 = require("../models/entities/damage");
const product_repository_1 = __importDefault(require("../repositories/product.repository"));
const transaction_1 = require("../models/entities/transaction");
const common_service_1 = __importDefault(require("./common.service"));
const transaction_repository_1 = __importDefault(require("../repositories/transaction.repository"));
let DamageService = class DamageService {
    constructor(damageRepository, productRepository, transactionRepository, commonService) {
        this.damageRepository = damageRepository;
        this.productRepository = productRepository;
        this.transactionRepository = transactionRepository;
        this.commonService = commonService;
    }
    getAllDamages(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.damageRepository.getAllDamages(organizationId);
        });
    }
    getDamageById(damageId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const damage = yield this.damageRepository.getDamageById(damageId, organizationId);
            if (!damage) {
                throw new Error("Damage not found");
            }
            return damage;
        });
    }
    getDamageByInvoiceId(invoiceId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const damage = yield this.damageRepository.getDamageByInvoiceId(invoiceId, organizationId);
            if (!damage) {
                throw new Error("Damage not found");
            }
            return damage;
        });
    }
    createDamage(damageObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const { itemId, quantity, reason, user: { userId, organizationId } } = damageObj;
            const item = yield this.productRepository.getProductItemById(itemId);
            if (!item) {
                throw new Error("Item not found");
            }
            if (item.availableQuantity < quantity) {
                throw new Error("Item quantity not available");
            }
            const { salePrice, productId } = item;
            const totalAmount = salePrice * quantity;
            const damage = new damage_1.Damage();
            damage.invoiceId = yield this.generateInvoiceId(organizationId);
            damage.damageDate = this.commonService.getIndiaDateTime();
            damage.itemId = itemId;
            damage.productId = productId;
            damage.quantity = quantity;
            damage.salePrice = salePrice;
            damage.reason = reason;
            damage.createdBy = userId;
            damage.organizationId = organizationId;
            const newDamage = yield this.damageRepository.createDamage(damage);
            item.availableQuantity -= quantity;
            yield this.productRepository.updateProductItem(item);
            const transaction = new transaction_1.Transaction();
            transaction.transactionType = "Damage";
            transaction.referenceId = newDamage.damageId;
            transaction.invoiceId = newDamage.invoiceId;
            transaction.transactionDate = this.commonService.getIndiaDateTime();
            transaction.openingBalance = 0;
            transaction.amount = totalAmount;
            transaction.paidAmount = 0;
            transaction.remainingAmount = 0;
            transaction.createdBy = userId;
            transaction.organizationId = organizationId;
            yield this.transactionRepository.createTransaction(transaction);
            return newDamage;
        });
    }
    updateDamage(damageId, damage) {
        return __awaiter(this, void 0, void 0, function* () {
            damage.damageId = damageId;
            return this.damageRepository.updateDamage(damage);
        });
    }
    deleteDamage(damageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.damageRepository.deleteDamage(damageId);
        });
    }
    generateInvoiceId(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.damageRepository.getDamagesCount(organizationId);
            const invoiceNumber = 10000 + count + 1;
            return `DID${invoiceNumber}`;
        });
    }
};
DamageService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [damage_repository_1.DamageRepository,
        product_repository_1.default,
        transaction_repository_1.default,
        common_service_1.default])
], DamageService);
exports.DamageService = DamageService;
