import { ReactNode, createContext, useState } from "react";

import { UserAuthDTO } from "@dtos/user-auth.dto";

import { api } from "@services/api";

export type AuthContextDataProps = {
    user: UserAuthDTO;
    signIn: (email: string, password: string) => Promise<void>;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
    {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserAuthDTO>({} as UserAuthDTO);

    async function signIn(email: string, password: string) {
        try {
            const { data: user } = await api.post("/sessions", {
                email,
                password,
            });

            if (user.access_token) {
                setUser(user);
            }
        } catch (error) {
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}
