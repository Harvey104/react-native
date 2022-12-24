import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MainStackNavigator, NotificationStackNavigator, ProfileStackNavigator } from "./HomeMainTab";
//import { RouteNameContext } from "../../context";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    //const { currentRouteName } = React.useContext(RouteNameContext);

    const [ display, setDisplay ] = useState('none');

  return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={() => ({
            tabBarActiveBackgroundColor: "#6A67CE",
            tabBarInactiveBackgroundColor: "#6A67CE",
            headerShown: false,
            tabBarStyle: {
                borderWidth: 1,
            },
        })}
    >
        <Tab.Screen name="Notification" component={NotificationStackNavigator}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Icon mb="1" as={<MaterialCommunityIcons name={focused ? 'bell' : 'bell-outline'} />} color = "white" size="2xl" />
                ),
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { display: "flex", height: 84 },
        }} />
        <Tab.Screen name="Home" component={MainStackNavigator}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Icon mb="1" as={<MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} />} color = "white" size="2xl" />
                ),
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { display: "flex", height: 84 },
        }} />
        <Tab.Screen name="Profile" component={ProfileStackNavigator}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Icon mb="1" as={<MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} />} color = "white" size="2xl" />
                ),
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { display: "flex", height: 84 },
        }} />
              
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;