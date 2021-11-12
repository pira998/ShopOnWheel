import React from 'react';
import renderer from 'react-test-renderer';
import HorizontalFoodCard from '../../components/HorizontalFoodCard'


test('renders correctly', () => {
  const item = {
      name:'testing',
      image:'testImage'
  }
  const tree = renderer.create(<HorizontalFoodCard item={item} />).toJSON();
  expect(tree).toMatchSnapshot();
});