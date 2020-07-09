import React from 'react';
import { Svg, Rect } from 'react-native-svg';

interface Props {
	colour: string;
}

export const ColourBox: React.FC<Props> = ({ colour }) => {
	return (
		<Svg width="50" height="50">
			<Rect x="0" y="0" width="50" height="50" fill={colour} />
		</Svg>
	);
};
