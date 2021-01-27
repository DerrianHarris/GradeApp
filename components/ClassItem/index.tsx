import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getClass, getSection } from "../../graphql/queries";
import { Class } from "../../types";
import { CalClassGrade, CalcSectionGrade, getData } from "../../Utils";
import TouchableButtonComponent from "../TouchableButtonComponent";

export type ClassItemProps = {
	data: Class;
	onDelete: any;
	onSwipe: any;
	onEdit: any;
};

const ClassItem = (props: ClassItemProps) => {
	const navigation = useNavigation();
	const { data, onDelete, onSwipe, onEdit } = props;
	const userId = data.userId;
	const classId = data.id;

	const [grade, setGrade] = useState(0);

	useEffect(() => {
		const getDataFunc = async () => {
			setGrade(await CalClassGrade(classId));
		};
		getDataFunc();
	});

	return (
		<TouchableButtonComponent
			onPress={() => {
				navigation.navigate("Sections", {
					classId,
					userId,
				});
			}}
			onDelete={onDelete}
			onSwipe={onSwipe}
			onEdit={onEdit}
			data={data}
			component={
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "flex-end",
						justifyContent: "space-between",
					}}>
					<Text style={{ fontSize: 32, fontWeight: "700" }}>
						{data.name}
					</Text>
					<View>
						<Text
							style={{
								textAlign: "center",
								fontSize: 20,
								fontWeight: "700",
							}}>
							Grade
						</Text>
						<Text
							style={{
								textAlign: "center",
								fontSize: 32,
								fontWeight: "500",
							}}>
							{grade.toPrecision(3) + "%"}
						</Text>
					</View>
				</View>
			}
		/>
	);
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
