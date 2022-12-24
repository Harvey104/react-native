import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme, Icon, Text, Box } from 'native-base';
import { createStackNavigator } from "@react-navigation/stack";

import { useSelector } from 'react-redux';

import MyDrawer from './MyDrawer';
import AuthStack from './AuthStack';

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#F8F8FD',
      100: '#727D91',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
    yellow: {
      50: "#FFB900",
      100: '#FFF5F5',
    },
    purple: {
      50: "#6A67CE",
      100: '#727D91',
    },
    black: {
      50: '#333333',
      100: "#1D1D1D",
      
    },
    gray: {
      50: '#F5F5F5',
      100: '#828282',
      200: '#524B6B',
      300: '#4D525B',
      400: '#BDBDBD'
    },
    blue: {
      50: '#387FFF',
    },
    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
  },
});

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const Stack = createStackNavigator();

export default function MyNavigation(){

  const auth = useSelector((store) => store.auth.auth);

  return(
    <NativeBaseProvider theme={ theme } config = {config}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ auth.accessToken ? 'MyDrawer' : 'Auth' }
        >
          <Stack.Screen
            name="MyDrawer"
            component={MyDrawer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Auth'
            component={AuthStack}
            options = {{ headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}