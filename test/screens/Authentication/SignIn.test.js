import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from '../../../screens/Authentication/SignIn'
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "../../../stores/rootReducer";

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = ({ children }) => children;
    return { KeyboardAwareScrollView };
});
const store= createStore(
    rootReducer,
    applyMiddleware(thunk)
)

test('renders correctly', () => {
  const tree = renderer.create(<SignIn store={store} />).toJSON();
  expect(tree).toMatchSnapshot();
});