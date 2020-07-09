import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';

import { Camera } from '../../components/camera';
import { EnIcon } from '../../components/en-icon';
import { useGeolocation } from '../../hooks/use-geolocation';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const MapScreen: React.FC = () => {
	const [err, position] = useGeolocation();
	const [cameraOpen, setCameraOpen] = useState<boolean>(false);

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
				<TouchableOpacity
					style={[styles.bubble, styles.button]}
					onPress={() => setCameraOpen(true)}>
					<EnIcon name="plus" size={50} colour="black" />
				</TouchableOpacity>
			</View>
			{cameraOpen && <Camera />}
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
		width: 80,
		height: 80,
		backgroundColor: 'rgba(255,255,255,0.7)',
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderRadius: 50,
		marginRight: 20,
	},
	button: {
		width: 80,
		height: 80,
		paddingHorizontal: 12,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 10,
	},
	buttonContainer: {
		width: 80,
		height: 80,
		flexDirection: 'row',
		marginVertical: 20,
		backgroundColor: 'transparent',
		marginBottom: 50,
		justifyContent: 'center',
	},
	members: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingHorizontal: 10,
	},
});
