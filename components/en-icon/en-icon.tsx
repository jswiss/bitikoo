import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
	name: string;
	size: number;
	colour: string;
}

export const EnIcon = ({ name, size, colour }: Props) => (
	<Icon name={name} size={size} color={colour} />
);
