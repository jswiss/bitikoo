import { useState, useEffect, useCallback } from 'react';
import { List } from '../database/models/List';
import { useDatabase } from './use-database';

// Hook for managing and accessing lists (CRUD)
export function useLists() {
	const [lists, setLists] = useState<List[]>([]);
	const [selectedList, setSelectedList] = useState<List>();
	const database = useDatabase();

	const refreshListOfLists = useCallback(() => {
		// Query all lists from the DB, then store them as state
		return database.getAllLists().then(setLists);
	}, [database]);

	useEffect(() => {
		refreshListOfLists();
	}, [refreshListOfLists]);

	function createList(newListTitle: string): Promise<void> {
		return database.createList(newListTitle).then(refreshListOfLists);
	}

	function deleteList(listToDelete: List): Promise<void> {
		if (listToDelete !== undefined) {
			return database.deleteList(listToDelete).then(refreshListOfLists);
		}
		// otherwise:
		return Promise.reject(Error('Could not delete an undefined list'));
	}

	async function selectList(list: List) {
		setSelectedList(list);
	}

	return {
		lists,
		selectedList,
		createList,
		deleteList,
		selectList,
	};
}
