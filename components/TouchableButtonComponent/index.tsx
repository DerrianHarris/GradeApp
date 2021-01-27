import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity, RectButton } from "react-native-gesture-handler";

import Swipeable from "react-native-gesture-handler/Swipeable";

const TouchableButtonComponent = (props: any) => {
	const [swiping, setSwiping] = useState(false);

	useEffect(() => {
		props.onSwipe(swiping);
	}, [swiping]);

	const SwipeableBttn = useRef(null);

	const { data, onDelete, onEdit, onPress, component } = props;

	const rightButton = (progress, dragX) => {
		return (
			<View
				style={{
					justifyContent: "center",
					width: "45%",
				}}>
				<TouchableOpacity
					style={{
						backgroundColor: "#BC412B",
						height: "100%",
						justifyContent: "center",
					}}
					onPress={() => {
						SwipeableBttn.current.close();
						console.log("data");
						console.log(data);
						console.log(data.id);
						onDelete(data.id);
					}}>
					<Text
						style={{
							color: "white",
							fontWeight: "600",
							fontSize: 22,
							padding: 20,
						}}>
						Tap To Delete
					</Text>
				</TouchableOpacity>
			</View>
		);
	};

	const Edit = () => {
		SwipeableBttn.current.close();
		onEdit(data.id);
	};

	const leftButton = (progress, dragX) => {
		return (
			<View
				style={{
					justifyContent: "center",
					width: "100%",
					flex: 1,
				}}>
				<TouchableOpacity
					style={{
						backgroundColor: "#0ead69",
						height: "100%",
						justifyContent: "center",
					}}
					onPress={() => {
						Edit();
					}}>
					<Text
						style={{
							color: "white",
							fontWeight: "600",
							fontSize: 22,
							padding: 20,
						}}>
						Edit
					</Text>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<Swipeable
			ref={SwipeableBttn}
			renderRightActions={rightButton}
			renderLeftActions={leftButton}
			leftThreshold={150}
			rightThreshold={100}
			friction={1}
			overshootRight={false}
			onSwipeableLeftOpen={() => {
				Edit();
			}}>
			<View
				style={{
					backgroundColor: "white",
				}}>
				<RectButton
					style={props.style || styles.button}
					onPress={() => {
						if (!swiping) {
							onPress();
						}
					}}>
					{component}
				</RectButton>
			</View>
		</Swipeable>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: "flex-end",
		justifyContent: "space-between",
		flexDirection: "row",
		paddingLeft: 40,
		paddingRight: 20,
	},
	rightAction: {},
	actionText: {},
});

export default TouchableButtonComponent;
