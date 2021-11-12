import React from 'react';
import renderer from 'react-test-renderer';
import VerticalFoodCard from '../../components/VerticalFoodCard'


test('renders correctly', () => {
  const item = {
      name:'testing',
      image:'testImage',
      calories:0
  }
  const tree = renderer.create(<VerticalFoodCard item={item} />).toJSON();
  expect(tree).toMatchSnapshot();
});