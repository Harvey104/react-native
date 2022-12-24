import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Icon } from 'native-base';

import TabNavigator from './TabNavigator';
import CustomSidebarMenu from './CustomSidebarMenu';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {

  //const [currentRouteName, setCurrentRouteName] = React.useState(undefined);

  return (
    // <RouteNameContext.Provider
    //   value={{ currentRouteName, setCurrentRouteName }}>
      <Drawer.Navigator
        initialRouteName="TabNavigator"
        // ISSUE HERE - Change this value to 'left'
        drawerPosition="right"
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{
            drawerLabel: () => <Text color={'white'} >Inicio</Text>,
            drawerIcon: ({ focused, color, size }) => <Icon mb="1" as={<MaterialCommunityIcons name={ focused ? 'home' : 'home-outline'} />} color="white" size="2xl" />
          }}
        />
        {/* <Drawer.Screen
          name="TabNavigator1"
          component={TabNavigator}
          options={{
            drawerLabel: () => <Text color={'white'} >Perfil</Text>,
            drawerIcon: ({ focused, color, size }) => <Icon mb="1" as={<MaterialCommunityIcons name={ focused ? 'account-circle' : 'account-circle-outline'} />} color="white" size="2xl" />
          }}
        /> */}
        {/* <Drawer.Screen
          name="AppInfo"
          component={TabNavigator}
          options={{
            drawerLabel: () => <Text color={'white'} >Sobre la aplicación</Text>,
            drawerIcon: ({ focused, color, size }) => <Icon mb="1" as={<MaterialCommunityIcons name={ focused ? 'information' : 'information-outline'} />} color="white" size="2xl" />
          }}
        />
        <Drawer.Screen
          name="TabNavigator3"
          component={TabNavigator}
          options={{
            drawerLabel: () => <Text color={'white'} >Soporte</Text>,
            drawerIcon: ({ focused, color, size }) => <Icon mb="1" as={<MaterialCommunityIcons name={ focused ? 'headset' : 'headset'} />} color="white" size="2xl" />
          }}
        />
        <Drawer.Screen
          name="TabNavigator4"
          component={TabNavigator}
          options={{
            drawerLabel: () => <Text color={'white'} >Configuración</Text>,
            drawerIcon: ({ focused, color, size }) => <Icon mb="1" as={<MaterialCommunityIcons name={ focused ? 'cog' : 'cog-outline'} />} color="white" size="2xl" />
          }}
        /> */}
      </Drawer.Navigator>
    // </RouteNameContext.Provider>
  );
}