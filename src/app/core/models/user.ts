export class User {
  id!: number;
  img!: string;
  username!: string;
  firstName!: string;
  lastName!: string;
  token!: string;
}

export class IUser {
  userName!: string;
  password!: string;
  createdAt!: string;
  userId!: string;
  id!: string;
  firstName?: string;
  lastName?: string;
  img?: string
}