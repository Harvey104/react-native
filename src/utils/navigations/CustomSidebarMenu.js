import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,  
  Linking,
} from 'react-native';
import {
  Box, HStack, VStack, Text, Button, Icon
} from 'native-base';
 
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { MainStackNavigator } from "./HomeMainTab";

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authAction';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
 
export default function CustomSidebarMenu(props) {
  const auth = useSelector((store) => store.auth.auth);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const userLogout = () => {
    dispatch(logout());
    GoogleSignin.configure({
      androidClientId: '829864696791-mq4bl3vccijffn8pci2hdn2qkqcmt55s.apps.googleusercontent.com',
      iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
    });
    GoogleSignin.signOut()
      .then((respones) => {
        console.log('logout sucess');
      })
      .catch((err) => {
        console.log(err.message);
      })
    navigation.navigate('LoginScreen');
  }

  return (
    <Box flex={1} bg = {{
      linearGradient: {
        colors: ['#26247E', '#6A67CE'],
        location: [0.9, 0.9],
        start: [0, 0],
        end: [0, 1],
      },
    }}>
      
      {/*Top Large Image */}
      <HStack mx={'4'} mt = {'20'} alignItems={'center'} justifyContent = {'flex-start'} >
        <Image source={require('../../../assets/img/avatar.png')} alt = 'avatar' />
        <VStack alignItems={'flex-start'} justifyContent = {'center'}>
          <Text fontSize={'xl'} lineHeight = {'lg'} fontWeight={'semibold'} color={'yellow.50'}>{auth.username}</Text>
          <Text fontSize={'sm'} lineHeight = {'2xs'} fontWeight = {'normal'} color={'yellow.50'}>Jugador</Text>
        </VStack>
      </HStack>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <VStack flex={8}>
        <DrawerItem
            label = { ({focused, color, size}) => <Text color={'white'} >Perfil</Text> }
            icon = {({ focused, color, size }) => <Icon mb="1" as={<MaterialCommunityIcons name={ focused ? 'account-circle' : 'account-circle-outline'} />} color="white" size="2xl" />}
            onPress = {() => {
              navigation.navigate("Profile")
            }}
        />
        <DrawerItem
            label = { ({focused, color, size}) => <Text color={'white'} >Sobre la aplicación</Text> }
            icon = {({ focused, color, size }) => <Icon mb="1" as={<MaterialCommunityIcons name={ focused ? 'information' : 'information-outline'} />} color="white" size="2xl" />}
            onPress = {() => {
              navigation.navigate("AppInfoScreen")
            }}
        />
        <DrawerItem
            label = { ({focused, color, size}) => <Text color={'white'} >Soporte</Text> }
            icon = {({ focused, color, size }) => <Icon mb="1" as={<MaterialCommunityIcons name={ focused ? 'headset' : 'headset'} />} color="white" size="2xl" />}
            onPress = {() => {
              navigation.navigate("SupportScreen")
            }}
        />
        <DrawerItem
            label = { ({focused, color, size}) => <Text color={'white'} >Configuración</Text> }
            icon = {({ focused, color, size }) => <Icon mb="1" as={<MaterialCommunityIcons name={ focused ? 'cog' : 'cog-outline'} />} color="white" size="2xl" />}
        />
      </VStack>
      <Box justifyContent = {'center'} alignItems = {'center'}>
        <Button w={'5/6'} mb = {'5'} borderRadius = {'md'} borderColor = {'#898A8D'} borderWidth = {'1px'} variant="outline" onPress={() => {
          userLogout();
        }} >
            <Text color={'white'}>Cerrar sesión</Text>
        </Button>
      </Box>
    </Box>
  );
};
 
const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});