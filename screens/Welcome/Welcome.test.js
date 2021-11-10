import React from 'react';
import renderer from 'react-test-renderer';

import Welcome from './Welcome';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "../../stores/rootReducer";
import { createStore,applyMiddleware } from "redux";
const store= createStore(
    rootReducer,
    applyMiddleware(thunk)
)
jest.mock('react-native-keyboard-aware-scroll-view');

describe('<Welcome />', () => {
 it('renders correctly', () => {
  const tree = renderer.create(<Welcome store={store} />).toJSON();
  expect(tree).toMatchSnapshot();
});
});
