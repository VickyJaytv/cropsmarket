import { AccountType } from "../enums/enums.js";
import { BuyerProfile } from "./BuyerProfile.js";
import { FarmerProfile } from "./FarmerProfile.js";
export declare class User {
    id: number;
    buyerProfile: BuyerProfile;
    farmerProfile: FarmerProfile;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
    AccountType: AccountType;
    passwordResetToken: string | null;
    passwordResetTokenExpiresAt: Date | null;
    isLoggedIn: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=User.d.ts.map