import { Database } from './Database';
import { List } from './models/List';
import { Place } from './models/Place';

// A (naive!) in-memory implementation of the Database interface.
let lists = [] as List[];
let listIdIndex = 0;

// A Map where each key represents a list ID, and the value is an array of list items.
type PlaceMap = { [key: number]: Place[] };
let placeMap: PlaceMap = {};
let placeIdIndex = 0;

type Places = Place[];
let places: Places = [];

async function createList(newListName: string) {
	const newList: List = { list_name: newListName, list_id: listIdIndex++ };
	placeMap = { ...placeMap, [newList.list_id]: [] };
	lists = [...lists, newList];
}

async function addPlaceToList(place: Place) {
	const newPlace: Place = {
		place_name: place.place_name,
		desc: place.desc,
		latitude: place.latitude,
		longitude: place.longitude,
		photo: place.photo,
		place_id: placeIdIndex++,
		list_id: place.list_id,
	};
	if (place.list_id) {
		const placesForList = placeMap[place.list_id];
		const updatedPlacesForList = [...placesForList, newPlace];
		placeMap = { ...placeMap, [place.list_id]: updatedPlacesForList };
	}
}

async function createPlaceAndAddToList(place: Place) {
	const newPlace: Place = {
		place_name: place.place_name,
		desc: place.desc,
		latitude: place.latitude,
		longitude: place.longitude,
		photo: place.photo,
		place_id: placeIdIndex++,
		list_id: place.list_id,
	};
	places = [...places, newPlace];

	function checkIfListExists(id: number) {
		const listExists = lists.filter((list) => list.list_id === id);
		return Boolean(listExists);
	}

	if (place.list_id && checkIfListExists(place.list_id)) {
		addPlaceToList(place);
	}
}

async function getAllLists(): Promise<List[]> {
	return lists;
}

async function getListPlaces(list: List): Promise<Place[]> {
	console.log('List:', list, 'List items:', placeMap[list.list_id]);
	return placeMap[list.list_id];
}
async function getPlace(place: Place): Promise<Place[]> {
	const matchingPlace = places.filter((p) => p.place_id === place.place_id);
	return [matchingPlace];
}

async function updatePlace(place: Place): Promise<void> {
	const otherPlaces = places.filter((p) => p.place_id !== place.place_id);
	places = [...otherPlaces, place];

	if (place.list_id) {
		const placesForList = placeMap[place.list_id];
		const updatedPlacesForList = placesForList.map((currentItem) => {
			if (currentItem.place_id === place.place_id) {
				return place;
			} else {
				return currentItem;
			}
		});
		// Update state
		placeMap = {
			...placeMap,
			[place.list_id]: updatedPlacesForList,
		};
	}
}

async function updateList(list: List) {
	const otherLists = lists.filter((l) => l.list_id !== list.list_id);
	lists = [...otherLists, list];
}

async function deleteList(listToDelete: List): Promise<void> {
	lists = lists.filter((list) => list.list_id !== listToDelete.list_id);
}

async function deletePlace(placeToDelete: Place): Promise<void> {
	if (placeToDelete.list_id) {
		const listOfPlacesToRemove = placeMap[placeToDelete.list_id];
		const listMinusDeletedPlace = listOfPlacesToRemove.filter(
			(place) => place.place_id !== placeToDelete.place_id,
		);
		delete placeMap[placeToDelete.list_id];
		placeMap = { ...placeMap, [placeToDelete.list_id]: listMinusDeletedPlace };
	}
	places = places.filter((place) => place.place_id !== placeToDelete.place_id);
}

export const inMemoryDatabase: Database = {
	createList,
	createPlaceAndAddToList,
	addPlaceToList,
	getAllLists,
	getListPlaces,
	getPlace,
	updatePlace,
	updateList,
	deleteList,
	deletePlace,
};
