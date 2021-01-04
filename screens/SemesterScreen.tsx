import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Modal, Text, Button, TextInput } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import SemesterItem from "../components/SemesterItem";

const SemesterScreen = ({ navigation, route }: any) => {
	const semesterPlaceholderText = "Semester Name";
	const gpaScalePlaceholderText = "GPA Scale ex. 4.0";

	const [modalVisible, setModalVisible] = useState(false);
	const [semesterValue, onChangeSemesterText] = useState("");
	const [gpaValue, onGpaChangeText] = useState("");

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
				renderItem={({ item, index }) => <SemesterItem data={item} />}
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
									onChangeSemesterText(text)
								}
								placeholder={semesterPlaceholderText}
								placeholderTextColor={"rgba(0,0,0,0.5)"}
								value={semesterValue}
							/>
							<TextInput
								style={{
									height: 30,
									borderBottomWidth: 1,
								}}
								keyboardType='decimal-pad'
								onChangeText={(text) => onGpaChangeText(text)}
								placeholder={gpaScalePlaceholderText}
								placeholderTextColor={"rgba(0,0,0,0.5)"}
								value={gpaValue}
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
										setModalVisible(false);
									}}>
									<Text>Close</Text>
								</Button>
								<Button
									title='Done'
									onPress={() => {
										setModalVisible(false);
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
