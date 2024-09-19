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
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const organization_service_1 = require("../services/organization.service");
const typedi_1 = require("typedi");
const organization_1 = require("../models/entities/organization");
let OrganizationController = class OrganizationController {
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    getAllOrganizations() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.organizationService.getAllOrganizations();
        });
    }
    getAllOrganizationTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.organizationService.getAllOrganizationTypes();
        });
    }
    clearDatabaseByOrganizationId(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.organizationService.clearDatabaseByOrganizationId(organizationId);
        });
    }
    getOrganizationById(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.organizationService.getOrganizationById(organizationId);
        });
    }
    createOrganization(organization) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.organizationService.createOrganization(organization);
        });
    }
    updateOrganization(organizationId, organization) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.organizationService.updateOrganization(organizationId, organization);
        });
    }
    deleteOrganization(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.organizationService.deleteOrganization(organizationId);
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getAllOrganizations", null);
__decorate([
    (0, tsoa_1.Get)("/types"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getAllOrganizationTypes", null);
__decorate([
    (0, tsoa_1.Get)("/clear-db/:organizationId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "clearDatabaseByOrganizationId", null);
__decorate([
    (0, tsoa_1.Get)("/:organizationId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getOrganizationById", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_1.Organization]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "createOrganization", null);
__decorate([
    (0, tsoa_1.Put)("/:organizationId"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, organization_1.Organization]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateOrganization", null);
__decorate([
    (0, tsoa_1.Delete)("/:organizationId"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "deleteOrganization", null);
OrganizationController = __decorate([
    (0, tsoa_1.Tags)("Organizations"),
    (0, tsoa_1.Route)("api/organizations"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], OrganizationController);
exports.default = OrganizationController;
