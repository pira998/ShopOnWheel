import React from 'react';
import renderer from 'react-test-renderer';
import IconButton from '../../components/IconButton'


test('renders correctly', () => {
  const tree = renderer.create(<IconButton />).toJSON();
  expect(tree).toMatchSnapshot();
});