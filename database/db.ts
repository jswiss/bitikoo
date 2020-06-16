import {
  createRxDatabase,
  addRxPlugin,
  RxDatabase,
  RxCollection,
  RxJsonSchema,
  RxDocument,
} from 'rxdb';

addRxPlugin(require('pouchdb-adapter-asyncstorage'));

type UserType = {
  name: string;
  email?: string;
  phone: string;
};

type ListType = {
  name: string;
  description?: string;
  photo?: string;
  places?: [PlaceType];
};

type PlaceType = {
  name: string;
  type?: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  lists?: [ListType];
  description?: string;
  photos?: [string];
};

type UserDocument = RxDocument<UserType>;
type ListDocument = RxDocument<ListType>;
export type PlaceDocument = RxDocument<PlaceType>;

type ListCollectionMethods = {
  countAllLists: () => Promise<number>;
  countPlacesInList: (listName: string) => Promise<number>;
};

type UserCollection = RxCollection<UserDocument>;
type ListCollection = RxCollection<ListDocument, ListCollectionMethods>;
type PlaceCollection = RxCollection<PlaceDocument>;

type BitikooCollections = {
  users: UserCollection;
  lists: ListCollection;
  places: PlaceCollection;
};

type BitikooDatabase = RxDatabase<BitikooCollections>;

export const db: BitikooDatabase = await createRxDatabase<BitikooCollections>({
  name: 'bitikoo',
  adapter: 'node-asyncstorage',
  multiInstance: false,
  eventReduce: true,
});

const userSchema: RxJsonSchema<UserType> = {
  title: 'user schema',
  description: 'info about user',
  version: 0,
  keyCompression: true,
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
      primary: true,
    },
    phone: {
      type: 'string',
    },
  },
  required: ['name', 'phone'],
};

const listSchema: RxJsonSchema<ListType> = {
  title: 'list schema',
  description: "info about user's list",
  version: 0,
  keyCompression: true,
  type: 'object',
  properties: {
    name: {
      type: 'string',
      primary: true,
    },
    description: {
      type: 'string',
    },
    photo: {
      type: 'string',
    },
    places: {
      type: 'array',
      ref: 'places',
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
  },
  required: ['name'],
};

const placeSchema: RxJsonSchema<PlaceType> = {
  title: 'place schema',
  description: "info about user's places",
  version: 0,
  keyCompression: true,
  type: 'object',
  properties: {
    name: {
      type: 'string',
      primary: true,
    },
    type: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    photos: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
    lists: {
      type: 'array',
      ref: 'lists',
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
    coords: {
      type: 'object',
      properties: {
        latitude: {
          type: 'number',
        },
        longitude: {
          type: 'number',
        },
      },
    },
  },
  required: ['name', 'coords'],
};

const listCollectionMethods: ListCollectionMethods = {
  countAllLists: async function (this: ListCollection) {
    const allLists = await this.find().exec();
    return allLists.length;
  },
  countPlacesInList: async function (this: ListCollection, listName: string) {
    const listPlaces = await this.find()
      .where(() => this.name === listName)
      .exec()
      .then((documents) => console.dir(documents));
    console.log(listPlaces);
    return 1;
  },
};

await db.collection({
  name: 'users',
  schema: userSchema,
});

await db.collection({
  name: 'lists',
  schema: listSchema,
  statics: listCollectionMethods,
});

await db.collection({
  name: 'places',
  schema: placeSchema,
});

console.dir(db);

db.places.postInsert(function placesPostInsertHook(
  this: PlaceCollection,
  docData: PlaceType,
  doc: PlaceDocument,
) {
  console.log(`insert ${doc.name} to ${this.name}-collection `);
},
false);

// ignoring for now...

db.destroy();

export default db;
