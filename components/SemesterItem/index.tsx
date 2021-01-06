import { useNavigation, useRoute } from "@react-navigation/native";
import React, { Props } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	TouchableHighlight,
	TouchableOpacity,
} from "react-native-gesture-handler";
import { Semester } from "../../types";
import TouchableButtonComponent from "../TouchableButtonComponent";

export type ScreenItemProps = {
	data: Semester;
	onDelete: any;
	onSwipe: any;
};

const SemesterItem = (props: ScreenItemProps) => {
	const navigation = useNavigation();
	const { data } = props;

	return (
		<TouchableButtonComponent
			onPress={() => {
				navigation.navigate("Class", { data });
			}}
			onDelete={props.onDelete}
			onSwipe={props.onSwipe}
			Component={
				<View style={styles.container}>
					<Text
						style={{
							fontSize: 32,
							fontWeight: "700",
							alignSelf: "flex-end",
						}}>
						{data.name}
					</Text>
					<View style={styles.gpa}>
						<Text
							style={{
								fontSize: 20,
								color: "black",
								fontWeight: "600",
							}}>
							GPA
						</Text>
						<Text style={{ fontSize: 20, color: "black" }}>
							{data.gpaScale.toFixed(1)}
						</Text>
					</View>
				</View>
			}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	gpa: {
		alignItems: "center",
		borderRadius: 10,
		paddingVertical: 6,
		marginRight: 20,
		marginBottom: 1,
	},
});

export default SemesterItem;
