import { useContext } from 'react';
import { DatabaseContext } from '../containers/database-context';
import { Database } from '../database/database';

export function useDatabase(): Database {
	const database = useContext(DatabaseContext);
	if (database === undefined) {
		throw new Error('useDatabase must be used within a DatabaseProvider');
	}
	return database;
}
