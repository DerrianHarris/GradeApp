import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Button,
	TextInput,
	KeyboardAvoidingView,
} from "react-native";
import SemesterItem from "../components/SemesterItem";
import { API, graphqlOperation } from "aws-amplify";
import { getSemester, getUser, listUsers } from "../graphql/queries";
import {
	createSemester,
	deleteSemester,
	updateSemester,
} from "../graphql/mutations";
import {
	onCreateSemester,
	onDeleteSemester,
	onUpdateSemester,
} from "../graphql/subscriptions";
import ScreenList, { modalStyles } from "../components/ScreenList";

const SemesterScreen = ({ navigation, route }: any) => {
	const [semestersValue, setSemesters] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);

	const { userId } = route.params;

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onCreateSemester)
		).subscribe({
			next: (data) => {
				const newSemester = data.value.data.onCreateSemester;
				if (newSemester.userId !== userId) {
					console.log(" Created Semester is for another user!");
					return;
				}
				fetchSemesters();
			},
		});
		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onDeleteSemester)
		).subscribe({
			next: (data) => {
				const deletedSemester = data.value.data.onDeleteSemester;
				if (deletedSemester.userId !== userId) {
					console.log(" Deleted Semester is for another user!");
					return;
				}
				fetchSemesters();
			},
		});
		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onUpdateSemester)
		).subscribe({
			next: (data) => {
				const updatedSemester = data.value.data.onUpdateSemester;
				if (updatedSemester.userId !== userId) {
					console.log(" Deleted Semester is for another user!");
					return;
				}
				fetchSemesters();
			},
		});
		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		fetchSemesters();
	}, []);

	const fetchSemesters = async () => {
		try {
			if (userId) {
				const userData = await API.graphql(
					graphqlOperation(getUser, { id: userId })
				);
				if (userData.data.getUser) {
					setSemesters(userData.data.getUser.semesters.items);
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
			data={{ value: semestersValue, userId }}
			modal={modal}
			setModal={setModalVisible}
			modalVisible={modalVisible}
			renderItem={renderItem}
			onDeleteOp={deleteSemester}
			onEdit={(id) => {}}
			fetchAllData={fetchSemesters}
			fetchSingleDataOp={getSemester}
		/>
	);
};

const renderItem = ({ data, onDelete, onSwipe, onEdit }) => {
	return (
		<SemesterItem
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
	const semesterPlaceholderText =
		'Semester Name ex. "Spring ' + new Date().getFullYear() + '"';
	const gpaScalePlaceholderText = "ex. 4.0";

	const [semesterNameValue, onChangeSemesterNameValueText] = useState("");
	const [gpaValue, onGpaChangeText] = useState("");
	const [semesterId, setSemesterId] = useState("");

	const [userId, setUserId] = useState("");

	let semester = null;
	useEffect(() => {
		if (editing) {
			semester = editData.getSemester;
			onChangeSemesterNameValueText(semester.name);
			onGpaChangeText(semester.gpaScale.toString());
			setSemesterId(semester.id);
		}
	}, [editing]);

	useEffect(() => {
		setUserId(data.userId);
	}, [data]);

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
						{editing ? "Edit Semester" : "Add New Semester"}
					</Text>
					<TextInput
						style={{
							height: 30,
							borderBottomWidth: 1,
						}}
						onChangeText={(text) =>
							onChangeSemesterNameValueText(text)
						}
						placeholder={semesterPlaceholderText}
						placeholderTextColor={"rgba(0,0,0,0.5)"}
						defaultValue={semesterNameValue}
					/>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Text
							style={{
								fontSize: 17,
								paddingTop: 10,
								fontWeight: "700",
							}}>
							GPA Scale
						</Text>
						<TextInput
							style={{
								height: 30,
								borderWidth: 1,
								justifyContent: "center",
								width: 60,
								textAlign: "center",
							}}
							keyboardType='decimal-pad'
							onChangeText={(text) => onGpaChangeText(text)}
							placeholder={gpaScalePlaceholderText}
							placeholderTextColor={"rgba(0,0,0,0.5)"}
							defaultValue={gpaValue}
						/>
					</View>

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
								onChangeSemesterNameValueText("");
								onGpaChangeText("");
								setModalVisible(false);
							}}>
							<Text>Close</Text>
						</Button>
						<Button
							title='Done'
							onPress={async () => {
								if (editing) {
									await API.graphql(
										graphqlOperation(updateSemester, {
											input: {
												id: semesterId,
												userId: userId,
												name: semesterNameValue,
												gpaScale: Number(gpaValue),
											},
										})
									);
								} else {
									await API.graphql(
										graphqlOperation(createSemester, {
											input: {
												userId: userId,
												name:
													semesterNameValue.length > 0
														? semesterNameValue
														: " New Semester",
												gpaScale:
													gpaValue.length > 0
														? Number(gpaValue)
														: 4,
											},
										})
									);
								}
								onChangeSemesterNameValueText("");
								onGpaChangeText("");
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
export default SemesterScreen;
