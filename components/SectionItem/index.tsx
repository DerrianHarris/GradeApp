import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getSection } from "../../graphql/queries";
import { Section } from "../../types";
import { CalcSectionGrade, getData } from "../../Utils";
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
	const userId = data.userId;
	const sectionId = data.id;

	const [assignmentCount, setAssignmentCount] = useState(0);
	const [grade, setGrade] = useState(0);

	useEffect(() => {
		const getDataFunc = async () => {
			const data = await getData(sectionId, getSection);
			setAssignmentCount(data.data.getSection.assignments.items.length);
			setGrade(await CalcSectionGrade(sectionId));
		};
		getDataFunc();
	});

	return (
		<TouchableButtonComponent
			onPress={() => {
				navigation.navigate("Assignments", {
					sectionId,
					userId,
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
							{assignmentCount >= 0
								? assignmentCount == 1
									? assignmentCount + " assignment"
									: assignmentCount + " assignment(s)"
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
							{grade.toPrecision(3) + "%"}
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
});

export default SectionItem;
