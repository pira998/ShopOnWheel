import React from 'react';
import renderer from 'react-test-renderer';
import TextIconButton from '../../components/MapTextIconButton.js'


test('renders correctly', () => {
  const tree = renderer.create(<TextIconButton />).toJSON();
  expect(tree).toMatchSnapshot();
});