import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Home } from "./screens/Home";
import { CoinScreen } from "./screens/CoinScreen";

import configureStore from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";

import {LogBox} from "react-native"

const store = configureStore();

const RootNavigation = () => {

  const Stack = createStackNavigator();

  LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.","Invariant Violation: Tried to register two views with the same name RNSVGSvgView","Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.", "Warning: React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."])
  LogBox.ignoreAllLogs(true)
  
  return (
    <NavigationContainer>
      <ReduxProvider store={store}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            gestureEnabled: true,
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Coin" component={CoinScreen} />
        </Stack.Navigator>
      </ReduxProvider>
    </NavigationContainer>
  );
};

export default RootNavigation;
