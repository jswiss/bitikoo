import React from 'react';
import {
	View,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Text,
} from 'react-native';

import { ListItem } from '../../components/list-item';
import { useLists } from '../../hooks/use-lists';

export const ListScreen: React.FC = () => {
	const { lists } = useLists();

	console.log('LISTS::', lists);

	return (
		<View style={styles.container}>
			<View style={styles.button}>
				<TouchableOpacity
					style={styles.newListButton}
					onPress={() => console.log('pressed')}>
					<Text style={styles.newListButtonIcon}>🖋 New List</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				data={lists}
				renderItem={(list) => (
					<ListItem listName={list.item.list_name} colour={list.item.colour} />
				)}
				keyExtractor={(item, index) => `${index}-${item.list_id}`}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 50,
		height: '100%',
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	newListButton: {
		marginTop: 10,
		paddingRight: 5,
		paddingBottom: 10,
		paddingTop: 10,
	},
	newListButtonIcon: {
		fontSize: 20,
	},
});
