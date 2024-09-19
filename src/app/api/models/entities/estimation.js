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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estimation = void 0;
const typeorm_1 = require("typeorm");
const customer_1 = require("./customer");
const user_1 = require("./user");
const estimation_item_1 = require("./estimation-item");
let Estimation = class Estimation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "estimation_id" }),
    __metadata("design:type", String)
], Estimation.prototype, "estimationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_id' }),
    __metadata("design:type", String)
], Estimation.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id" }),
    __metadata("design:type", String)
], Estimation.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "customer_id" }),
    __metadata("design:type", String)
], Estimation.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sub_total', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Estimation.prototype, "subTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Estimation.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'weight', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Estimation.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'loading_charges', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Estimation.prototype, "loadingCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unloading_charges', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Estimation.prototype, "unloadingCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transport_charges', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Estimation.prototype, "transportCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "estimated_price", type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Estimation.prototype, "estimatedPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "estimation_date" }),
    __metadata("design:type", Date)
], Estimation.prototype, "estimationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_accepted" }),
    __metadata("design:type", Boolean)
], Estimation.prototype, "isAccepted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "accepted_date" }),
    __metadata("design:type", Date)
], Estimation.prototype, "acceptedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization_id" }),
    __metadata("design:type", String)
], Estimation.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Estimation.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Estimation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Estimation.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by" }),
    __metadata("design:type", String)
], Estimation.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by" }),
    __metadata("design:type", String)
], Estimation.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_1.User, user => user.userId),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_1.User)
], Estimation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => customer_1.Customer, customer => customer.customerId),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id', referencedColumnName: 'customerId' }),
    __metadata("design:type", customer_1.Customer)
], Estimation.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => estimation_item_1.EstimationItem, estimationItem => estimationItem.estimation),
    (0, typeorm_1.JoinColumn)({ name: 'estimation_id', referencedColumnName: 'estimationId' }),
    __metadata("design:type", Array)
], Estimation.prototype, "estimationItems", void 0);
Estimation = __decorate([
    (0, typeorm_1.Entity)("estimations")
], Estimation);
exports.Estimation = Estimation;
