import { ReactNode, createContext, useEffect, useState } from "react";

import { api } from "@services/api";

import {
    storageAuthTokenSave,
    storageAuthTokenRemove,
    storageAuthTokenGet,
} from "@storage/storageAuthToken";
import { UserDTO } from "@dtos/user.dto";
import {
    storageUserGet,
    storageUserRemove,
    storageUserSave,
} from "@storage/storageUser";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
    {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
        useState<boolean>(true);

    async function userAndTokenUpdate(user: UserDTO, accessToken: string) {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        setUser(user);
    }

    async function storageUserAndTokenSave(userData: UserDTO, token: string) {
        try {
            setIsLoadingUserStorageData(true);
            await storageUserSave(userData);
            await storageAuthTokenSave(token);
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post("/sessions", {
                email,
                password,
            });

            if (data.user && data.access_token) {
                await storageUserAndTokenSave(data.user, data.access_token);
                userAndTokenUpdate(data.user, data.access_token);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function signOut() {
        try {
            setIsLoadingUserStorageData(true);
            setUser({} as UserDTO);
            await storageUserRemove();
            await storageAuthTokenRemove();
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function loadUserData() {
        try {
            setIsLoadingUserStorageData(true);

            const userLogged = await storageUserGet();
            const token = await storageAuthTokenGet();

            if (token && userLogged) {
                userAndTokenUpdate(userLogged, token);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, signIn, signOut, isLoadingUserStorageData }}
        >
            {children}
        </AuthContext.Provider>
    );
}
