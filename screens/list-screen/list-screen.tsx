import React, { useState } from 'react';
import {
	View,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Text,
	Modal,
	Alert,
} from 'react-native';

import { ListItem } from '../../components/list-item';
import { ListForm } from '../../components/list-form';
import { useLists } from '../../hooks/use-lists';

export const ListScreen: React.FC = () => {
	const { lists } = useLists();
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	return (
		<View style={styles.container}>
			<View style={styles.button}>
				<TouchableOpacity
					style={styles.newListButton}
					onPress={() => setModalVisible(true)}>
					<Text style={styles.newListButtonIcon}>🖋 New List</Text>
				</TouchableOpacity>
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
				}}>
				<ListForm />
			</Modal>
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
