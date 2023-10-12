import { ReactNode, createContext, useEffect, useState } from "react";

import { api } from "@services/api";

import {
    storageAuthTokenSave,
    storageAuthTokenRemove,
    storageAuthTokenGet,
} from "@storage/storageAuthToken";

export type AuthContextDataProps = {
    token: string;
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
    const [token, setToken] = useState<string>("");
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
        useState<boolean>(true);

    async function tokenUpdate(accessToken: string) {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        setToken(accessToken);
    }

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post("/sessions", {
                email,
                password,
            });

            if (data.access_token) {
                setIsLoadingUserStorageData(true);

                await storageAuthTokenSave(data.access_token);

                tokenUpdate(data.access_token);
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

            setToken("");
            await storageAuthTokenRemove();
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function loadAuthTokenData() {
        try {
            setIsLoadingUserStorageData(true);

            const accessToken = await storageAuthTokenGet();

            if (!!accessToken) {
                tokenUpdate(accessToken);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    useEffect(() => {
        loadAuthTokenData();
    }, []);

    return (
        <AuthContext.Provider
            value={{ token, signIn, signOut, isLoadingUserStorageData }}
        >
            {children}
        </AuthContext.Provider>
    );
}
