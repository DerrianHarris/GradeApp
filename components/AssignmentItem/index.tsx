import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { Props } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	TouchableHighlight,
	TouchableOpacity,
} from "react-native-gesture-handler";
import { Assignment } from "../../types";
import TouchableButtonComponent from "../TouchableButtonComponent";

export type AssignmentItemProps = {
	data: Assignment;
	onDelete: any;
	onSwipe: any;
	onEdit: any;
};

const AssignmentItem = (props: AssignmentItemProps) => {
	const { data, onDelete, onSwipe, onEdit } = props;
	return (
		<TouchableButtonComponent
			onPress={() => {}}
			onDelete={onDelete}
			onSwipe={onSwipe}
			onEdit={onEdit}
			data={data}
			component={
				<View style={styles.container}>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "700",
							textAlignVertical: "center",
						}}>
						{data.name}
					</Text>
					<View>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "600",
								textAlignVertical: "center",
							}}>
							{data.gainedPoints + "/" + data.possiblePoints}
						</Text>
					</View>

					<Text
						style={{
							fontSize: 20,
							fontWeight: "600",
							textAlignVertical: "center",
						}}>
						{data.grade + "%"}
					</Text>

					{!data.completed ? (
						<Ionicons
							name='md-checkmark-done-circle-sharp'
							size={32}
							color={"#0ead69"}
						/>
					) : (
						<MaterialIcons
							name='cancel'
							size={32}
							color={"#bc412b"}
						/>
					)}
				</View>
			}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 75,
	},
	gpa: {
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
		width: 60,
		height: 60,
		borderRadius: 10,
		paddingVertical: 6,
	},
});

export default AssignmentItem;
