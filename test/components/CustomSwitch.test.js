import React from 'react';
import renderer from 'react-test-renderer';
import CustomSwitch from '../../components/CustomSwitch'


test('renders correctly', () => {
  const tree = renderer.create(<CustomSwitch />).toJSON();
  expect(tree).toMatchSnapshot();
});