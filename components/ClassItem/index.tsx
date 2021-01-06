import { useNavigation } from "@react-navigation/native";
import React, { Props } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	TouchableHighlight,
	TouchableOpacity,
} from "react-native-gesture-handler";
import { Class } from "../../types";
import TouchableButtonComponent from "../TouchableButtonComponent";

export type ClassItemProps = {
	data: Class;
	onSwipe: any;
};

const ClassItem = (props: ClassItemProps) => {
	const navigation = useNavigation();
	const { data } = props;
	return (
		<TouchableButtonComponent
			onPress={() => {
				//navigation.navigate("Assignments", { data: data.Assignments });
			}}
			onSwipe={props.onSwipe}
			Component={
				<View style={{ flexDirection: "row" }}>
					<Text style={{ fontSize: 32, fontWeight: "700" }}>
						{data.name}
					</Text>
					<View>
						<Text style={{ fontSize: 32, fontWeight: "700" }}>
							Grade
						</Text>
						<Text style={{ fontSize: 32, fontWeight: "700" }}>
							{calcGrade().toString()}
						</Text>
					</View>
				</View>
			}
		/>
	);
};

const calcGrade = async () => {
	return 100;
};

const styles = StyleSheet.create({
	gpa: {
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
		width: 60,
		height: 60,
		borderRadius: 10,
		paddingVertical: 6,
	},
});

export default ClassItem;
