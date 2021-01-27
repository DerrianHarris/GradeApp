import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Button, KeyboardAvoidingView } from "react-native";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import SectionItem from "../components/SectionItem";
import ScreenList, { modalStyles } from "../components/ScreenList";
import {
	onCreateSection,
	onDeleteSection,
	onUpdateSection,
} from "../graphql/subscriptions";
import { API, graphqlOperation } from "aws-amplify";
import {
	createSection,
	deleteClass,
	deleteSection,
	updateSection,
} from "../graphql/mutations";
import { getSemester, getClass, getSection } from "../graphql/queries";

const SectionScreen = ({ navigation, route }: any) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [sections, setSections] = useState([]);
	const { userId, classId } = route.params;

	const fetchSections = async () => {
		try {
			if (userId) {
				const sectionData = await API.graphql(
					graphqlOperation(getClass, { id: classId })
				);
				if (sectionData.data.getClass) {
					setSections(sectionData.data.getClass.sections.items);
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
			data={{ value: sections, userId, classId }}
			modal={modal}
			setModal={setModalVisible}
			modalVisible={modalVisible}
			renderItem={renderItem}
			onDeleteOp={deleteSection}
			fetchAllData={fetchSections}
			fetchSingleDataOp={getSection}
			onDeleteSub={onDeleteSection}
			onCreateSub={onCreateSection}
			onUpdateSub={onUpdateSection}
		/>
	);
};

const renderItem = ({ data, onDelete, onSwipe, onEdit }) => {
	return (
		<SectionItem
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
	const sectionNamePlaceholderText = "Section Name ex. 'Quizzes'";

	const [sectionNameValue, onChangSectionNameValueText] = useState("");
	const [sectionGradeScaleValue, setSectionGradeScaleValue] = useState(1);
	const [sectionId, setSectionId] = useState("");
	const [classId, setClassId] = useState("");
	const [userId, setUserId] = useState("");

	let sectionData = null;
	useEffect(() => {
		if (editing) {
			sectionData = editData.getSection;

			onChangSectionNameValueText(sectionData.name);
			setSectionGradeScaleValue(sectionData.gradeScale);
			setSectionId(sectionData.id);
		} else {
			setClassId(data.classId);
			setUserId(data.userId);
		}
	}, [editing]);

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
						Add New Section
					</Text>
					<TextInput
						style={{
							height: 30,
							borderBottomWidth: 1,
						}}
						onChangeText={(text) =>
							onChangSectionNameValueText(text)
						}
						placeholder={sectionNamePlaceholderText}
						placeholderTextColor={"rgba(0,0,0,0.5)"}
						defaultValue={sectionNameValue}
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
							Section Scale
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
								setSectionGradeScaleValue(Number(text))
							}
							placeholder={"1"}
							placeholderTextColor={"rgba(0,0,0,0.5)"}
							defaultValue={sectionGradeScaleValue.toString()}
						/>
						<Text
							style={{
								justifyContent: "center",
								alignSelf: "center",
								fontSize: 12,
								padding: 5,
							}}>
							Leave scale as 1 if there is no scale.
						</Text>
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
								onChangSectionNameValueText("");
								setSectionGradeScaleValue(1);
								setModalVisible(false);
							}}>
							<Text>Close</Text>
						</Button>
						<Button
							title='Done'
							onPress={async () => {
								if (editing) {
									await API.graphql(
										graphqlOperation(updateSection, {
											input: {
												id: sectionId,
												name: sectionNameValue,
												gradeScale: Number(
													sectionGradeScaleValue
												),
											},
										})
									);
								} else {
									await API.graphql(
										graphqlOperation(createSection, {
											input: {
												userId: userId,
												classId: classId,
												name:
													sectionNameValue.length > 0
														? sectionNameValue
														: " New Section",
												gradeScale: Number(
													sectionGradeScaleValue
												),
											},
										})
									);
								}

								onChangSectionNameValueText("");
								setSectionGradeScaleValue(1);
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

export default SectionScreen;
