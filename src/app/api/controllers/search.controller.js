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
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const typedi_1 = require("typedi");
const search_1 = require("../models/interface/search");
const search_service_1 = require("../services/search.service");
let SearchController = class SearchController {
    constructor(searchService) {
        this.searchService = searchService;
    }
    findProductsWithPagination(findProductsObj, organizationId = "") {
        return this.searchService.findProductsWithPagination(findProductsObj, organizationId);
    }
    findCategoriesWithPagination(findCategoriesObj, organizationId = "") {
        return this.searchService.findCategoriesWithPagination(findCategoriesObj, organizationId);
    }
    findProductItemsWithPagination(findProductItemsObj, organizationId = "") {
        return this.searchService.findProductItemsWithPagination(findProductItemsObj, organizationId);
    }
    findCustomers(findCustomerObj, organizationId = "") {
        return this.searchService.findCustomers(findCustomerObj, organizationId);
    }
    findSuppliers(findSupplierObj, organizationId = "") {
        return this.searchService.findSuppliers(findSupplierObj, organizationId);
    }
    getInvoiceById(invoiceId, organizationId = "") {
        return this.searchService.getInvoiceById(invoiceId, organizationId);
    }
};
__decorate([
    (0, tsoa_1.Post)("/products"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_1.FindProductsObj, Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "findProductsWithPagination", null);
__decorate([
    (0, tsoa_1.Post)("/categories"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_1.FindCategoriesObj, Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "findCategoriesWithPagination", null);
__decorate([
    (0, tsoa_1.Post)("/productItems"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_1.FindProductItemsObj, Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "findProductItemsWithPagination", null);
__decorate([
    (0, tsoa_1.Post)("/customers"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "findCustomers", null);
__decorate([
    (0, tsoa_1.Post)("/suppliers"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "findSuppliers", null);
__decorate([
    (0, tsoa_1.Get)("/invoice/:invoiceId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "getInvoiceById", null);
SearchController = __decorate([
    (0, tsoa_1.Tags)("Search"),
    (0, tsoa_1.Route)("api/search"),
    (0, tsoa_1.Security)("token"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
exports.default = SearchController;
