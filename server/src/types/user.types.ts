export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicUserInterface{
    id:string;
    name:string;
    email:string;
}
