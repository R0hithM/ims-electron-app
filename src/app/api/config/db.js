"use strict";
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
exports.seedData = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../models/entities/user");
const testData_1 = require("../models/entities/testData");
const unit_1 = require("../models/entities/unit");
const quality_1 = require("../models/entities/quality");
const user_role_1 = require("../models/entities/user-role");
const user_group_1 = require("../models/entities/user-group");
const product_1 = require("../models/entities/product");
const product_category_1 = require("../models/entities/product-category");
const product_category_type_1 = require("../models/entities/product-category-type");
const tag_1 = require("../models/entities/tag");
const product_item_tags_1 = require("../models/entities/product-item-tags");
const product_item_1 = require("../models/entities/product-item");
const supplier_1 = require("../models/entities/supplier");
const customer_1 = require("../models/entities/customer");
const estimation_1 = require("../models/entities/estimation");
const sale_type_1 = require("../models/entities/sale-type");
const sale_1 = require("../models/entities/sale");
const return_1 = require("../models/entities/return");
const refund_1 = require("../models/entities/refund");
const damage_1 = require("../models/entities/damage");
const credit_note_1 = require("../models/entities/credit-note");
const organization_1 = require("../models/entities/organization");
const purchase_1 = require("../models/entities/purchase");
const transaction_1 = require("../models/entities/transaction");
const sale_item_1 = require("../models/entities/sale-item");
const estimation_item_1 = require("../models/entities/estimation-item");
const purchase_item_1 = require("../models/entities/purchase-item");
const return_item_1 = require("../models/entities/return-item");
const return_invoice_1 = require("../models/entities/return-invoice");
const organization_type_1 = require("../models/entities/organization-type");
const dbConfig = new typeorm_1.DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    entities: [
        organization_1.Organization,
        user_1.User,
        user_role_1.UserRole,
        user_group_1.UserGroup,
        testData_1.TestData,
        unit_1.Unit,
        quality_1.Quality,
        product_1.Product,
        product_category_1.ProductCategory,
        product_category_type_1.ProductCategoryType,
        tag_1.Tag,
        product_item_tags_1.ProductItemTag,
        product_item_1.ProductItem,
        supplier_1.Supplier,
        customer_1.Customer,
        estimation_1.Estimation,
        sale_type_1.SaleType,
        sale_1.Sale,
        return_1.Return,
        refund_1.Refund,
        damage_1.Damage,
        credit_note_1.CreditNote,
        purchase_1.Purchase,
        transaction_1.Transaction,
        sale_item_1.SaleItem,
        estimation_item_1.EstimationItem,
        purchase_item_1.PurchaseItem,
        return_item_1.ReturnItem,
        return_invoice_1.ReturnedInvoice,
        organization_type_1.OrganizationType
    ],
    logging: false
});
function seedData() {
    return __awaiter(this, void 0, void 0, function* () {
        const organizationTypeRepo = dbConfig.getRepository(organization_type_1.OrganizationType);
        const existingOrganizationTypes = yield organizationTypeRepo.count();
        if (existingOrganizationTypes === 0) {
            const organizationTypes = [
                { organizationTypeId: 1, organizationTypeName: 'Tiles' },
                { organizationTypeId: 2, organizationTypeName: 'Sanitary' },
                { organizationTypeId: 3, organizationTypeName: 'Tiles & Sanitary' },
                { organizationTypeId: 4, organizationTypeName: 'Electricals' },
                { organizationTypeId: 5, organizationTypeName: 'Electronics' },
                { organizationTypeId: 6, organizationTypeName: 'Plumbing' },
                { organizationTypeId: 7, organizationTypeName: 'Cement' },
                { organizationTypeId: 8, organizationTypeName: 'Rice Mill' },
                { organizationTypeId: 9, organizationTypeName: 'Fertilizers' },
                { organizationTypeId: 10, organizationTypeName: 'Cosmetics' },
                { organizationTypeId: 11, organizationTypeName: 'Oil Mill' },
                { organizationTypeId: 12, organizationTypeName: 'Others' }
            ];
            yield organizationTypeRepo.save(organizationTypes);
            console.log("Organization Types seeded successfully");
        }
    });
}
exports.seedData = seedData;
exports.default = dbConfig;
