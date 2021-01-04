import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Modal, Text, Button } from "react-native";
import {
	FlatList,
	TouchableOpacity,
	TextInput,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import ClassItem from "../components/ClassItem";

const ClassScreen = ({ navigation, route }: any) => {
	const classNamePlaceholderText = "Class Name";
	const refreshArr = ["", "", "", "", "", "", "", "", "", "", "", "", ""];

	const [modalVisible, setModalVisible] = useState(false);
	const [classNameValue, onChangeClassNameText] = useState("");
	const [gradeScale, onChangeGradeScale] = useState({ ...refreshArr });

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

	const { data } = route.params;

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
				renderItem={({ item, index }) => <ClassItem data={item} />}
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
												justifyContent: "flex-start",
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
												placeholder={""}
												placeholderTextColor={
													"rgba(0,0,0,0.8)"
												}
												value={gradeScale[index]}
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
										setModalVisible(false);
										onChangeGradeScale(refreshArr);
										onChangeClassNameText("");
									}}>
									<Text>Close</Text>
								</Button>
								<Button
									title='Done'
									onPress={() => {
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
			</Modal>
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
