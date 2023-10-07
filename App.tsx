import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { ThemeProvider } from "styled-components";
import { StatusBar } from "react-native";

import theme from "@theme/index";

import Loading from "@components/Loading";

import Teams from "@screens/Teams";
import NewTeam from "@screens/NewTeam";
import Team from "@screens/Team";

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
                {fontsLoaded ? <Team /> : <Loading />}
            </>
        </ThemeProvider>
    );
}
