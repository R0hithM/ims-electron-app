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
exports.DamageRepository = void 0;
const typedi_1 = require("typedi");
const db_1 = __importDefault(require("../config/db"));
const damage_1 = require("../models/entities/damage");
let DamageRepository = class DamageRepository {
    constructor() {
        this.damagesRepo = db_1.default.getRepository(damage_1.Damage);
    }
    getAllDamages(organizationId) {
        return this.damagesRepo.find({ where: { organizationId, isActive: true } });
    }
    getDamageById(damageId, organizationId) {
        return this.damagesRepo.findOneBy({ damageId, organizationId, isActive: true });
    }
    getDamageByInvoiceId(invoiceId, organizationId) {
        return this.damagesRepo.findOne({
            where: { invoiceId, organizationId, isActive: true },
            relations: { item: { categoryTypeInfo: true }, user: { organization: true } }
        });
    }
    createDamage(damage) {
        return this.damagesRepo.save(damage);
    }
    updateDamage(damage) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.damagesRepo.update({ damageId: damage.damageId, isActive: true }, damage);
            return result.affected ? result.affected > 0 : false;
        });
    }
    deleteDamage(damageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.damagesRepo.update({ damageId, isActive: true }, { isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
    getDamagesCount(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.damagesRepo.count({ where: { organizationId } });
        });
    }
};
DamageRepository = __decorate([
    (0, typedi_1.Service)()
], DamageRepository);
exports.DamageRepository = DamageRepository;
