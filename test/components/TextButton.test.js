import React from 'react';
import renderer from 'react-test-renderer';
import TextButton from '../../components/AuthTextButton';


test('renders correctly', () => {
  const tree = renderer.create(<TextButton />).toJSON();
  expect(tree).toMatchSnapshot();
});