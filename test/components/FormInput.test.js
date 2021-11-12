import React from 'react';
import renderer from 'react-test-renderer';
import FormInput from '../../components/FormInput'


test('renders correctly', () => {
  const tree = renderer.create(<FormInput />).toJSON();
  expect(tree).toMatchSnapshot();
});