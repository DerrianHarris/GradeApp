import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { withAuthenticator } from "aws-amplify-react-native";

import { getUser } from "./graphql/queries";
import { createUser } from "./graphql/mutations";

import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	useEffect(() => {
		const fetchUser = async () => {
			const userInfo = await Auth.currentAuthenticatedUser({
				bypassCache: true,
			});
			if (userInfo) {
				const userData = await API.graphql(
					graphqlOperation(getUser, { id: userInfo.attributes.sub })
				);
				if (userData.data.getUser) {
					console.log("User has already registered in database");
					return;
				}
				const newUser = {
					id: userInfo.attributes.sub,
					name: userInfo.attributes.email,
				};

				await API.graphql(
					graphqlOperation(createUser, { input: newUser })
				);
			}
		};
		fetchUser();
	}, []);

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<Navigation colorScheme={colorScheme} />
				<StatusBar />
			</SafeAreaProvider>
		);
	}
}

export default withAuthenticator(App);
