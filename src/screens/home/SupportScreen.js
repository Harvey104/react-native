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
    Image,
    CircleIcon,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SupportScreen({ navigation }) {

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
            <VStack space = {'5'} mt = {'10'}>
                <Text textAlign={'center'} fontSize={'xl'} lineHeight = {'xl'} fontWeight = {'semibold'} color = {'purple.50'}>Video Tutoriales</Text>
                <VStack ml={'10'} space = {'5'}>
                    <VStack space={'2'}>
                        <HStack space={2} alignItems = {'center'} ml = {'2'}>
                            <CircleIcon size={"2"} color={"primary.100"} />
                            <Text color={"primary.100"} fontSize={"md"} lineHeight = {'xs'} fontWeight = {'medium'} >
                                Sobre Beewise
                            </Text>
                        </HStack>
                        <Text color={"primary.100"} fontSize={"sm"} lineHeight = {'2xs'} fontWeight = {'normal'}>
                            Revisa en que consiste Beewise y como puedes aprender jugando.
                        </Text>
                        <Link
                            _text={{
                                fontSize: "sm",
                                lineHeight : "2xs",
                                fontWeight : 'medium',
                                _light: {
                                    color: "blue.50"
                                },
                                color: "cyan.300"
                            }} href="https://www.youtube.com/watch?v=8gYH7GYhfnI" isUnderlined _hover={{
                                _text: {
                                    _light: {
                                    color: "cyan.600"
                                    },
                                    color: "cyan.400"
                                }
                            }}
                            ml = {'2'}
                        >
                                https://www.youtube.com/watch?v=8gYH7GYhfnI
                        </Link>
                    </VStack>
                    <VStack space={'3'}>
                        <HStack space={2} alignItems = {'center'} ml = {'2'}>
                            <CircleIcon size={"2"} color={"primary.100"} />
                            <Text color={"primary.100"} fontSize={"md"} lineHeight = {'xs'} fontWeight = {'medium'} >
                                Puntuación
                            </Text>
                        </HStack>
                        <Text color={"primary.100"} fontSize={"sm"} lineHeight = {'2xs'} fontWeight = {'normal'}>
                            Si quieres diferenciar de mejor manera entre Ponderado y No Ponderado, revisa este tutorial.
                        </Text>
                        <Link
                            _text={{
                                fontSize: "sm",
                                lineHeight : "2xs",
                                fontWeight : 'medium',
                                _light: {
                                    color: "blue.50"
                                },
                                color: "cyan.300"
                            }} href="https://www.youtube.com/watch?v=8gYH7GYhfnI" isUnderlined _hover={{
                                _text: {
                                    _light: {
                                    color: "cyan.600"
                                    },
                                    color: "cyan.400"
                                }
                            }}
                            ml = {'2'}
                        >
                                https://www.youtube.com/watch?v=8gYH7GYhfnI
                        </Link>
                    </VStack>
                    <VStack space={'3'}>
                        <HStack space={2} alignItems = {'center'} ml = {'2'}>
                            <CircleIcon size={"2"} color={"primary.100"} />
                            <Text color={"primary.100"} fontSize={"md"} lineHeight = {'xs'} fontWeight = {'medium'} >
                                Desafío, Competencias y Juegos
                            </Text>
                        </HStack>
                        <Text color={"primary.100"} fontSize={"sm"} lineHeight = {'2xs'} fontWeight = {'normal'}>
                            Aprende las diferencias entre estos 3 terminos y que significan cada uno.
                        </Text>
                        <Link
                            _text={{
                                fontSize: "sm",
                                lineHeight : "2xs",
                                fontWeight : 'medium',
                                _light: {
                                    color: "blue.50"
                                },
                                color: "cyan.300"
                            }} href="https://www.youtube.com/watch?v=8gYH7GYhfnI" isUnderlined _hover={{
                                _text: {
                                    _light: {
                                    color: "cyan.600"
                                    },
                                    color: "cyan.400"
                                }
                            }}
                            ml = {'2'}
                        >
                                https://www.youtube.com/watch?v=8gYH7GYhfnI
                        </Link>
                    </VStack>
                </VStack>
            </VStack>
          </ImageBackground>
        </Box>
      </Box>
    
  );
}
