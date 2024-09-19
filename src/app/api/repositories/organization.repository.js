"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const typedi_1 = require("typedi");
const db_1 = __importDefault(require("../config/db"));
const organization_1 = require("../models/entities/organization");
const organization_type_1 = require("../models/entities/organization-type");
let OrganizationRepository = class OrganizationRepository {
    constructor() {
        this.organizationRepo = db_1.default.getRepository(organization_1.Organization);
        this.organizationTypeRepo = db_1.default.getRepository(organization_type_1.OrganizationType);
    }
    getAllOrganizations() {
        return this.organizationRepo.find({ where: { isActive: true } });
    }
    getOrganizationById(organizationId) {
        return this.organizationRepo.findOne({ where: { organizationId, isActive: true } });
    }
    createOrganization(organization) {
        return this.organizationRepo.save(organization);
    }
    updateOrganization(organization) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.organizationRepo.update({ organizationId: organization.organizationId, isActive: true }, organization);
            return result.affected ? result.affected > 0 : false;
        });
    }
    deleteOrganization(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.organizationRepo.update({ organizationId, isActive: true }, { isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
    getAllOrganizationTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.organizationTypeRepo.find({
                where: { isActive: true },
                select: ["organizationTypeId", "organizationTypeName"]
            });
        });
    }
    clearDatabaseByOrganizationId(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query("CALL ClearOrganizationData(?)", [organizationId]);
            if (!result)
                return false;
            return true;
        });
    }
};
OrganizationRepository = __decorate([
    (0, typedi_1.Service)()
], OrganizationRepository);
exports.default = OrganizationRepository;
