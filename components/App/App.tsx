import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SQLite from 'react-native-sqlite-storage';

import { DatabaseProvider } from '../../providers/database-context';
import { MapScreen } from '../../screens/map-screen';
import { ListScreen } from '../../screens/list-screen';
import { SettingsScreen } from '../../screens/settings-screen';

const Tab = createBottomTabNavigator();

export const App: React.FunctionComponent = function () {
	useEffect(() => {
		SQLite.DEBUG(true);
		SQLite.enablePromise(true);

		SQLite.openDatabase({
			name: 'testDb',
			location: 'default',
		}).then((db) => {
			console.log(db);
		});
	}, []);
	return (
		<DatabaseProvider>
			<NavigationContainer>
				<Tab.Navigator initialRouteName="Map">
					<Tab.Screen name="Lists" component={ListScreen} />
					<Tab.Screen name="Map" component={MapScreen} />
					<Tab.Screen name="Settings" component={SettingsScreen} />
				</Tab.Navigator>
			</NavigationContainer>
		</DatabaseProvider>
	);
};
