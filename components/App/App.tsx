import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MapScreen } from '../../screens/map-screen';
import { PlacesScreen } from '../../screens/places-screen';
import { SettingsScreen } from '../../screens/settings-screen';
import SQLite from 'react-native-sqlite-storage';

const Tab = createBottomTabNavigator();

export function App() {
	React.useEffect(() => {
		SQLite.DEBUG(true);
		SQLite.enablePromise(true);

		SQLite.openDatabase({
			name: 'testDb',
			location: 'default',
		}).then((db) => {
			console.log('db open!');
			console.table(db);
		});
	}, []);
	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="Map">
				<Tab.Screen name="Places" component={PlacesScreen} />
				<Tab.Screen name="Map" component={MapScreen} />
				<Tab.Screen name="Settings" component={SettingsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
