import React from 'react';
import renderer from 'react-test-renderer';
import Otp from '../../../screens/Authentication/Otp'

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = ({ children }) => children;
    return { KeyboardAwareScrollView };
});

test('renders correctly', () => {
  const tree = renderer.create(<Otp />).toJSON();
  expect(tree).toMatchSnapshot();
});