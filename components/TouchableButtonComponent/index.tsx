import React, { useCallback, useRef } from 'react';
import { Text, View, StyleSheet, Button, Animated } from 'react-native';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-swipeable-row';
import navigation from '../../navigation';

const TouchableButtonComponent = (props: any) => {
	const rightButtons = [
		<TouchableOpacity
			style={{
				backgroundColor: 'red',
				justifyContent: 'center',
				paddingLeft: 20,
				height: '100%',
			}}
		>
			<Text style={{ fontSize: 25, fontWeight: '600' }}>Delete</Text>
		</TouchableOpacity>,
	];

	const leftButtons = [
		<TouchableOpacity
			style={{
				backgroundColor: 'green',
				justifyContent: 'center',
				alignItems: 'flex-end',
				paddingRight: 20,
				height: '100%',
			}}
		>
			<Text style={{ fontSize: 25, fontWeight: '600' }}>Edit</Text>
		</TouchableOpacity>,
	];

	return (
		<View style={{ borderBottomWidth: 1 }}>
			<Swipeable
				rightButtons={rightButtons}
				rightButtonWidth={100}
				onRightActionRelease={() => {
					console.log('Deleting...');
				}}
				rightActionActivationDistance={50}
				leftButtons={leftButtons}
				leftButtonWidth={75}
				onLightActionRelease={() => {
					console.log('Editing...');
				}}
				lightActionActivationDistance={50}
			>
				<RectButton
					style={props.style || styles.button}
					onPress={() => {
						props.onPress();
					}}
				>
					{props.Component}
				</RectButton>
			</Swipeable>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		height: 75,
		marginHorizontal: 5,
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingLeft: 40,
		paddingRight: 20,
		borderColor: 'black',
	},
	rightAction: {},
	actionText: {},
});

export default TouchableButtonComponent;
