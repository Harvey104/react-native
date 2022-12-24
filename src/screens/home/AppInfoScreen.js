import React, { useState, useCallback, useRef } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Dimensions, ImageBackground } from "react-native";
import {
    Modal,
    Box,
    Text,
    Heading,
    Icon,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    HStack,
    Center,
    Pressable,
    Image
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const challenges = [
    {
        avartarUrl : require('../../../assets/img/notification_img_1.png'),
        title : 'Desafío Doble',
        description : 'Rival: Mauricio Rodríguez'
    },
    {
        avartarUrl : require('../../../assets/img/notification_img_1.png'),
        title : 'Desafío Doble',
        description : 'Rival: Mauricio Rodríguez'
    },
]

const results = [
    {
        title : 'Desafío Finalizado',
        description : 'Rival: Mauricio Rodríguez',
        imgUrl : require('../../../assets/img/notification_img_1.png'),
    },
    {   
        title : 'Desafío Finalizado',
        description : 'Rival: María José Castro',
        imgUrl : require('../../../assets/img/notification_img_2.png'),
    },
]

export default function AppInfoScreen({ navigation }) {

    const [ buttonSwitch, setButtonSwitch ] = useState(true);
    const [showDetail, setShowDetail] = useState(false);

  return(
      <Box flex={1} bg={'gray.50'} safeAreaTop width="100%" alignSelf="center">

        <Box flex={1}>
          <HStack h={'24'} w = {'full'} bg = {{
            linearGradient: {
              colors: ['#26247E', '#6A67CE'],
              location: [0.1, 0.1],
              start: [0, 0],
              end: [1, 1],
            },
          }}>
            <Box w={'1/6'}></Box>
            <Center w={'4/6'} justifyContent = {'center'} alignItems = {'center'}>
              <Text fontSize={'2xl'} lineHeight = {'3xl'} fontWeight = {'semibold'} color = {'yellow.50'}>Sobre la aplicación</Text>
            </Center>
            <Box w={'1/6'}>
              <TouchableOpacity onPress={() => navigation.openDrawer()} style = {{flex: 1, justifyContent: 'center', alignItems: 'flex-end', margin: 20}}>
                <Image source={require('../../../assets/img/menu_icon.png')} alt = "menu_icon" />
              </TouchableOpacity>
            </Box>
          </HStack>
          <ImageBackground source={require('../../../assets/img/gray_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
            <VStack justifyContent={'center'} alignItems = {'center'} space = {'8'} mt = {'10'}>
              <Text fontSize={'xl'} lineHeight = {'xl'} fontWeight = {'semibold'} color = {'purple.50'}>Términos y condiciones</Text>
              <Text fontSize={'md'} lineHeight = {'xs'} fontWeight = {'normal'} color = {'primary.100'}>Revisa nuestros términos y condiciones</Text>
              <Link
                _text={{
                  fontSize: "sm",
                  lineHeight : "2xs",
                  fontWeight : 'medium',
                  _light: {
                    color: "blue.50"
                  },
                  color: "cyan.300"
                }} href="http://beewise.cl/terminosycondiciones.php" isUnderlined _hover={{
                  _text: {
                    _light: {
                      color: "cyan.600"
                    },
                    color: "cyan.400"
                  }
                }}>
                    http://beewise.cl/terminosycondiciones.php
              </Link>
            </VStack>
          </ImageBackground>
        </Box>
      </Box>
    
  );
}
