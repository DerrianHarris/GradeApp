import { useNavigation, useRoute } from '@react-navigation/native';
import React, { Props } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import { Assignment } from '../../types';
import TouchableButtonComponent from '../TouchableButtonComponent';

export type AssignmentItemProps = {
	data: Assignment;
};

const AssignmentItem = (props: AssignmentItemProps) => {
	const { data } = props;
	return (
		<TouchableButtonComponent
			onPress={() => {}}
			Component={
				<View style={styles.container}>
					<Text style={{ fontSize: 32, fontWeight: '700' }}>
						{data.Name}
					</Text>
					<Text style={{ fontSize: 22, fontWeight: '700' }}>
						{data.dueDate}
					</Text>
					<Text style={{ fontSize: 22, fontWeight: '700' }}>
						{data.grade}
					</Text>
				</View>
			}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	button: {
		height: 75,
		backgroundColor: 'grey',
		borderRadius: 5,
		marginHorizontal: 5,
		marginVertical: 3,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingLeft: 40,
		paddingRight: 20,
	},
	gpa: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
		width: 60,
		height: 60,
		borderRadius: 10,
		paddingVertical: 6,
	},
});

export default AssignmentItem;
