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
const typedi_1 = require("typedi");
const estimation_service_1 = require("../services/estimation.service");
const estimation_1 = require("../models/entities/estimation");
const tsoa_1 = require("tsoa");
let EstimationController = class EstimationController {
    constructor(estimationService) {
        this.estimationService = estimationService;
    }
    getAllEstimations(organizationId = '') {
        return this.estimationService.getAllEstimations(organizationId);
    }
    getEstimationById(estimationId) {
        return this.estimationService.getEstimationById(estimationId);
    }
    createEstimation(estimation) {
        return this.estimationService.createEstimation(estimation);
    }
    updateEstimation(estimationId, estimation) {
        return this.estimationService.updateEstimation(estimationId, estimation);
    }
    deleteEstimation(estimationId) {
        return this.estimationService.deleteEstimation(estimationId);
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(0, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EstimationController.prototype, "getAllEstimations", null);
__decorate([
    (0, tsoa_1.Get)("/:estimationId"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstimationController.prototype, "getEstimationById", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EstimationController.prototype, "createEstimation", null);
__decorate([
    (0, tsoa_1.Put)("/:estimationId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, estimation_1.Estimation]),
    __metadata("design:returntype", Promise)
], EstimationController.prototype, "updateEstimation", null);
__decorate([
    (0, tsoa_1.Delete)("/:estimationId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstimationController.prototype, "deleteEstimation", null);
EstimationController = __decorate([
    (0, tsoa_1.Tags)("Estimations"),
    (0, tsoa_1.Route)("api/estimations"),
    (0, tsoa_1.Security)("token"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [estimation_service_1.EstimationService])
], EstimationController);
exports.default = EstimationController;
