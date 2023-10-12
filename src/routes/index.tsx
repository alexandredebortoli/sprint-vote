import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "@hooks/useAuth";
import Loading from "@components/Loading";

export function Routes() {
    const { COLORS } = useTheme();
    const { token, isLoadingUserStorageData } = useAuth();

    if (isLoadingUserStorageData) {
        return <Loading />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>
            <NavigationContainer>
                {!!token ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </View>
    );
}
