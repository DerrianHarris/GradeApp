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
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import ClassItem from "../components/ClassItem";
import { API, graphqlOperation } from "aws-amplify";
import { getClass, getSemester } from "../graphql/queries";
import { createClass } from "../graphql/mutations";

const ClassScreen = ({ navigation, route }: any) => {
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
	const gradeScaleName = [
		"A+",
		"A",
		"A-",
		"B+",
		"B",
		"B-",
		"C+",
		"C",
		"C-",
		"D+",
		"D",
		"D-",
		"F",
	];

	const [modalVisible, setModalVisible] = useState(false);

	const [classNameValue, onChangeClassNameText] = useState("");

	const [gradeScale, onChangeGradeScale] = useState({ ...refreshArr });

	const [classes, setclasses] = useState([]);

	const semesterData = route.params.data;

	const { userId, id } = semesterData;

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

	const fetchClasses = async () => {
		try {
			if (userId) {
				const classesData = await API.graphql(
					graphqlOperation(getSemester, { id: id })
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
	useEffect(() => {
		fetchClasses();
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={classes}
				renderItem={({ item, index }) => (
					<ClassItem data={item} onSwipe={() => {}} />
				)}
				keyExtractor={(item, index) => index.toString()}
				style={styles.list}
			/>
			<KeyboardAvoidingView behavior='padding'>
				<Modal
					animationType='fade'
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						alert("Modal has been closed.");
					}}>
					<View style={styles.centeredView}>
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
									Add New Class
								</Text>
								<TextInput
									style={{
										height: 30,
										borderBottomWidth: 1,
									}}
									onChangeText={(text) =>
										onChangeClassNameText(text)
									}
									placeholder={classNamePlaceholderText}
									placeholderTextColor={"rgba(0,0,0,0.5)"}
									value={classNameValue}
								/>

								<View>
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
										scrollEnabled={false}
										renderItem={({ item, index }) => (
											<View
												style={{
													justifyContent:
														"flex-start",
													flexDirection: "row",
													paddingLeft: "30%",
												}}>
												<Text
													style={{
														fontSize: 30,
														alignSelf: "flex-start",
													}}>
													{item}
												</Text>
												<TextInput
													style={{
														height: 30,
														width: 60,
														borderWidth: 1,
														marginLeft: 30,
														position: "absolute",
														left: "60%",
													}}
													keyboardType='number-pad'
													onChangeText={(text) => {
														onChangeGradeScale({
															...gradeScale,
															[index]: text,
														});
													}}
													textAlign='center'
													placeholder={
														gradeScale[index]
													}
													placeholderTextColor={
														"rgba(0,0,0,0.5)"
													}
												/>
											</View>
										)}
										keyExtractor={(item, index) =>
											index.toString()
										}
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
											console.log("hello 1");

											console.log(gradeScale);
											setModalVisible(false);
											onChangeGradeScale({
												...refreshArr,
											});
											onChangeClassNameText("");
										}}>
										<Text>Close</Text>
									</Button>
									<Button
										title='Done'
										onPress={async () => {
											console.log("hello 2");

											console.log(gradeScale);
											await API.graphql(
												graphqlOperation(createClass, {
													input: {
														userId: userId,
														semesterId: id,
														name:
															classNameValue ===
															""
																? classNameValue
																: "Class",
														gradingScale: gradeScale.map(
															Number
														),
													},
												})
											);
											setModalVisible(false);
											onChangeGradeScale({
												...refreshArr,
											});
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
				</Modal>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ffff",
	},
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
		paddingBottom: 100,
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

export default ClassScreen;
