import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { 
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  EmailVerifyScreen,
  ResetPasswordScreen,
  ResetPasswordSuccessScreen,
  RegisterSuccessScreen,
  IntroSliderScreen,
  DataInputScreen,
  DataFirstScreen,
  DataSecondScreen,
  DataThirdScreen
} from '../../screens/auth';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
        headerShown: false,
        }}
    >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="RegisterSuccessScreen" component={RegisterSuccessScreen} />
        <Stack.Screen name="IntroSliderScreen" component={IntroSliderScreen} />
        <Stack.Screen name="DataInputScreen" component={DataInputScreen} />
        <Stack.Screen name="DataFirstScreen" component={DataFirstScreen} />
        <Stack.Screen name="DataSecondScreen" component={DataSecondScreen} />
        <Stack.Screen name="DataThirdScreen" component={DataThirdScreen} />
        <Stack.Screen name="EmailVerifyScreen" component={EmailVerifyScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        />
        <Stack.Screen
        name="ResetPasswordSuccessScreen"
        component={ResetPasswordSuccessScreen}
        />
    </Stack.Navigator>
  );
};
