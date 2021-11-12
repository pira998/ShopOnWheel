import React from 'react';
import renderer from 'react-test-renderer';
import Layout from '../../../screens/Authentication/AuthLayout'

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = ({ children }) => children;
    return { KeyboardAwareScrollView };
});
test('renders correctly', () => {
  const tree = renderer.create(<Layout />).toJSON();
  expect(tree).toMatchSnapshot();
});