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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const typedi_1 = require("typedi");
const customer_service_1 = __importDefault(require("../services/customer.service"));
const customer_1 = require("../models/entities/customer");
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    getAllCustomers(organizationId = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.customerService.getAllCustomers(organizationId);
        });
    }
    getCustomerById(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.customerService.getCustomerById(customerId);
        });
    }
    createCustomer(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.customerService.createCustomer(customer);
        });
    }
    updateCustomer(customerId, customer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.customerService.updateCustomer(customerId, customer);
        });
    }
    deleteCustomer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.customerService.deleteCustomer(customerId);
        });
    }
    getCustomersPayments(status, organizationId = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.customerService.getCustomersPayments(status, organizationId);
        });
    }
    updateCustomerPayment(customerPayment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.customerService.updateCustomerPayment(customerPayment);
        });
    }
    getCustomerTransactions(customerObj, organizationId = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.customerService.getCustomerTransactions(customerObj, organizationId);
        });
    }
    updateCustomerDueAmount(paymentObj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.customerService.updateCustomerDueAmount(paymentObj);
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
], CustomerController.prototype, "getAllCustomers", null);
__decorate([
    (0, tsoa_1.Get)("/:customerId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomerById", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "createCustomer", null);
__decorate([
    (0, tsoa_1.Put)("/:customerId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, customer_1.Customer]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomer", null);
__decorate([
    (0, tsoa_1.Delete)("/:customerId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "deleteCustomer", null);
__decorate([
    (0, tsoa_1.Get)("/payments"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomersPayments", null);
__decorate([
    (0, tsoa_1.Post)("/add-payment"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomerPayment", null);
__decorate([
    (0, tsoa_1.Post)("/transactions"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomerTransactions", null);
__decorate([
    (0, tsoa_1.Post)("/due-payment"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomerDueAmount", null);
CustomerController = __decorate([
    (0, tsoa_1.Tags)("Customers"),
    (0, tsoa_1.Route)("api/customers"),
    (0, tsoa_1.Security)("token"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [customer_service_1.default])
], CustomerController);
exports.default = CustomerController;
