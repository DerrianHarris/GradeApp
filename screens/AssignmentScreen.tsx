import React, { useEffect, useLayoutEffect, useState } from "react";
import {
	View,
	StyleSheet,
	Modal,
	Text,
	Button,
	KeyboardAvoidingView,
} from "react-native";
import {
	FlatList,
	TouchableOpacity,
	TextInput,
	Switch,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AssignmentItem from "../components/AssignmentItem";
import SegmentedControl from "@react-native-community/segmented-control";

const AssignmentScreen = ({ navigation, route }: any) => {
	const assignmentNamePlaceholderText = "Assignment Name";
	const pointsGradedPlaceholderText = "0";
	const pointsPossiblePlaceholderText = "0";

	const [modalVisible, setModalVisible] = useState(false);
	const [assingnmentValue, onChangeAssingnmentValueText] = useState("");

	const [pointsGradedValue, onChangePointsGradedValueText] = useState("");
	const [pointsPossibleValue, onChangepointsPossibleValueText] = useState("");

	const [selectedIndex, setSelectedIndex] = useState(false);

	const [gradeValue, setGradeValue] = useState(0);

	const { data } = route.params;

	useEffect(() => {
		setGradeValue(
			Number(pointsPossibleValue) <= 0
				? Number(pointsGradedValue)
				: (Number(pointsGradedValue) / Number(pointsPossibleValue)) *
						100
		);
	}, [pointsGradedValue, pointsPossibleValue]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{ marginRight: 40 }}
					onPress={() => {
						setModalVisible(true);
					}}>
					<Ionicons name='md-add-outline' size={32} color='black' />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={({ item, index }) => <AssignmentItem data={item} />}
				keyExtractor={(item, index) => index.toString()}
				style={styles.list}
			/>
			<Modal
				animationType='fade'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					alert("Modal has been closed.");
				}}>
				<KeyboardAvoidingView
					behavior='padding'
					style={styles.centeredView}>
					<View style={styles.modalView}>
						<View
							style={{
								alignSelf: "flex-start",
								width: "100%",
							}}>
							<Text
								style={{
									alignSelf: "center",
									fontSize: 20,
									paddingTop: 10,
									fontWeight: "700",
								}}>
								Add New Assignment
							</Text>
							<TextInput
								style={{
									height: 30,
									borderBottomWidth: 1,
								}}
								onChangeText={(text) =>
									onChangeAssingnmentValueText(text)
								}
								placeholder={assignmentNamePlaceholderText}
								placeholderTextColor={"rgba(0,0,0,0.5)"}
								value={assingnmentValue}
							/>

							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
								}}>
								<View
									style={{
										alignItems: "center",
										justifyContent: "center",
									}}>
									<Text
										style={{
											fontSize: 17,
											paddingTop: 10,
											fontWeight: "700",
										}}>
										Points Gained
									</Text>
									<TextInput
										style={{
											height: 40,
											width: 60,
											borderWidth: 1,
										}}
										keyboardType='number-pad'
										onChangeText={(text) => {
											onChangePointsGradedValueText(text);
										}}
										textAlign='center'
										placeholder={"0"}
										placeholderTextColor={"rgba(0,0,0,0.8)"}
										value={pointsGradedValue}
									/>
								</View>
								<Text
									style={{
										justifyContent: "center",
										alignSelf: "center",
										textAlign: "center",
										textAlignVertical: "center",
										fontSize: 50,
										marginTop: 20,
										paddingHorizontal: 5,
									}}>
									/
								</Text>
								<View
									style={{
										alignItems: "center",
										justifyContent: "center",
									}}>
									<Text
										style={{
											fontSize: 17,
											paddingTop: 10,
											fontWeight: "700",
										}}>
										Points Possible
									</Text>
									<TextInput
										style={{
											height: 40,
											width: 60,
											borderWidth: 1,
										}}
										keyboardType='number-pad'
										onChangeText={(text) => {
											onChangepointsPossibleValueText(
												text
											);
										}}
										textAlign='center'
										placeholder={
											pointsGradedPlaceholderText
										}
										placeholderTextColor={"rgba(0,0,0,0.8)"}
										value={pointsPossibleValue}
									/>
								</View>
							</View>
							<View
								style={{
									justifyContent: "center",
									alignItems: "center",
									paddingVertical: 20,
								}}>
								<Text
									style={{ fontSize: 20, fontWeight: "700" }}>
									Grade
								</Text>
								<Text
									style={{ fontSize: 20, fontWeight: "700" }}>
									{gradeValue +
										(Number(pointsPossibleValue) <= 0
											? ""
											: "%")}
								</Text>
							</View>

							<SegmentedControl
								values={["Completed", "Predicted"]}
								selectedIndex={selectedIndex}
								onChange={(event) => {
									setSelectedIndex(
										event.nativeEvent.selectedSegmentIndex
									);
									console.log(selectedIndex);
								}}
								tintColor='black'
							/>

							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									height: 50,
									paddingTop: 10,
								}}>
								<Button
									title='Close'
									onPress={() => {
										onChangePointsGradedValueText("");
										onChangepointsPossibleValueText("");
										onChangeAssingnmentValueText("");
										setSelectedIndex(0);
										setModalVisible(false);
									}}>
									<Text>Close</Text>
								</Button>
								<Button
									title='Done'
									onPress={() => {
										onChangePointsGradedValueText("");
										onChangepointsPossibleValueText("");
										onChangeAssingnmentValueText("");
										setSelectedIndex(0);
										setModalVisible(false);
									}}>
									<View>
										<Text>Done</Text>
									</View>
								</Button>
							</View>
						</View>
					</View>
				</KeyboardAvoidingView>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	list: {
		width: "100%",
		height: "100%",
		backgroundColor: "white",
		paddingVertical: 1,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		width: "80%",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});

export default AssignmentScreen;
