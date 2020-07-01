import 'react-native';
import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import { renderHook } from '@testing-library/react-hooks';

import { useGeolocation } from '../../hooks/use-geolocation';
import { App } from './App';

afterEach(cleanup);

it('renders the bitikoo map welcome text', () => {
	const [err, position] = renderHook(() => useGeolocation());
	console.log(position);

	const { getByText } = render(<App />);
	expect(err).toBeNull();
	const mapText = getByText('Fit Markers Onto Map');

	expect(mapText).toBeTruthy();
});
