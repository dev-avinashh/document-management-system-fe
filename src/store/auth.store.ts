import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Role {
  id: number;
  role: string;
  role_slug: string;
  home: string;
}

interface AuthState {
  token: string | null;
  userId: string | null;
  userName: string | null;
  mobileNumber: string | null;
  roles: Role[] | null;
  isAuthenticated: boolean;

  setAuthData: (data: {
    token: string;
    user_id: string;
    user_name: string;
    mobile: string;
    roles: Role[];
  }) => void;

  logout: () => void;
  getToken: () => string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      userId: null,
      userName: null,
      mobileNumber: null,
      roles: null,
      isAuthenticated: false,

      setAuthData: ({ token, user_id, user_name, mobile, roles }) =>
        set({
          token,
          userId: user_id,
          userName: user_name,
          mobileNumber: mobile,
          roles,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          token: null,
          userId: null,
          userName: null,
          mobileNumber: null,
          roles: null,
          isAuthenticated: false,
        }),

      getToken: () => get().token,
    }),
    {
      name: "auth-storage",
    }
  )
);
