import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Modal, RefreshControl } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { API, graphqlOperation } from "aws-amplify";
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
}: any) => {
	const [refreshing, setRefreshing] = useState(false);
	const [editing, setEditing] = useState(false);
	const [editData, setEditingData] = useState();

	const { value, userId } = data;
	const onSwipe = (isSwiping) => {};

	useLayoutEffect(() => {
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

	const getData = async (id: string) => {
		const data = await API.graphql(
			graphqlOperation(fetchSingleDataOp, { id })
		);
		return data;
	};

	const onEdit = async (id: string) => {
		const data = await getData(id);
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
		<View style={modalStyles.container}>
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
				style={modalStyles.list}
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

export const modalStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EBEBEB",
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

export default ScreenList;
