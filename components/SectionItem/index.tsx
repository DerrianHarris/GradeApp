import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Section } from "../../types";
import TouchableButtonComponent from "../TouchableButtonComponent";

export type ScreenItemProps = {
	data: Section;
	onDelete: any;
	onSwipe: any;
	onEdit: any;
};

const SectionItem = (props: ScreenItemProps) => {
	const navigation = useNavigation();
	const { data, onDelete, onSwipe, onEdit } = props;
	console.log("Rendering Section Item");
	console.log(data);
	return (
		<TouchableButtonComponent
			onPress={() => {
				navigation.navigate("Assignments", {
					sectionId: data.id,
					userId: data.userId,
				});
				//navigation.navigate("Class", { data });
			}}
			data={data}
			onDelete={onDelete}
			onSwipe={onSwipe}
			onEdit={onEdit}
			component={
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "flex-end",
						justifyContent: "space-between",
					}}>
					<View
						style={{
							justifyContent: "flex-start",
							alignItems: "center",
							flexDirection: "column",
						}}>
						<Text style={{ fontSize: 32, fontWeight: "700" }}>
							{data.name}
						</Text>
						<Text
							style={{
								fontSize: 15,
								fontWeight: "500",
							}}>
							{data?.assignments?.length
								? data.assignments.length
								: 0 + " assignment(s)"}
						</Text>
					</View>
					<View>
						<Text
							style={{
								fontSize: 22,
								fontWeight: "700",
							}}>
							Grade
						</Text>

						<Text style={{ fontSize: 32, fontWeight: "500" }}>
							{calcGrade().toString() + "%"}
						</Text>
					</View>
				</View>
			}
		/>
	);
};

const calcGrade = () => {
	return 100;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default SectionItem;
