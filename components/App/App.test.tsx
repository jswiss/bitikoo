import 'react-native';
import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import { App } from './App';

afterEach(cleanup);

it('renders the bitikoo map welcome text', () => {
	const { getByText } = render(<App />);

	const mapText = getByText('This is the map');

	expect(mapText).toBeTruthy();
});
