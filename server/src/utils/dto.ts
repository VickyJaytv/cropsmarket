export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}
