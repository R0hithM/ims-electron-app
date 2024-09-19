"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransactionsObj = void 0;
class GetTransactionsObj {
    constructor() {
        this.page = 1;
        this.pageSize = 20;
        this.sortBy = "transactionDate";
        this.sortDir = "DESC";
    }
}
exports.GetTransactionsObj = GetTransactionsObj;
