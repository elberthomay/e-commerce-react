export type CurrentUserOutputType =
  | Record<string, never>
  | {
      id: string;
      name: string;
      email: string;
      privilege: number;
      avatar: string | null;
      selectedAddressId: string | null;
      cartCount: number;
    };

export interface UserUpdateType {
  name: string;
}

export interface UserRegisterType {
  email: string;
  password: string;
  name: string;
}

export interface UserLoginType {
  email: string;
  password: string;
  rememberMe: boolean;
}
