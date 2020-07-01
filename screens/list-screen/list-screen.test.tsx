import React from 'react';
import { ListScreen } from './list-screen';
import { render } from '@testing-library/react-native';
// import { List } from '../../database/models/List';
// import { useLists } from '../../hooks/use-lists';
import { DatabaseProvider } from '../../providers/database-context';
// const defaultList: List[] = [
// 	{ list_id: 1, list_name: 'Default List', colour: '#e6e6fa' },
// ];

test('renders a list', () => {
	const dbLists = (
		<DatabaseProvider>
			<ListScreen />
		</DatabaseProvider>
	);
	const { getByText } = render(dbLists);

	expect(getByText(/New List/)).toBeTruthy();
});
