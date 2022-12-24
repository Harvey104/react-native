import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  HomeScreen,
  NotificationScreen,
  ProfileScreen,
  AppInfoScreen,
  SupportScreen,
} from "../../screens/home";

import {
  EnterScreen,
  ManualGameScreen,
  RandomGameScreen,
  GameIntroduceScreen,
  QuizVideoScreen,
  GameScreen
} from "../../screens/game";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{ headerShown: false, }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AppInfoScreen" component={AppInfoScreen} />
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
      <Stack.Screen name="EnterScreen" component={EnterScreen} />
      <Stack.Screen name="ManualGameScreen" component={ManualGameScreen} />
      <Stack.Screen name="RandomGameScreen" component={RandomGameScreen} />
      <Stack.Screen name="GameIntroduceScreen" component={GameIntroduceScreen} />
      <Stack.Screen name="QuizVideoScreen" component={QuizVideoScreen} />
      <Stack.Screen name="GameScreen" component={GameScreen} />
    </Stack.Navigator>
  );
}

const NotificationStackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{ headerShown: false, }}
    >
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
}

const ProfileStackNavigator = () => {
    return(
        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

export { MainStackNavigator, NotificationStackNavigator, ProfileStackNavigator };