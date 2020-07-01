import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

export interface GeolocationData {
	latitude: number;
	longitude: number;
}

export const useGeolocation = (): [string, GeolocationData] => {
	Geolocation.setRNConfiguration({
		skipPermissionRequests: true,
		authorizationLevel: 'always',
	});
	const [error, setError] = useState('');
	const [position, setPosition] = useState<GeolocationData>({
		latitude: 0,
		longitude: 0,
	});

	useEffect(() => {
		const watchId = Geolocation.watchPosition(
			(pos) => {
				setError('');
				setPosition({
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude,
				});
			},
			(e) => setError(e.message),
		);
		return () => Geolocation.clearWatch(watchId);
	}, [error]);

	return [error, position];
};
