export interface Place {
	place_id: number;
	place_name: string;
	list_id: number;
	desc?: string;
	photo?: string;
	latitude: number;
	longitude: number;
	created_at?: string;
	updated_at?: string;
}