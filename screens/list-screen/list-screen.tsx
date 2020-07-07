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

import { useLists } from '../../hooks/use-lists';
import { ColourBox } from '../../components/colour-box';
import { ALL_COLOURS } from '../../database/constants';

type ListName = string;
type ListColour = string;

export const ListScreen: React.FC = () => {
	const { lists, createList } = useLists();
	const [formOpen, setFormOpen] = useState(false);
	console.log(lists);
	const [name, setName] = useState<ListName>('');
	const [colour, setColour] = useState<ListColour>('');

	const handleSubmit = () => {
		if (name === '' || colour === '') {
			return;
		}
		console.log('before closed');
		setFormOpen(false);
		console.log('this should have closed');

		createList(name, colour);
	};

	const handleCancel = () => {
		console.log('canceling the form, closing that sucka');

		setName('');
		setColour('');
		setFormOpen(false);
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
					<Text style={{ ...styles.listText, color: list.colour || 'black' }}>
						{list.list_name}
					</Text>
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
	listItem: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
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
