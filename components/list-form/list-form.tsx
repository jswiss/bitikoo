import React, { useState } from 'react';
import { Button, Text, TextInput, StyleSheet, View } from 'react-native';

import { Picker } from '@react-native-community/picker';

export interface ListForm {
	list_name: string;
	colour?: string;
}

export const ListForm: React.FC = () => {
	const defaultFormValues: ListForm = {
		list_name: '',
		colour: '',
	};

	const [form, setForm] = useState<ListForm>(defaultFormValues);
	return (
		<View>
			<Text>List Name</Text>
			<TextInput
				value={form.list_name}
				onChange={(textValue) =>
					setForm({ ...form, list_name: textValue.toString() })
				}
			/>
			<Text>List Colour</Text>
			<Picker
				selectedValue={form.colour}
				style={styles.picker}
				onValueChange={(pickerValue) =>
					setForm({ ...form, colour: pickerValue.toString() })
				}>
				<Picker.Item label="Red" value="#ec1212" />
				<Picker.Item label="Blue" value="#003399" />
				<Picker.Item label="Green" value="#008000" />
				<Picker.Item label="Yellow" value="#FFFF00" />
				<Picker.Item label="Pink" value="#FFC0CB" />
				<Picker.Item label="Purple" value="#800080" />
			</Picker>
			<Button title="list-submit" onPress={() => console.log('button pressed')}>
				Submit
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	picker: { height: 50, width: 100 },
});
