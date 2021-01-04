import { View, FlatList } from 'react-native';

export type ScreenListParamList = {
	data: [any];
	renderItem: any;
};

const ScreenList = (props: ScreenListParamList) => {
	const { data, renderItem } = props;

	return (
		<View>
			<FlatList data={data} renderItem={renderItem} />
		</View>
	);
};

export default ScreenList;
