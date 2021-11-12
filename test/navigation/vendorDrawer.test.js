import React from 'react';
import renderer from 'react-test-renderer';
import vendorDrawer from '../../navigation/vendordrawer'


test('renders correctly', () => {

  const tree = renderer.create(<vendorDrawer/>).toJSON();
  expect(tree).toMatchSnapshot();
});