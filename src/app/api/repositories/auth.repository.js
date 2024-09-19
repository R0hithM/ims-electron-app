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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const db_1 = __importDefault(require("../config/db"));
const user_1 = require("../models/entities/user");
const bcrypt = __importStar(require("bcrypt"));
let AuthRepository = class AuthRepository {
    constructor() {
        this.usersRepo = db_1.default.getRepository(user_1.User);
    }
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.usersRepo.findOne({ where: { email: user.email } });
            if (existingUser) {
                throw new Error('Email is already registered');
            }
            user.password = yield this.encryptPassword(user.password);
            const newUser = yield this.usersRepo.save(user);
            const { password } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
            return userWithoutPassword;
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepo.findOne({ where: { email } });
            // Check if the user exists and the password is correct
            if (user && (yield this.verifyPassword(password, user.password))) {
                return user;
            }
            return null;
        });
    }
    changeUserPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const encryptPassword = yield this.encryptPassword(password);
            const result = yield this.usersRepo.update({ email }, { password: encryptPassword });
            return result.affected ? result.affected > 0 : false;
        });
    }
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.hash(password, 10);
        });
    }
    verifyPassword(inputPassword, storedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(inputPassword, storedPassword);
        });
    }
};
AuthRepository = __decorate([
    (0, typedi_1.Service)()
], AuthRepository);
exports.default = AuthRepository;
