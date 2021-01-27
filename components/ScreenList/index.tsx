import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Modal, RefreshControl } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { API, graphqlOperation } from "aws-amplify";
import { getData } from "../../Utils";

const Seperator = () => {
	return (
		<View
			style={{
				borderBottomColor: "black",
				borderBottomWidth: 1.5,
			}}></View>
	);
};

const ScreenList = ({
	navigation,
	fetchAllData,
	fetchSingleDataOp,
	renderItem,
	data,
	setModal,
	modalVisible,
	modal,
	onDeleteOp,
	onDeleteSub,
	onCreateSub,
	onUpdateSub,
	style,
}: any) => {
	const [refreshing, setRefreshing] = useState(false);
	const [editing, setEditing] = useState(false);
	const [editData, setEditingData] = useState();

	const { value, userId } = data;
	const onSwipe = (isSwiping) => {};

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{ marginRight: 40 }}
					onPress={() => {
						setModal(true);
					}}>
					<Ionicons name='md-add-outline' size={32} color='black' />
				</TouchableOpacity>
			),
		});
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			fetchAllData();
		});

		return unsubscribe;
	}, [navigation]);

	useEffect(() => {
		const key = onCreateSub.split(" ")[3].replace("O", "o");
		const subscription = API.graphql(
			graphqlOperation(onCreateSub)
		).subscribe({
			next: (data) => {
				const createdData = data.value.data[key];
				if (createdData.userId !== userId) {
					console.log(" Created Data is for another user!");
					return;
				}
				fetchAllData();
			},
		});
		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		const key = onDeleteSub.split(" ")[3].replace("O", "o");
		const subscription = API.graphql(
			graphqlOperation(onDeleteSub)
		).subscribe({
			next: (data) => {
				const deletedSection = data.value.data[key];
				console.log(data.value.data[key]);
				if (deletedSection.userId !== userId) {
					console.log(" Deleted Data is for another user!");
					return;
				}
				fetchAllData();
			},
		});
		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		const key = onUpdateSub.split(" ")[3].replace("O", "o");
		const subscription = API.graphql(
			graphqlOperation(onUpdateSub)
		).subscribe({
			next: (data) => {
				const updatedData = data.value.data[key];
				if (updatedData.userId !== userId) {
					console.log(" Updated Data is for another user!");
					return;
				}
				fetchAllData();
			},
		});
		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		fetchAllData();
	}, []);

	const onEdit = async (id: string) => {
		const data = await getData(id, fetchSingleDataOp);
		setEditingData(data.data);
		setEditing(true);
		setModal(true);
	};

	const onDelete = async (id: string) => {
		await API.graphql(
			graphqlOperation(onDeleteOp, {
				input: {
					id,
				},
			})
		);
	};

	const closeModal = () => {
		setModal(false);
	};

	useEffect(() => {
		if (!modalVisible) {
			setEditing(false);
		}
	}, [modalVisible]);

	return (
		<View style={styles.container}>
			<FlatList
				data={value}
				scrollEnabled={true}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={() => {
							console.log("refreshing");
							setRefreshing(true);
							fetchAllData().then(() => {
								setRefreshing(false);
							});
						}}
					/>
				}
				renderItem={({ item }) =>
					renderItem({
						data: item,
						onDelete: onDelete,
						onSwipe: onSwipe,
						onEdit: onEdit,
					})
				}
				keyExtractor={(item, index) => index.toString()}
				ItemSeparatorComponent={() => <Seperator />}
				ListFooterComponent={() =>
					value.length > 0 ? <Seperator /> : <View />
				}
				style={styles.list}
			/>
			<Modal
				animationType='fade'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					closeModal();
				}}
				onDismiss={() => {
					closeModal();
				}}>
				{modal(setModal, data, editing, editData)}
			</Modal>
		</View>
	);
};

const testFunc = () => {};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EBEBEB",
	},
	list: {
		flex: 1,
		paddingVertical: 1,
	},
});

export const modalStyles = StyleSheet.create({
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

export default ScreenList;
