import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Button, KeyboardAvoidingView } from "react-native";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AssignmentItem from "../components/AssignmentItem";
import SegmentedControl from "@react-native-community/segmented-control";
import {
	createAssignment,
	deleteAssignment,
	updateAssignment,
} from "../graphql/mutations";
import { getAssignment, getSection } from "../graphql/queries";
import ScreenList, { modalStyles } from "../components/ScreenList";
import { API, graphqlOperation, SortDirection } from "aws-amplify";
import {
	onCreateAssignment,
	onDeleteAssignment,
	onUpdateAssignment,
} from "../graphql/subscriptions";
import { Assignment } from "../types";
import { Picker } from "@react-native-picker/picker";

const AssignmentScreen = ({ navigation, route }: any) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [assignments, setAssignments] = useState([]);

	type sort = {
		sortBy: string;
		direction: string;
	};

	const sortTypes = ["byDueDate", "byGrade", "byName"];
	const directionTypes = ["Ascending", "Descending"];

	const [pickerState, setPickerState] = useState({
		sortBy: sortTypes[0],
		direction: directionTypes[0],
	});

	const { userId, sectionId } = route.params;

	const fetchAssignments = async () => {
		try {
			if (userId) {
				const assignmentData = await API.graphql(
					graphqlOperation(getSection, { id: sectionId })
				);
				console.log(assignmentData);
				if (assignmentData.data.getSection) {
					setAssignments(
						assignmentData.data.getSection.assignments.items
					);
				}
			}
		} catch (e) {
			console.log(e);
		}
		return;
	};

	return (
		<View style={{ flex: 1 }}>
			{/*
			<View
				style={{
					flex: 0.1,
					justifyContent: "flex-start",
					flexDirection: "row",
				}}>
				<Text>Sort by: </Text>
				<Picker
					selectedValue={pickerState.sortBy}
					style={{ height: 25, width: 150, flex: 1 }}
					onValueChange={(itemValue, itemIndex) =>
						setPickerState({ sortBy: itemValue })
					}>
					{sortTypes.map((x) => {
						return <Picker.Item label={x} value={x} />;
					})}
				</Picker>
			</View>
			*/}
			<ScreenList
				navigation={navigation}
				route={route}
				data={{ value: assignments, userId, sectionId }}
				modal={modal}
				setModal={setModalVisible}
				modalVisible={modalVisible}
				renderItem={renderItem}
				onDeleteOp={deleteAssignment}
				fetchAllData={fetchAssignments}
				fetchSingleDataOp={getAssignment}
				onDeleteSub={onDeleteAssignment}
				onCreateSub={onCreateAssignment}
				onUpdateSub={onUpdateAssignment}
			/>
		</View>
	);
};

const renderItem = ({ data, onDelete, onSwipe, onEdit }) => {
	return (
		<AssignmentItem
			data={data}
			onSwipe={onSwipe}
			onDelete={onDelete}
			onEdit={onEdit}
		/>
	);
};

const modal = (
	setModalVisible: any,
	data: object,
	editing: boolean,
	editData: object
) => {
	const assignmentNamePlaceholderText = "Assignment Name ex. 'Test 1'";
	const pointsGradedPlaceholderText = "0";
	const pointsPossiblePlaceholderText = "0";

	const [assingnmentNameValue, onChangeAssingnmentNameValueText] = useState(
		""
	);
	const [pointsGradedValue, onChangePointsGradedValueText] = useState(0);
	const [pointsPossibleValue, onChangepointsPossibleValueText] = useState(0);
	const [selectedIndex, setSelectedIndex] = useState(false);
	const [gradeValue, setGradeValue] = useState(0);

	const [assignmentId, setAssignementId] = useState("");
	const [sectionId, setSectionId] = useState("");
	const [userId, setUserId] = useState("");

	let assignmentData: Assignment;
	useEffect(() => {
		if (editing) {
			assignmentData = editData.getAssignment;

			onChangeAssingnmentNameValueText(assignmentData.name);
			onChangePointsGradedValueText(assignmentData.gainedPoints);
			onChangepointsPossibleValueText(assignmentData.possiblePoints);
			setSelectedIndex(assignmentData.completed);
			setAssignementId(assignmentData.id);
		} else {
			setSectionId(data.sectionId);
			setUserId(data.userId);
		}
	}, [editing]);

	useEffect(() => {
		setGradeValue(
			Number(pointsPossibleValue) <= 0
				? Number(pointsGradedValue)
				: (Number(pointsGradedValue) / Number(pointsPossibleValue)) *
						100
		);
	}, [pointsGradedValue, pointsPossibleValue]);

	return (
		<KeyboardAvoidingView
			behavior='padding'
			style={modalStyles.centeredView}>
			<View style={modalStyles.modalView}>
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
							onChangeAssingnmentNameValueText(text)
						}
						placeholder={assignmentNamePlaceholderText}
						placeholderTextColor={"rgba(0,0,0,0.5)"}
						defaultValue={assingnmentNameValue}
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
									onChangePointsGradedValueText(Number(text));
								}}
								textAlign='center'
								placeholder={"0"}
								placeholderTextColor={"rgba(0,0,0,0.8)"}
								defaultValue={pointsGradedValue.toString()}
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
										Number(text)
									);
								}}
								textAlign='center'
								placeholder={pointsPossiblePlaceholderText}
								placeholderTextColor={"rgba(0,0,0,0.8)"}
								defaultValue={pointsPossibleValue.toString()}
							/>
						</View>
					</View>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							paddingVertical: 20,
						}}>
						<Text style={{ fontSize: 20, fontWeight: "700" }}>
							Grade
						</Text>
						<Text style={{ fontSize: 20, fontWeight: "700" }}>
							{gradeValue +
								(Number(pointsPossibleValue) <= 0 ? "" : "%")}
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
								onChangePointsGradedValueText(0);
								onChangepointsPossibleValueText(0);
								onChangeAssingnmentNameValueText("");
								setSelectedIndex(0);
								setModalVisible(false);
							}}>
							<Text>Close</Text>
						</Button>
						<Button
							title='Done'
							onPress={async () => {
								if (editing) {
									await API.graphql(
										graphqlOperation(updateAssignment, {
											input: {
												id: assignmentId,
												name: assingnmentNameValue,
												gainedPoints: Number(
													pointsGradedValue
												),
												possiblePoints: Number(
													pointsPossibleValue
												),
												grade: gradeValue,
												completed: selectedIndex,
												dueDate: new Date(Date.now()),
											},
										})
									);
								} else {
									await API.graphql(
										graphqlOperation(createAssignment, {
											input: {
												userId: userId,
												sectionId: sectionId,
												name:
													assingnmentNameValue.length >
													0
														? assingnmentNameValue
														: " New Assignment",
												gainedPoints: Number(
													pointsGradedValue
												),
												possiblePoints: Number(
													pointsPossibleValue
												),
												grade: gradeValue,
												completed: selectedIndex,
												dueDate: new Date(Date.now()),
											},
										})
									);
								}

								onChangePointsGradedValueText(0);
								onChangepointsPossibleValueText(0);
								onChangeAssingnmentNameValueText("");
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
	);
};

export default AssignmentScreen;
