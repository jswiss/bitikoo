import Vasern from 'vasern';

const placeSchema = {
	name: 'Places',
	props: {
		place_name: 'string',
		description: '?string',
		latitude: 'string',
		longitude: 'string',
	},
};

export const vasernDB = new Vasern({
	schemas: [placeSchema],
	version: 1,
});
