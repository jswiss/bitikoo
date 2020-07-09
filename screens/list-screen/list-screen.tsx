import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	TextInput,
	Button,
	Modal,
	Alert,
} from 'react-native';
import { PickerIOS } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';

import { useLists } from '../../hooks/use-lists';
import { ColourBox } from '../../components/colour-box';
import { ALL_COLOURS } from '../../database/constants';
import { List } from '../../database/models/List';

type ListName = string;
type ListColour = string;

export const ListScreen: React.FC = () => {
	const { lists, createList, updateList } = useLists();

	const [formOpen, setFormOpen] = useState(false);
	const [name, setName] = useState<ListName>('');
	const [listId, setListId] = useState<number | null>(null);
	const [colour, setColour] = useState<ListColour>('');

	const navigation = useNavigation();

	const handleSubmit = () => {
		if (name === '' || colour === '') {
			return;
		}
		setFormOpen(false);
		if (listId) {
			updateList({ list_id: listId, list_name: name, colour });
			clearForm();
		} else {
			createList(name, colour);
			clearForm();
		}
	};

	const clearForm = () => {
		setListId(null);
		setName('');
		setColour('');
	};

	const handleCancel = () => {
		clearForm();
		setFormOpen(false);
	};

	const openEditForm = (list: List) => {
		setFormOpen(true);
		setListId(list.list_id);
		setName(list.list_name);
		setColour(list.colour || 'gold');
	};
	return (
		<View style={styles.container}>
			<View style={styles.button}>
				<TouchableOpacity
					style={styles.newListButton}
					onPress={() => setFormOpen(true)}>
					<Text style={styles.newListButtonIcon}>🖋 New List</Text>
				</TouchableOpacity>
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={formOpen}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
				}}>
				<View style={styles.formContainer}>
					<Text style={styles.label}>List Name</Text>
					<TextInput
						value={name}
						style={styles.input}
						onChangeText={(textValue: string) => setName(textValue.toString())}
					/>
					<Text style={styles.label}>List Colour</Text>
					<PickerIOS
						selectedValue={colour}
						itemStyle={styles.pickerItem}
						style={styles.picker}
						onValueChange={(pickerValue) => setColour(pickerValue.toString())}>
						{ALL_COLOURS.map((colour, index) => (
							<PickerIOS.Item
								key={index}
								value={colour}
								label={colour}
								color={colour}
							/>
						))}
					</PickerIOS>
					<View style={styles.buttonView}>
						<Button color="black" title="Submit" onPress={handleSubmit} />
						<Button color="red" title="Cancel" onPress={handleCancel} />
					</View>
				</View>
			</Modal>
			{lists.map((list) => (
				<View key={list.list_id} style={styles.listItem}>
					<ColourBox colour={list.colour || 'white'} />
					<Text
						onPress={() =>
							navigation.navigate('List', {
								list,
							})
						}
						style={{
							...styles.listText,
							color: list.colour || 'black',
						}}>
						{list.list_name}
					</Text>
					<TouchableOpacity
						onPress={() => openEditForm(list)}
						style={styles.editItem}>
						<Text>🔧</Text>
					</TouchableOpacity>
				</View>
			))}
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
	editItem: {
		marginLeft: 'auto',
	},
	listItem: {
		width: '60%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: 50,
		marginTop: 5,
		marginBottom: 5,
	},
	listText: {
		marginLeft: 10,
		textAlign: 'center',
		color: 'seashell',
		fontSize: 20,
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
		marginBottom: 50,
	},
	picker: { height: 500, width: 200 },
	formContainer: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff',
	},
	label: {
		marginTop: 10,
		marginBottom: 5,
		fontSize: 20,
	},
	input: {
		marginTop: 5,
		marginBottom: 5,
		borderColor: 'gray',
		borderWidth: 1,
		height: 40,
		width: 250,
		color: 'black',
	},
	buttonView: {
		flexDirection: 'row',
	},
	pickerItem: {
		borderColor: 'black',
	},
});
