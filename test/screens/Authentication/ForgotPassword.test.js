import React from 'react';
import renderer from 'react-test-renderer';
import ForgotPassword from '.../../../screens/Authentication/ForgotPassword'
jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = ({ children }) => children;
    return { KeyboardAwareScrollView };
});

test('renders correctly', () => {
  const tree = renderer.create(<ForgotPassword />).toJSON();
  expect(tree).toMatchSnapshot();
});