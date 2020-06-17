import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import { App } from './App';

it('renders the bitikoo map welcome text', () => {
	const { getByText } = render(<App />);

	const mapText = getByText('This is the map');

	expect(mapText).toBeTruthy();
});
