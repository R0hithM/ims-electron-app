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
const estimation_1 = require("../models/entities/estimation");
const estimation_item_1 = require("../models/entities/estimation-item");
let EstimationRepository = class EstimationRepository {
    constructor() {
        this.estimationRepo = db_1.default.getRepository(estimation_1.Estimation);
        this.estimationItemRepo = db_1.default.getRepository(estimation_item_1.EstimationItem);
    }
    getAllEstimations(organizationId) {
        return this.estimationRepo.find({ where: { organizationId, isActive: true }, relations: { customer: true }, order: { createdAt: "DESC" } });
    }
    getEstimationById(estimationId) {
        return this.estimationRepo.findOneBy({ estimationId, isActive: true });
    }
    createEstimation(estimation) {
        return this.estimationRepo.save(estimation);
    }
    updateEstimation(estimation) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.estimationRepo.update({ estimationId: estimation.estimationId, isActive: true }, estimation);
            return result.affected ? result.affected > 0 : false;
        });
    }
    updateEstimationToSale(estimationId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.estimationRepo.update({ estimationId, isActive: true, updatedBy: userId }, { isAccepted: true, acceptedDate: new Date(), isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
    deleteEstimation(estimationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.estimationRepo.update({ estimationId, isActive: true }, { isActive: false });
            return result.affected ? result.affected > 0 : false;
        });
    }
    getEstimationsCount(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.estimationRepo.count({ where: { organizationId } });
        });
    }
    createEstimationItems(estimationItems) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.estimationItemRepo.save(estimationItems);
        });
    }
    getEstimationByInvoiceId(invoiceId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.estimationRepo.findOne({
                where: { invoiceId, organizationId, isActive: true },
                relations: {
                    estimationItems: {
                        item: {
                            categoryTypeInfo: true
                        }
                    },
                    customer: true,
                    user: {
                        organization: true
                    }
                }
            });
        });
    }
};
EstimationRepository = __decorate([
    (0, typedi_1.Service)()
], EstimationRepository);
exports.default = EstimationRepository;
