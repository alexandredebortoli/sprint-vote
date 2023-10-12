import {
    NativeStackNavigationProp,
    createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Game from "@screens/Game";

import NewTeam from "@screens/NewTeam";
import Team from "@screens/Team";
import Teams from "@screens/Teams";

type AppRoutes = {
    teams: undefined;
    newTeam: undefined;
    team: { teamId: string; teamName: string };
    game: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
    return (
        <Navigator
            initialRouteName="teams"
            screenOptions={{ headerShown: false }}
        >
            <Screen
                name="teams"
                component={Teams}
            />
            <Screen
                name="newTeam"
                component={NewTeam}
            />
            <Screen
                name="team"
                component={Team}
            />
            <Screen
                name="game"
                component={Game}
            />
        </Navigator>
    );
}
