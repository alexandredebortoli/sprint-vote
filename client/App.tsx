import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { ThemeProvider } from "styled-components";
import { StatusBar } from "react-native";

import { Routes } from "@routes/index";

import theme from "@theme/index";

import Loading from "@components/Loading";
import { AuthContextProvider } from "@contexts/AuthContext";

export default function App() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
    });

    return (
        <ThemeProvider theme={theme}>
            <>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                    translucent
                />
                <AuthContextProvider>
                    {fontsLoaded ? <Routes /> : <Loading />}
                </AuthContextProvider>
            </>
        </ThemeProvider>
    );
}
