import React from "react";
import { Home } from "./screens/Home";
import configureStore from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";
import {LogBox} from "react-native"

const store = configureStore();

const App = () => {

  LogBox.ignoreLogs(["VirtualizedLists should never be nested","VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.","Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.","Invariant Violation: Tried to register two views with the same name RNSVGSvgView","Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.", "Warning: React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.", "Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.", "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead"])
  LogBox.ignoreAllLogs(true)
  
  return (   
      <ReduxProvider store={store}>
          <Home />
      </ReduxProvider>
  );
};

export default App;
