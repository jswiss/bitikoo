import React from 'react';
import { Text, View, FlatList } from 'react-native';

import { ListItem } from '../../components/list-item';
import { useLists } from '../../hooks/use-lists';

export const ListScreen: React.FC = () => {
	const { lists } = useLists();

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>This is where your lists live</Text>
			<FlatList
				data={lists}
				renderItem={(item) => (
					<ListItem listName={item.list_name} colour={item.colour} />
				)}
			/>
		</View>
	);
};
