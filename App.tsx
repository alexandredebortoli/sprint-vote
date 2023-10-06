import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { ThemeProvider } from "styled-components";
import { ActivityIndicator, View } from "react-native";

import theme from "@theme/index";

export default function App() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
    });

    return (
        <ThemeProvider theme={theme}>
            {fontsLoaded ? <View /> : <ActivityIndicator />}
        </ThemeProvider>
    );
}
