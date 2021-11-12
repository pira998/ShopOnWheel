import React from 'react';
import renderer from 'react-test-renderer';
import customDrawer from '../../navigation/customdrawer'
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "../../stores/rootReducer";

const store= createStore(
    rootReducer,
    applyMiddleware(thunk)
)
test('renders correctly', () => {

  const tree = renderer.create(<customDrawer store={store}/>).toJSON();
  expect(tree).toMatchSnapshot();
});