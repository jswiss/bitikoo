export const DATABASE = {
	FILE_NAME: 'BitikooDB.db',
	BACKUP_FILE_NAME: 'BitikooDB_Backup.db',
};

export const NULL_PLACE = {
	place_id: 999,
	place_name: '',
	list_id: 999,
	desc: '',
	photo: '',
	latitude: 999,
	longitude: 999,
	created_at: '',
	updated_at: '',
};

export const LIGHT_COLOURS = [
	'gold',
	'darkorange',
	'lightgrey',
	'lightpink',
	'turquoise',
];
export const DARK_COLOURS = [
	'maroon',
	'indigo',
	'green',
	'darkslateblue',
	'black',
];
export const ALL_COLOURS = [...LIGHT_COLOURS, ...DARK_COLOURS];
