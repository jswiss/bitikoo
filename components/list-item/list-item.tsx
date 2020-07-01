import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
	listName: string;
	colour?: string;
}

export function ListItem({ listName, colour }: Props) {
	return (
		<View style={{ ...styles.item, backgroundColor: colour }}>
			<Text style={styles.name}>{listName}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: '#f0f8ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	name: {
		fontSize: 32,
	},
});
