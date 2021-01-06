import React, { useState } from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet, Button, Animated } from "react-native";
import { TouchableOpacity, RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-swipeable-row";

const TouchableButtonComponent = (props: any) => {
	const [swiping, setswiping] = useState(false);

	useEffect(() => {
		props.onSwipe(swiping);
	}, [swiping]);

	const rightButtons = [
		<TouchableOpacity
			style={{
				backgroundColor: "red",
				justifyContent: "center",
				height: "100%",
			}}>
			<Text style={{ fontSize: 25, fontWeight: "600" }}>Delete</Text>
		</TouchableOpacity>,
	];

	const leftButtons = [
		<TouchableOpacity
			style={{
				backgroundColor: "green",
				justifyContent: "center",
				alignItems: "flex-end",
				height: "100%",
			}}>
			<Text style={{ fontSize: 25, fontWeight: "600" }}>Edit</Text>
		</TouchableOpacity>,
	];

	return (
		<View style={{ borderBottomWidth: 1 }}>
			<Swipeable
				rightButtons={rightButtons}
				rightButtonWidth={100}
				onRightActionComplete={() => {
					props.onDelete();
				}}
				rightActionActivationDistance={300}
				leftButtons={leftButtons}
				leftButtonWidth={75}
				onLightActionRelease={() => {
					console.log("Editing...");
				}}
				lightActionActivationDistance={50}
				onSwipeStart={() => setswiping(true)}
				onSwipeStop={() => setswiping(false)}>
				<RectButton
					style={props.style || styles.button}
					onPress={() => {
						if (!swiping) {
							props.onPress();
						}
					}}>
					{props.Component}
				</RectButton>
			</Swipeable>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		height: 75,
		marginHorizontal: 5,
		alignItems: "flex-end",
		justifyContent: "space-between",
		flexDirection: "row",
		paddingLeft: 40,
		paddingRight: 20,
		borderColor: "black",
	},
	rightAction: {},
	actionText: {},
});

export default TouchableButtonComponent;
