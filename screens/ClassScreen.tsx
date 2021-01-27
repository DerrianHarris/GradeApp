import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import {
	FlatList,
	TouchableOpacity,
	TextInput,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import ClassItem from "../components/ClassItem";
import { API, graphqlOperation } from "aws-amplify";
import { getClass, getSemester } from "../graphql/queries";
import { createClass, deleteClass, updateClass } from "../graphql/mutations";
import {
	onCreateClass,
	onDeleteClass,
	onUpdateClass,
} from "../graphql/subscriptions";
import ScreenList, { modalStyles } from "../components/ScreenList";
import { gradeScaleName } from "../Utils";

const ClassScreen = ({ navigation, route }: any) => {
	const [classesValue, setclasses] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);

	const { userId, semesterId } = route.params;
	const fetchClasses = async () => {
		try {
			if (userId) {
				const classesData = await API.graphql(
					graphqlOperation(getSemester, { id: semesterId })
				);
				if (classesData.data.getSemester) {
					setclasses(classesData.data.getSemester.classes.items);
				}
			}
		} catch (e) {
			console.log(e);
		}
		return;
	};

	return (
		<ScreenList
			navigation={navigation}
			route={route}
			data={{ value: classesValue, userId, semesterId }}
			modal={modal}
			setModal={setModalVisible}
			modalVisible={modalVisible}
			renderItem={renderItem}
			onDeleteOp={deleteClass}
			fetchAllData={fetchClasses}
			fetchSingleDataOp={getClass}
			onDeleteSub={onDeleteClass}
			onCreateSub={onCreateClass}
			onUpdateSub={onUpdateClass}
		/>
	);
};

const renderItem = ({ data, onDelete, onSwipe, onEdit }) => {
	return (
		<ClassItem
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
	const classNamePlaceholderText = "Class Name";

	const refreshArr = [
		"97",
		"93",
		"90",
		"87",
		"83",
		"80",
		"77",
		"73",
		"70",
		"67",
		"63",
		"60",
		"0",
	];

	const [classNameValue, onChangeClassNameText] = useState("");
	const [gradeScale, onChangeGradeScale] = useState(refreshArr);
	const [classId, setClassId] = useState("");
	const [semesterId, setSemesterId] = useState("");
	const [userId, setUserId] = useState("");

	let classData = null;
	useEffect(() => {
		if (editing) {
			classData = editData.getClass;
			onChangeClassNameText(classData.name);
			onChangeGradeScale(classData.gradingScale.map(String));
			setClassId(classData.id);
		} else {
			setSemesterId(data.semesterId);
			setUserId(data.userId);
		}
	}, [editing]);

	return (
		<View style={modalStyles.centeredView}>
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
						{editing ? "Edit Class" : "Add New Class"}
					</Text>
					<TextInput
						style={{
							height: 30,
							borderBottomWidth: 1,
						}}
						onChangeText={(text) => onChangeClassNameText(text)}
						placeholder={classNamePlaceholderText}
						placeholderTextColor={"rgba(0,0,0,0.5)"}
						defaultValue={classNameValue}
					/>

					<View style={{ justifyContent: "center" }}>
						<Text
							style={{
								alignSelf: "center",
								fontSize: 20,
								paddingTop: 10,
								fontWeight: "700",
							}}>
							Grading Scale
						</Text>
						<FlatList
							data={gradeScaleName}
							scrollEnabled={true}
							numColumns={2}
							renderItem={({ item, index }) => (
								<View
									style={{
										justifyContent: "flex-start",
										flexDirection: "row",
										paddingHorizontal: 25,
									}}>
									<Text
										style={{
											fontSize: 20,
											alignSelf: "flex-start",
											width: 25,
										}}>
										{item}
									</Text>
									<TextInput
										style={{
											height: 20,
											width: 30,
											borderWidth: 1,
											marginLeft: 0,
											alignSelf: "center",
											left: "60%",
										}}
										keyboardType='number-pad'
										onChangeText={(text) => {
											let arr = gradeScale;
											arr[index] = text;

											onChangeGradeScale(arr);
										}}
										textAlign='center'
										defaultValue={gradeScale[index]}
										placeholderTextColor={"rgba(0,0,0,0.5)"}
									/>
								</View>
							)}
							keyExtractor={(item, index) => index.toString()}
							style={{}}
						/>
					</View>
					<Text
						style={{
							justifyContent: "center",
							alignSelf: "center",
						}}>
						Blank Values Will Be Ignored
					</Text>
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
								setModalVisible(false);
								onChangeGradeScale(refreshArr);
								onChangeClassNameText("");
							}}>
							<Text>Close</Text>
						</Button>
						<Button
							title='Done'
							onPress={async () => {
								if (editing) {
									await API.graphql(
										graphqlOperation(updateClass, {
											input: {
												id: classId,
												name: classNameValue,
												gradingScale: gradeScale.map(
													Number
												),
											},
										})
									);
								} else {
									await API.graphql(
										graphqlOperation(createClass, {
											input: {
												userId: userId,
												semesterId: semesterId,
												name:
													classNameValue.length > 0
														? classNameValue
														: " New Class",
												gradingScale: gradeScale.map(
													Number
												),
											},
										})
									);
								}
								setModalVisible(false);
								onChangeGradeScale(refreshArr);
								onChangeClassNameText("");
							}}>
							<View>
								<Text>Done</Text>
							</View>
						</Button>
					</View>
				</View>
			</View>
		</View>
	);
};

export default ClassScreen;
