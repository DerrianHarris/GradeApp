import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
	useNavigationState,
	useRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SemesterScreen from "../screens/SemesterScreen";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

import DummyData from "../Data/DummyData";
import ClassScreen from "../screens/ClassScreen";
import AssignmentScreen from "../screens/AssignmentScreen";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer linking={LinkingConfiguration}>
			<RootNavigator />
		</NavigationContainer>
	);
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<View style={{ flex: 1, flexDirection: "row" }}>
			<Stack.Navigator
				initialRouteName='Semesters'
				screenOptions={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { height: 95, backgroundColor: "#eae2b7" },
					headerLeft:
						navigation.dangerouslyGetState().index === 0
							? undefined
							: () => (
									<TouchableOpacity
										style={{
											marginLeft: 40,
											flexDirection: "row",
											alignItems: "center",
										}}
										onPress={() => {
											navigation.goBack();
										}}>
										<Ionicons
											name='chevron-back'
											size={32}
											color='black'
										/>
									</TouchableOpacity>
							  ),
				})}>
				<Stack.Screen name='Semesters' component={SemesterScreen} />
				<Stack.Screen name='Class' component={ClassScreen} />
				<Stack.Screen name='Assignments' component={AssignmentScreen} />
				<Stack.Screen
					name='NotFound'
					component={NotFoundScreen}
					options={{ title: "Oops!" }}
				/>
			</Stack.Navigator>
		</View>
	);
}
