import React from 'react';

interface Props {
	colour: string;
}

export const ColourBox: React.FC<Props> = ({ colour }) => {
	return (
		<svg width="50" height="50">
			<rect x="0" y="0" width="50" height="50" fill={colour} />
		</svg>
	);
};
