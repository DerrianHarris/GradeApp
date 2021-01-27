import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Semester } from "../../types";
import { CalcGpa } from "../../Utils";
import TouchableButtonComponent from "../TouchableButtonComponent";

export type ScreenItemProps = {
	data: Semester;
	onDelete: any;
	onSwipe: any;
	onEdit: any;
};

const SemesterItem = (props: ScreenItemProps) => {
	const navigation = useNavigation();
	const { data, onDelete, onSwipe, onEdit } = props;
	const userId = data.userId;
	const semesterId = data.id;

	const [gpa, setGpa] = useState(0);

	useEffect(() => {
		const getDataFunc = async () => {
			setGpa(await CalcGpa(semesterId));
		};
		getDataFunc();
	}, [data]);

	return (
		<TouchableButtonComponent
			onPress={() => {
				navigation.navigate("Classes", {
					userId,
					semesterId,
				});
			}}
			onDelete={onDelete}
			onSwipe={onSwipe}
			onEdit={onEdit}
			data={data}
			component={
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
							{gpa}
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
		paddingVertical: 6,
		marginRight: 20,
		marginBottom: 1,
	},
});

export default SemesterItem;
