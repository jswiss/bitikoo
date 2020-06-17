/**
 * @format
 */

import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import { App } from './App';

it('renders the bitikoo welcome text', () => {
  const { getByText } = render(<App />);

  const welcomeText = getByText('Welcome to Bitikoo');

  expect(welcomeText).toBeTruthy();
});
