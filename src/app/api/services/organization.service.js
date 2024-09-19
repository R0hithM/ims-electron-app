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
exports.OrganizationService = void 0;
const typedi_1 = require("typedi");
const organization_repository_1 = __importDefault(require("../repositories/organization.repository"));
let OrganizationService = class OrganizationService {
    constructor(organizationRepository) {
        this.organizationRepository = organizationRepository;
    }
    getAllOrganizations() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.organizationRepository.getAllOrganizations();
        });
    }
    getOrganizationById(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const organization = yield this.organizationRepository.getOrganizationById(organizationId);
            if (!organization) {
                throw new Error("Organization not found");
            }
            return organization;
        });
    }
    createOrganization(organization) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.organizationRepository.createOrganization(organization);
        });
    }
    updateOrganization(organizationId, organization) {
        return __awaiter(this, void 0, void 0, function* () {
            organization.organizationId = organizationId;
            return yield this.organizationRepository.updateOrganization(organization);
        });
    }
    deleteOrganization(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.organizationRepository.deleteOrganization(organizationId);
        });
    }
    getAllOrganizationTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.organizationRepository.getAllOrganizationTypes();
        });
    }
    clearDatabaseByOrganizationId(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.organizationRepository.clearDatabaseByOrganizationId(organizationId);
        });
    }
};
OrganizationService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [organization_repository_1.default])
], OrganizationService);
exports.OrganizationService = OrganizationService;
