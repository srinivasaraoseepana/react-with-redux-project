import React from "react";
import PlayGround from "./PlayGround";
import { Provider } from "react-redux";
import store from "./project1-with-redux/store/Store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PlayGround />
      </Provider>
    </>
  );
};

export default App;
