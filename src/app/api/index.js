"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const express_1 = __importDefault(require("express"));
const DotEnv = __importStar(require("dotenv"));
DotEnv.config();
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./config/db"));
const db_2 = require("./config/db");
const cors_1 = __importDefault(require("./middleware/cors"));
const swagger_1 = __importDefault(require("./middleware/swagger"));
const errors_1 = __importDefault(require("./middleware/errors"));
const auth_1 = require("./middleware/auth");
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const organization_router_1 = __importDefault(require("./routes/organization.router"));
const upload_router_1 = __importDefault(require("./routes/upload.router"));
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
cors_1.default.setup(app);
swagger_1.default.setup(app);
const authMiddleware = auth_1.AuthMiddleware.setup();
app.use("/api/auth", auth_router_1.default);
app.use("/api/organizations", organization_router_1.default);
app.use("/api/uploads", upload_router_1.default);
app.use("/api", authMiddleware, routes_1.default);
//Call Error Middleware
errors_1.default.setup(app);
db_1.default.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Data Source has been initialized! Started the server now ....");
    yield (0, db_2.seedData)();
    app.listen(PORT, () => console.log("Server is running on port", PORT));
})).catch((err) => {
    console.log("Server startup failed. Error during Data Source initialization: ", err);
});
