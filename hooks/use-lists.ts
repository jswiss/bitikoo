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

	async function createList(
		newListTitle: string,
		newListColour = 'gold',
	): Promise<void> {
		try {
			await database
				.createList(newListTitle, newListColour)
				.then(refreshListOfLists);
		} catch (err) {
			console.error(err);
		}
	}
	async function updateList(list: List): Promise<void> {
		try {
			await database.updateList(list).then(refreshListOfLists);
		} catch (err) {
			console.error(err);
		}
	}

	function deleteList(listToDelete: List): Promise<void> {
		if (listToDelete !== undefined) {
			return database.deleteList(listToDelete).then(refreshListOfLists);
		}
		// otherwise:
		return Promise.reject(Error('Could not delete an undefined list'));
	}

	function selectList(list: List) {
		setSelectedList(list);
	}

	return {
		lists,
		selectedList,
		createList,
		updateList,
		deleteList,
		selectList,
	};
}
