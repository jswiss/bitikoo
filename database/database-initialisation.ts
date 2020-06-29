import SQLite, { Transaction } from 'react-native-sqlite-storage';

export class DatabaseInitialisation {
	// Perform any updates to the database schema. These can occur during initial configuration, or after an app store update.
	// This should be called each time the database is opened.
	public updateDatabaseTables(
		database: SQLite.SQLiteDatabase,
	): Promise<void | Transaction> {
		let dbVersion: number = 0;
		console.log('Beginning database updates...');

		// First: create tables if they do not already exist
		return database
			.transaction(this.createTables)
			.then(() => {
				// Get the current database version
				return this.getDatabaseVersion(database);
			})
			.then((version) => {
				dbVersion = version;
				console.log('Current database version is: ' + dbVersion);

				// Perform DB updates based on this version

				// This is included as an example of how you make database schema changes once the app has been shipped
				if (dbVersion < 1) {
					// Uncomment the next line, and the referenced function below, to enable this
					return database.transaction(this.preVersion1Inserts);
				}
				// otherwise,
				return;
			})
			.then(() => {
				if (dbVersion < 2) {
					// Uncomment the next line, and the referenced function below, to enable this
					return database.transaction(this.preVersion2Inserts);
				}
				// otherwise,
				return;
			});
	}

	private createTables(transaction: SQLite.Transaction) {
		// DANGER! For dev only
		const dropAllTables = false;
		if (dropAllTables) {
			transaction.executeSql('DROP TABLE IF EXISTS List;');
			transaction.executeSql('DROP TABLE IF EXISTS Place;');
			transaction.executeSql('DROP TABLE IF EXISTS Version;');
		}

		transaction.executeSql(
			`CREATE TABLE IF NOT EXISTS List(
        list_id INTEGER PRIMARY KEY NOT NULL,
        list_name TEXT NOT NULL,
        colour TEXT
      );`,
		);
		transaction.executeSql(
			`CREATE TABLE IF NOT EXISTS Place(
        place_id INTEGER PRIMARY KEY NOT NULL,
        place_name TEXT,
        list_id INTEGER,
        desc TEXT,
        photo: TEXT,
        latitude REAL,
        longitude REAL,
        created_at NUMERIC,
        updated_at NUMERIC,
        FOREIGN_KEY (list_id) REFERENCES List (list_id)
      );`,
		);
		transaction.executeSql(
			`CREATE TABLE IF NOT EXISTS Version(
				version_id INTEGER PRIMARY KEY NOT NULL,
				version INTEGER
				);`,
		);
	}

	private getDatabaseVersion(database: SQLite.SQLiteDatabase): Promise<number> {
		return database
			.executeSql('SELECT version FROM Version ORDER BY version DESC LIMIT 1')
			.then(([results]) => {
				if (results.rows && results.rows.length > 0) {
					const version = results.rows.item(0).version;
					return version;
				} else {
					return 0;
				}
			})
			.catch((error) => {
				console.log(`No version set. Returning 0. Details: ${error}`);
				return 0;
			});
	}

	private preVersion1Inserts(transaction: SQLite.Transaction) {
		console.log('Running pre-version 1 DB inserts');
		// Make schema changes
		transaction.executeSql('ALTER TABLE ...');
		// Lastly, update the database version
		transaction.executeSql('INSERT INTO Version (version) VALUES (1);');
	}
	// This function should be called when the version of the db is < 2
	private preVersion2Inserts(transaction: SQLite.Transaction) {
		console.log('Running pre-version 2 DB inserts');

		// Make schema changes
		transaction.executeSql('ALTER TABLE ...');
		// Lastly, update the database version
		transaction.executeSql('INSERT INTO Version (version) VALUES (2);');
	}
}
