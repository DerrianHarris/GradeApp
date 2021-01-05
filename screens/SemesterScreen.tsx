import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Modal, Text, Button, TextInput } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import SemesterItem from "../components/SemesterItem";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { getSemester, getUser, listUsers } from "../graphql/queries";
import {
	createSemester,
	createUser,
	deleteSemester,
} from "../graphql/mutations";
import { onCreateSemester } from "../graphql/subscriptions";

const SemesterScreen = ({ navigation }: any) => {
	const semesterPlaceholderText = "Semester Name";
	const gpaScalePlaceholderText = "ex. 4.0";

	const [modalVisible, setModalVisible] = useState(false);
	const [semesterNameValue, onChangeSemesterNameValueText] = useState("");
	const [gpaValue, onGpaChangeText] = useState("");

	const [semestersValue, setSemesters] = useState([]);

	const [dataUpdated, onDataUpdated] = useState({});

	const subscription = API.graphql(
		graphqlOperation(onCreateSemester)
	).subscribe({(data) => {}});

	useEffect(() => {
		const fetchSemesters = async () => {
			try {
				const userInfo = await Auth.currentAuthenticatedUser();
				const userData = await API.graphql(
					graphqlOperation(getUser, { id: userInfo.attributes.sub })
				);
				console.log(userData);
				setSemesters(userData.data.getUser.semesters.items);
				console.log(semestersValue);
			} catch (e) {
				console.warn(e);
			}
		};
		fetchSemesters();
	}, []);

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
				data={semestersValue}
				renderItem={({ item, index }) => (
					<SemesterItem
						data={item}
						onDelete={async () => {
							console.log(item);
							await API.graphql(
								graphqlOperation(deleteSemester, {
									input: {
										id: item.id,
									},
								})
							);
							setRefresh("");
						}}
					/>
				)}
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
								Add New Semester
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
								value={semesterNameValue}
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
									onChangeText={(text) =>
										onGpaChangeText(text)
									}
									placeholder={gpaScalePlaceholderText}
									placeholderTextColor={"rgba(0,0,0,0.5)"}
									value={gpaValue}
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
										setRefresh(refresh + " ");
									}}>
									<Text>Close</Text>
								</Button>
								<Button
									title='Done'
									onPress={async () => {
										const userInfo = await Auth.currentAuthenticatedUser();
										await API.graphql(
											graphqlOperation(createSemester, {
												input: {
													userId:
														userInfo.attributes.sub,
													name: semesterNameValue,
													gpaScale: gpaValue,
												},
											})
										);
										onChangeSemesterNameValueText("");
										onGpaChangeText("");
										setModalVisible(false);
										setRefresh(refresh + " ");
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	list: {
		width: "100%",
		height: "100%",
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

export default SemesterScreen;
