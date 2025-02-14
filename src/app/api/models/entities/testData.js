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
exports.TestData = void 0;
const typeorm_1 = require("typeorm");
let TestData = class TestData {
    // @OneToMany(() => DealParty, dealParty => dealParty.deal)
    // @JoinColumn({ name: "DealSummaryId", referencedColumnName: "dealSummaryId" }) 
    // dealPartyList!: DealParty[];
    // @ManyToOne(() => Stage, stg => stg.stage)
    // stageData!: Stage;
    setValues() {
        if (this.timestamp) {
            this.timestamp = new Date(this.timestamp);
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "Id" }),
    __metadata("design:type", Number)
], TestData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "Name" }),
    __metadata("design:type", String)
], TestData.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "Value" }),
    __metadata("design:type", Number)
], TestData.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "Timestamp", type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], TestData.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestData.prototype, "setValues", null);
TestData = __decorate([
    (0, typeorm_1.Entity)("test_data")
], TestData);
exports.TestData = TestData;
