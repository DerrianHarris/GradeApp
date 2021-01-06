import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { withAuthenticator } from "aws-amplify-react-native";

import Amplify from "@aws-amplify/core";

import { DataStore } from "@aws-amplify/datastore";
import { User } from "./models";

import awsconfig from "./aws-exports";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { getUser } from "./graphql/queries";
import { createUser } from "./graphql/mutations";

Amplify.configure({
	...awsconfig,
	Analytics: {
		disabled: true,
	},
});

function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();
	useEffect(() => {
		const fetchUser = async () => {
			const userInfo = await Auth.currentAuthenticatedUser({
				bypassCache: true,
			});
			userId = userInfo.attributes.sub;
			console.log("UserId: " + userId);
			if (userInfo) {
				const userData = await API.graphql(
					graphqlOperation(getUser, { id: userId })
				);
				if (userData.data.getUser) {
					console.log("User has already registered in database");
					return;
				}
				const newUser = {
					id: userId,
					email: userInfo.attributes.email,
				};
				try {
					await API.graphql(
						graphqlOperation(createUser, { input: newUser })
					);
					console.log(userData);
				} catch (e) {
					console.log(e);
				}
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
