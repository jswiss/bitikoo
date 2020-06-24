// import { Database } from './Database';
// import { List } from './models/List';
// import { Place } from './models/Place';

// // A (naive!) in-memory implementation of the Database interface.
// let lists = [] as List[];
// let listIdIndex = 0;

// // A Map where each key represents a list ID, and the value is an array of list items.
// type PlaceMap = { [key: number]: Place[] };
// let placeMap: PlaceMap = {};
// let placeIdIndex = 0;

// async function createList(newListName: string) {
// 	const newList: List = { list_name: newListName, list_id: listIdIndex++ };
// 	placeMap = { ...placeMap, [newList.list_id]: [] };
// 	lists = [...lists, newList];
// }

// async function addPlace(place: Place, list: List) {
// 	const newPlace: Place = {
// 		place_name: place.place_name,
// 		desc: place.desc,
// 		latitude: place.latitude,
// 		longitude: place.longitude,
// 		photo: place.photo,
// 		place_id: placeIdIndex++,
// 		list_id: list.list_id,
// 	};
// 	const placesForList = placeMap[list.list_id];
// 	const updatedPlacesForList = [...placesForList, newPlace];
// 	placeMap = { ...placeMap, [list.list_id]: updatedPlacesForList };
// }

// async function getAllLists(): Promise<List[]> {
// 	return lists;
// }

// async function getListPlaces(list: List): Promise<Place[]> {
// 	console.log('List:', list, 'List items:', placeMap[list.list_id]);
// 	return placeMap[list.list_id];
// }
// async function getPlace(place_id: number): Promise<Place> {
// 	console.log('Place:', place_id);
// 	return placeMap[place_id];
// }

// async function updatePlace(place: Place): Promise<void> {
// 	if (place.list_id !== undefined) {
// 		const placesForList = placeMap[place.list_id];
// 		const updatedPlacesForList = placesForList.map((currentItem) => {
// 			if (currentItem.place_id === place.place_id) {
// 				return place;
// 			} else {
// 				return currentItem;
// 			}
// 		});
// 		// Update state
// 		placeMap = {
// 			...placeMap,
// 			[place.list_id]: updatedPlacesForList,
// 		};
// 	}
// }

// async function deleteList(listToDelete: List): Promise<void> {
// 	lists = lists.filter((list) => list.list_id !== listToDelete.list_id);
// }

// export const inMemoryDatabase: Database = {
// 	createList,
// 	addPlace,
// 	getAllLists,
// 	getListPlaces,
// 	getPlace,
// 	updatePlace,
// 	updateList,
// 	deleteList,
// 	deletePlace,
// };
const inMemoryDB = '';
export default inMemoryDB;
