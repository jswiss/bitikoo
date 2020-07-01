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
		newListColour: string = '#f0f8ff',
	): Promise<void> {
		try {
			await database
				.createList(newListTitle, newListColour)
				.then(refreshListOfLists);
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
