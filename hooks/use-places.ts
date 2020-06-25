import { useState, useEffect, useCallback } from 'react';

import { useDatabase } from './use-database';
import { List } from '../database/models/List';
import { Place } from '../database/models/Place';

export function usePlaces(selectedList: List) {
	const database = useDatabase();
	const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);

	const refreshPlaces = useCallback(
		(listToRefresh: List): Promise<void> => {
			console.log(
				`Refreshing places in list: ${
					listToRefresh && listToRefresh.list_name
				}`,
			);

			if (listToRefresh !== undefined) {
				const selectedListPlaces = database
					.getListPlaces(listToRefresh)
					.then((res) => {
						setSelectedPlaces(res);
					})
					.catch((err) => console.error(err));
				return selectedListPlaces;
			} else {
				return Promise.reject("Could not refresh an undefined list's places");
			}
		},
		[database],
	);

	useEffect(() => {
		refreshPlaces(selectedList);
	}, [refreshPlaces, selectedList]);

	async function updateListPlace(place: Place): Promise<void> {
		await database.updatePlace(place);
		await refreshPlaces(selectedList);
	}

	async function addListPlace(place: Place): Promise<void> {
		await database.createPlace(place);
		await refreshPlaces(selectedList);
	}

	return {
		selectedPlaces,
		addListPlace,
		updateListPlace,
	};
}
