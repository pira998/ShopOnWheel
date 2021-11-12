import React from 'react';
import renderer from 'react-test-renderer';
import EmailSentSuccess from '.../../../screens/Authentication/EmailSentSuccess'
jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = ({ children }) => children;
    return { KeyboardAwareScrollView };
});

test('renders correctly', () => {
  const tree = renderer.create(<EmailSentSuccess />).toJSON();
  expect(tree).toMatchSnapshot();
});