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
