import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "@hooks/useAuth";

export function Routes() {
    const { COLORS } = useTheme();
    const { user } = useAuth();

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>
            <NavigationContainer>
                {user.access_token ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </View>
    );
}
