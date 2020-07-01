import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';

import { useGeolocation } from '../../hooks/use-geolocation';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const MapScreen: React.FC = () => {
	const [err, position] = useGeolocation();

	return (
		<View style={styles.container}>
			{!err && position.latitude !== 0 && (
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: position.latitude,
						longitude: position.longitude,
						latitudeDelta: LATITUDE_DELTA,
						longitudeDelta: LONGITUDE_DELTA,
					}}
				/>
			)}
			<View pointerEvents="none" style={styles.members} />
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={[styles.bubble, styles.button]}>
					<Text>Fit Markers Onto Map</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	bubble: {
		flex: 1,
		backgroundColor: 'rgba(255,255,255,0.7)',
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderRadius: 20,
		marginRight: 20,
	},
	button: {
		width: 80,
		paddingHorizontal: 12,
		alignItems: 'center',
		marginHorizontal: 10,
	},
	buttonContainer: {
		flexDirection: 'row',
		marginVertical: 20,
		backgroundColor: 'transparent',
		marginBottom: 400,
	},
	members: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		paddingHorizontal: 10,
	},
});
