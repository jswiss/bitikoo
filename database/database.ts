import SQLite from 'react-native-sqlite-storage';
import { DatabaseInitialisation } from './database-initialisation';
import { List } from './models/List';
import { Place } from './models/Place';
import { DATABASE } from './Constants';
// import { DropboxDatabaseSync } from '../sync/dropbox/DropboxDatabaseSync';
import { AppState, AppStateStatus } from 'react-native';

export interface Database {
	// Create
	createList(newListTitle: string): Promise<void>;
	addPlace(place: Place, list: List): Promise<void>;
	// Read
	getAllLists(): Promise<List[]>;
	getListPlaces(list: List): Promise<Place[]>;
	//TODO: this should just return one place, not an array of places
	getPlace(place: Place): Promise<Place[]>;
	// Update
	updateList(list: List): Promise<void>;
	updatePlace(place: Place): Promise<void>;
	// Delete
	deleteList(list: List): Promise<void>;
	deletePlace(place: Place): Promise<void>;
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;
// const databaseSync: DropboxDatabaseSync = new DropboxDatabaseSync();

// Insert a new list into the database
async function createList(newListTitle: string): Promise<void> {
	return getDatabase()
		.then((db) =>
			db.executeSql('INSERT INTO List (title) VALUES (?);', [newListTitle]),
		)
		.then(([results]) => {
			const { insertId } = results;
			console.log(
				`[db] Added list with title: "${newListTitle}"! InsertId: ${insertId}`,
			);

			// Queue database upload
			// return databaseSync.upload();
		});
}

// Get an array of all the lists in the database
async function getAllLists(): Promise<List[]> {
	console.log('[db] Fetching lists from the db...');
	return getDatabase()
		.then((db) =>
			// Get all the lists, ordered by newest lists first
			db.executeSql('SELECT list_id as id, title FROM List ORDER BY id DESC;'),
		)
		.then(([results]) => {
			if (results === undefined) {
				return [];
			}
			const count = results.rows.length;
			const lists: List[] = [];
			for (let i = 0; i < count; i++) {
				const row = results.rows.item(i);
				const { list_id, list_name } = row;
				console.log(`[db] List title: ${list_name}, id: ${list_id}`);
				lists.push({ list_id, list_name });
			}
			return lists;
		});
}

async function addPlace(place: Place, list: List): Promise<void> {
	if (list === undefined) {
		return Promise.reject(Error('Could not add item to undefined list.'));
	}
	return getDatabase()
		.then((db) =>
			db.executeSql(
				'INSERT INTO Place (place_name, desc, latitude, longitude,  list_id) VALUES (?, ?);',
				[
					place.place_name,
					place.desc,
					place.latitude,
					place.longitude,
					list.list_id,
				],
			),
		)
		.then(([results]) => {
			console.log(
				`[db] Place with "${place.place_name}" created successfully with id: ${results.insertId}`,
			);

			// Queue database upload
			// return databaseSync.upload();
		});
}

async function getListPlaces(list: List): Promise<Place[]> {
	if (list === undefined) {
		return Promise.resolve([]);
	}
	return getDatabase()
		.then((db) =>
			db.executeSql(
				'SELECT place_id as id, place_name, desc, photo FROM Place WHERE list_id = ?;',
				[list.list_id],
			),
		)
		.then(([results]) => {
			if (results === undefined) {
				return [];
			}
			const count = results.rows.length;
			const places: Place[] = [];
			for (let i = 0; i < count; i++) {
				const row: Place = results.rows.item(i);
				const { place_name, desc, latitude, longitude, photo, place_id } = row;

				console.log(
					`[db] Place name: ${place_name}, desc: ${desc}, latitude: ${latitude}, longitude: ${longitude}, photo: ${photo}, id: ${place_id}`,
				);
				places.push(row);
			}
			console.log(`[db] List items for list "${list.list_name}":`, places);
			return places;
		});
}

// TODO: need to update types to allow for one place being returned
async function getPlace(place: Place): Promise<Place[]> {
	if (place === undefined) {
		return Promise.resolve([]);
	}
	return getDatabase()
		.then((db) =>
			db.executeSql(
				'SELECT place_id as id, place_name, desc, photo FROM Place WHERE place_id = ? ORDER BY place_id DESC LIMIT 1;',
				[place.place_id],
			),
		)
		.then(([results]) => {
			if (results === undefined) {
				return [];
			}

			const count = results.rows.length;
			const places: Place[] = [];
			for (let i = 0; i < count; i++) {
				const row: Place = results.rows.item(i);
				const { place_name, desc, latitude, longitude, photo, place_id } = row;

				console.log(
					`[db] Place name: ${place_name}, desc: ${desc}, latitude: ${latitude}, longitude: ${longitude}, photo: ${photo}, id: ${place_id}`,
				);
				places.push(row);
			}
			console.log(`[db] Place data for place "${place.place_name}":`, places);
			return places;
		});
}

async function updatePlace(place: Place): Promise<void> {
	return getDatabase()
		.then((db) =>
			db.executeSql(
				'UPDATE Place SET place_name = ?, desc = ?, latitude = ?, longitude = ?, photo = ? WHERE place_id = ?;',
				[
					place.place_name,
					place.desc,
					place.latitude,
					place.longitude,
					place.photo,
					place.place_id,
				],
			),
		)
		.then(([results]) => {
			console.log(`results: ${results}`);
			console.log(`[db] Place with id: ${place.place_id} updated.`);

			// Queue database upload
			// return databaseSync.upload();
		});
}

async function updateList(list: List): Promise<void> {
	return getDatabase()
		.then((db) =>
			db.executeSql('UPDATE List SET list_name = ? WHERE list_id = ?;', [
				list.list_name,
				list.list_id,
			]),
		)
		.then(([results]) => {
			console.log(`results: ${results}`);
			console.log(`[db] List with id: ${list.list_id} updated.`);

			// Queue database upload
			// return databaseSync.upload();
		});
}

async function deleteList(list: List): Promise<void> {
	console.log(
		`[db] Deleting list named: "${list.list_name}" with id: ${list.list_id}`,
	);
	return getDatabase()
		.then((db) => {
			// Delete list items first, then delete the list itself
			return db
				.executeSql('DELETE FROM Place WHERE list_id = ?;', [list.list_id])
				.then(() => db);
		})
		.then((db) =>
			db.executeSql('DELETE FROM List WHERE list_id = ?;', [list.list_id]),
		)
		.then(() => {
			console.log(`[db] Deleted list named: "${list.list_name}"!`);

			// Queue database upload
			// return databaseSync.upload();
		});
}
async function deletePlace(place: Place): Promise<void> {
	console.log(
		`[db] Deleting place named: "${place.place_name}" with id: ${place.place_id}`,
	);
	return getDatabase()
		.then((db) => {
			// Delete place items first, then delete the place itself
			return db
				.executeSql('DELETE FROM Place WHERE place_id = ?;', [place.place_id])
				.then(() => db);
		})
		.then(() => {
			console.log(`[db] Deleted place named: "${place.place_name}"!`);

			// Queue database upload
			// return databaseSync.upload();
		});
}

// "Private" helpers
async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
	if (databaseInstance !== undefined) {
		return Promise.resolve(databaseInstance);
	}
	// otherwise: open the database first
	return open();
}

