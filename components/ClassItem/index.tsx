import { useNavigation } from '@react-navigation/native';
import React, { Props } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import { Class } from '../../types';
import TouchableButtonComponent from '../TouchableButtonComponent';

export type ClassItemProps = {
	data: Class;
};

const ClassItem = (props: ClassItemProps) => {
	const navigation = useNavigation();
	const { data } = props;
	return (
		<TouchableButtonComponent
			onPress={() => {
				navigation.navigate('Assignments', { data: data.Assignments });
			}}
			Component={
				<Text style={{ fontSize: 32, fontWeight: '700' }}>
					{data.Name}
				</Text>
			}
		/>
	);
};

const styles = StyleSheet.create({
	gpa: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
		width: 60,
		height: 60,
		borderRadius: 10,
		paddingVertical: 6,
	},
});

export default ClassItem;
