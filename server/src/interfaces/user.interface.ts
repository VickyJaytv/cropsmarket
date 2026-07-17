export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PublicUserInterface = Omit<UserInterface, "password">;