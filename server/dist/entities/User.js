var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, } from "typeorm";
import { Role } from "../enums/role.enum.js";
let User = class User {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    Column({ type: "varchar", unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ type: "varchar", unique: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({ type: "enum", enum: Role, default: Role.BUYER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    Column({ type: "varchar", default: null }),
    __metadata("design:type", String)
], User.prototype, "passwordResetToken", void 0);
__decorate([
    Column({ type: "datetime", nullable: true, default: null }),
    __metadata("design:type", Object)
], User.prototype, "passwordResetTokenExpiresAt", void 0);
__decorate([
    Column({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isLoggedIn", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    Entity()
], User);
export { User };
//# sourceMappingURL=User.js.map