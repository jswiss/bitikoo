import React, { createContext } from 'react';
import { Database, sqliteDatabase } from '../database/database';
// import { inMemoryDatabase } from '../database/in-memory-db';

const DatabaseContext = createContext<Database | undefined>(undefined);

export const DatabaseProvider: React.FC = function (props) {
	return <DatabaseContext.Provider value={sqliteDatabase} {...props} />;
};
