import React from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Dimensions,
	Text,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';

import { EnIcon } from '../../components/en-icon';

const initialState = {
	flash: 'off',
	zoom: 0,
	autoFocus: 'on',
	autoFocusPoint: {
		normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
		drawRectPosition: {
			x: Dimensions.get('window').width * 0.5 - 32,
			y: Dimensions.get('window').height * 0.5 - 32,
		},
	},
	focusDepth: 0,
	type: 'back',
	whiteBalance: 'auto',
	ratio: '16:9',

	isRecording: false,
	canDetectFaces: false,
	canDetectText: false,
	canDetectBarcode: false,
	faces: [],
	textBlocks: [],
	barcodes: [],
};

export const Camera: React.FC = () => {
	const [
		{
			cameraRef,
			ratio,
			autoFocusPoint,
			flash,
			isRecording,
			drawFocusRingPosition,
		},
		{ touchToFocus, toggleFlash, zoomIn, zoomOut, setIsRecording, takePicture },
	] = useCamera(initialState);

	console.log({ cameraRef });
	console.log({ ratio });
	console.log({ autoFocusPoint });

	return (
		<View style={styles.grow}>
			<RNCamera
				ref={cameraRef}
				// eslint-disable-next-line
				flashMode={flash}
				autoFocusPointOfInterest={autoFocusPoint.normalized}
				type="back"
				ratio={ratio}
				style={styles.grow}
				autoFocus="on"
				permissionDialogTitle={'Permission to use camera'}
				permissionDialogMessage={
					'We need your permission to use your camera phone'
				}>
				<View style={StyleSheet.absoluteFill}>
					<View style={[styles.autoFocusBox, drawFocusRingPosition]} />
					<TouchableWithoutFeedback onPress={touchToFocus}>
						<View style={styles.grow} />
					</TouchableWithoutFeedback>
				</View>
				<View style={styles.cameraControls}>
					<TouchableOpacity
						style={[styles.flipButton, styles.controlButton]}
						onPress={zoomIn}>
						<Text style={styles.flipText}> + </Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.flipButton, styles.controlButton]}
						onPress={zoomOut}>
						<Text style={styles.flipText}> - </Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					style={[styles.bubble, styles.button]}
					onPress={async () => {
						try {
							setIsRecording(true);
							const data = await takePicture();
							// TODO: Install CameraRoll, use it to save the local file there, and get the URI on CameraRoll to access the pic
							console.log('CAMERA DATA', data);
						} catch (error) {
							console.error('EEEEEERRROOOOORRRRRR', error);
						} finally {
							setIsRecording(false);
						}
					}}>
					<EnIcon name="camera" size={50} colour="black" />
				</TouchableOpacity>
			</RNCamera>
		</View>
	);
};

const styles = StyleSheet.create({
	grow: {
		flex: 1,
		alignItems: 'center',
		width: '90%',
		height: '90%',
	},
	cameraControls: {
		height: 56,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		alignSelf: 'flex-end',
	},
	controlButton: {
		flex: 0.1,
		alignSelf: 'flex-end',
	},
	flipButton: {
		flex: 0.3,
		height: 40,
		marginHorizontal: 2,
		marginBottom: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 10,
		borderRadius: 8,
		borderColor: 'white',
		borderWidth: 1,
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	flipText: {
		color: 'white',
		fontSize: 15,
	},
	bubble: {
		width: '80%',
		height: '80%',
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
	autoFocusBox: {
		position: 'absolute',
		height: 64,
		width: 64,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: 'white',
		opacity: 0.4,
	},
});