// Open a connection to the database
async function open(): Promise<SQLite.SQLiteDatabase> {
	SQLite.DEBUG(true);
	SQLite.enablePromise(true);

	if (databaseInstance) {
		console.log(
			'[db] Database is already open: returning the existing instance',
		);
		return databaseInstance;
	}

	// Otherwise, create a new instance
	const db = await SQLite.openDatabase({
		name: DATABASE.FILE_NAME,
		location: 'default',
	});
	console.log('[db] Database open!');

	// Perform any database initialization or updates, if needed
	const databaseInitialization = new DatabaseInitialisation();
	await databaseInitialization.updateDatabaseTables(db);

	databaseInstance = db;
	return db;
}

// Close the connection to the database
async function close(): Promise<void> {
	if (databaseInstance === undefined) {
		console.log("[db] No need to close DB again - it's already closed");
		return;
	}
	const status = await databaseInstance.close();
	console.log(`[db] Database closed with status: ${status}`);
	databaseInstance = undefined;
}

// Listen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
let appState = 'active';

console.log('[db] Adding listener to handle app state changes');
AppState.addEventListener('change', handleAppStateChange);

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus) {
	if (appState === 'active' && nextAppState.match(/inactive|background/)) {
		// App has moved from the foreground into the background (or become inactive)
		console.log('[db] App has gone to the background - closing DB connection.');
		close();
	}
	appState = nextAppState;
}

export const sqliteDatabase: Database = {
	createList,
	addPlace,
	getAllLists,
	getListPlaces,
	getPlace,
	updatePlace,
	updateList,
	deleteList,
	deletePlace,
};
