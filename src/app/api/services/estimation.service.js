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
exports.EstimationService = void 0;
const typedi_1 = require("typedi");
const estimation_repository_1 = __importDefault(require("../repositories/estimation.repository"));
const estimation_1 = require("../models/entities/estimation");
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const customer_repository_1 = __importDefault(require("../repositories/customer.repository"));
const estimation_item_1 = require("../models/entities/estimation-item");
const common_service_1 = __importDefault(require("./common.service"));
let EstimationService = class EstimationService {
    constructor(estimationRepository, userRepository, customerRepository, commonService) {
        this.estimationRepository = estimationRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.commonService = commonService;
    }
    getAllEstimations(organizationId) {
        return this.estimationRepository.getAllEstimations(organizationId);
    }
    getEstimationById(estimationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const estimation = yield this.estimationRepository.getEstimationById(estimationId);
            if (!estimation) {
                throw new Error("Estimation not found");
            }
            return estimation;
        });
    }
    createEstimation(estimationObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const { customerId, weight, user, selectedItems, calculation: { subTotal, discount, loadingCharges, unloadingCharges, transportCharges, totalAmount } } = estimationObj;
            const customer = yield this.customerRepository.getCustomerById(customerId);
            if (!customer) {
                throw new Error("Customer not found");
            }
            const invoiceId = yield this.generateInvoiceId(user.organizationId);
            const estimation = new estimation_1.Estimation();
            estimation.invoiceId = invoiceId;
            estimation.estimationDate = this.commonService.getIndiaDateTime();
            estimation.userId = user.userId;
            estimation.customerId = customerId;
            estimation.subTotal = subTotal;
            estimation.discount = discount;
            estimation.loadingCharges = loadingCharges;
            estimation.unloadingCharges = unloadingCharges;
            estimation.transportCharges = transportCharges;
            estimation.estimatedPrice = totalAmount;
            estimation.weight = weight;
            estimation.createdBy = user.userId;
            estimation.organizationId = user.organizationId;
            const newEstimation = yield this.estimationRepository.createEstimation(estimation);
            const estimationItems = selectedItems.map(item => {
                const estimationItem = new estimation_item_1.EstimationItem();
                estimationItem.estimationId = newEstimation.estimationId;
                estimationItem.itemId = item.itemId;
                estimationItem.quantity = item.totalQuantity;
                estimationItem.rate = item.rate;
                estimationItem.discount = item.discount;
                estimationItem.purchasePrice = item.purchasePrice;
                estimationItem.salePrice = item.salePrice;
                return estimationItem;
            });
            yield this.estimationRepository.createEstimationItems(estimationItems);
            return newEstimation;
        });
    }
    updateEstimation(estimationId, estimation) {
        estimation.estimationId = estimationId;
        return this.estimationRepository.updateEstimation(estimation);
    }
    deleteEstimation(estimationId) {
        return this.estimationRepository.deleteEstimation(estimationId);
    }
    generateInvoiceId(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const salesCount = yield this.estimationRepository.getEstimationsCount(organizationId);
            const invoiceNumber = 10000 + salesCount + 1;
            return `EID${invoiceNumber}`;
        });
    }
};
EstimationService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [estimation_repository_1.default,
        user_repository_1.default,
        customer_repository_1.default,
        common_service_1.default])
], EstimationService);
exports.EstimationService = EstimationService;
