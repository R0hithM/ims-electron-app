"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindProductItemsObj = exports.FindCategoriesObj = exports.FindProductsObj = void 0;
class FindProductsObj {
    constructor() {
        this.page = 1;
        this.pageSize = 20;
        this.sortBy = "productName";
        this.sortDir = "ASC";
    }
}
exports.FindProductsObj = FindProductsObj;
class FindCategoriesObj {
    constructor() {
        this.page = 1;
        this.pageSize = 20;
        this.sortBy = "categoryName";
        this.sortDir = "ASC";
    }
}
exports.FindCategoriesObj = FindCategoriesObj;
class FindProductItemsObj {
    constructor() {
        this.page = 1;
        this.pageSize = 20;
        this.sortBy = "itemName";
        this.sortDir = "ASC";
    }
}
exports.FindProductItemsObj = FindProductItemsObj;
