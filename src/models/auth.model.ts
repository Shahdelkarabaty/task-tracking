export enum userRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
}

export type userAuth = {
  email: string;
  password: string;
};

export type User = {
  email: string;
  role: userRole;
  token: string;
};

export type Token = {
  role: userRole;
  expire: number;
  issuedAt: number;
};

export type loginResponse = {
  message: string;
  accessToken: string;
};
