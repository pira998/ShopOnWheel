import React from 'react';
import renderer from 'react-test-renderer';
import TextIconButton from '../../components/AuthTextIconButton'


test('renders correctly', () => {
  const tree = renderer.create(<TextIconButton />).toJSON();
  expect(tree).toMatchSnapshot();
});