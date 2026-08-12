import { Role, AccountType } from "../enums/enums.js";
import { BuyerProfile } from "./BuyerProfile.js";
import { FarmerProfile } from "./FarmerProfile.js";
import { Category } from "./Category.js";
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: Role;
    accountType: AccountType;
    passwordResetToken: string | null;
    passwordResetTokenExpiresAt: Date | null;
    buyerProfile: BuyerProfile;
    farmerProfile: FarmerProfile;
    categories: Category[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=User.d.ts.map