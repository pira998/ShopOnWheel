import React from 'react';
import renderer from 'react-test-renderer';
import HeaderBar from '../../components/HeaderBar'


test('renders correctly', () => {
  const tree = renderer.create(<HeaderBar />).toJSON();
  expect(tree).toMatchSnapshot();
});