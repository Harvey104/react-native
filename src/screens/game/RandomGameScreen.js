import React, { useState, useCallback, useRef, useEffect  } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, View, ImageBackground } from "react-native";
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
    Avatar
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    Keyframe
} from 'react-native-reanimated';

//import { RouteNameContext } from '../../context';


export default function RandomGameScreen({ navigation }) {

    //const { setCurrentRouteName } = React.useContext(RouteNameContext);

    const height = Dimensions.get('screen').height - 200;
    const width = Dimensions.get('screen').width;

    const [apply, setApply] = useState(false);

    useEffect(() =>{
        const timeOut = setTimeout(() => {
            setApply(true)
            console.log(apply);
        }, 2000);
        
        return () => clearTimeout(timeOut);
    }, [])

    const enteringAnimationLetf = new Keyframe({
        0: {
          originX: 0,
          originY: 0,
          zIndex : 0
          //originY: 300
          //transform: [{ rotate: '45deg' }],
          
        },
        66: {
            originX: 8,
            originY: 350
        },
        90: {
          originX: width/2 - 50,
          zIndex : 1,
          //transform: [{ rotate: '0deg' }],
          easing: Easing.quad,
        },
        100 : {
            zIndex : 0
        }
        
    }).duration(2000);

    const enteringAnimationCenter = new Keyframe({
        0: {
          originX: 0,
          originY: 0,
          zIndex : 0
          //originY: 300
          //transform: [{ rotate: '45deg' }],
          
        },
        66: {
            originX: width/2 - 50,
            originY: 350
        },
        90: {
            originX: width/2 - 50,
          //transform: [{ rotate: '0deg' }],
          easing: Easing.quad,
        },
        96: {
            zIndex : 1
        },
        97 : {
            zIndex : 0
        },
        100: {
            zIndex : 0
        }

    }).duration(2000);

    const enteringAnimationRight = new Keyframe({
        0: {
            originX: 0,
            originY: 0
          //originY: 300
          //transform: [{ rotate: '45deg' }],
          
        },
        66: {
            originX: width-108,
            originY: 350
        },
        90: {
          originX: width/2 - 50,
          //transform: [{ rotate: '0deg' }],
          easing: Easing.quad,
        },
    }).duration(2000);

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
          <Box w={'full'}>
            {
                apply ?
                <VStack w={'full'} h = { height + 'px' } alignItems = {'center'} justifyContent = {'space-between'} bg = {{
                    linearGradient: {
                    colors: ['#26247E', '#6A67CE'],
                    location: [0.1, 0.1],
                    start: [0, 0],
                    end: [1, 1],
                    },
                }}>
                    <Box w={'5/6'} mt = {'20'}>
                        <Text fontSize={'2xl'} lineHeight = {'lg'} fontWeight = {'semibold'} textAlign={'center'} color = {'white'}>Hemos encontrado{'\n'}un oponente</Text>
                    </Box>
                    <Image style = {{ position: 'absolute', top: 255 }} source={require('../../../assets/img/challenge_avatar_final.png')} alt = 'final' />
                    <VStack space={'24'} w={'5/6'} alignItems = {'center'} mb = {'24'}>
                        <Box>
                            <Text textAlign={'center'} fontSize = {'md'} lineHeight = {'xs'} fontWeight = {'medium'} color = {'white'}>Rival:</Text>
                            <Text textAlign={'center'} fontSize = {'md'} lineHeight = {'xs'} fontWeight = {'medium'} color = {'yellow.50'}>Mauricio Rodríguez</Text>
                        </Box>
                        <Button w={'full'} variant = {'outline'}
                            onPress = {() => {
                                navigation.navigate('QuizVideoScreen');
                                navigation.getParent()?.setOptions({
                                    tabBarStyle: { display: 'none' },
                                });
                            }}
                        >
                            <Text fontSize={'lg'} lineHeight = {'lg'} fontWeight = {'normal'} color = {'white'}>Ir por el desafío</Text>
                        </Button>
                    </VStack>
                </VStack>
                : <HStack w={'full'} h = { height + 'px' } justifyContent = {'space-between'} bg = {{
                    linearGradient: {
                    colors: ['#26247E', '#6A67CE'],
                    location: [0.1, 0.1],
                    start: [0, 0],
                    end: [1, 1],
                    },
                }}>
                    
                    
                    <Box ml={'2'}>
                        <Animated.Image
                            source={require('../../../assets/img/challenge_avatar_left.png')}
                            entering={ enteringAnimationLetf }
                            //style = {{zIndex : 1}}
                        />
                    </Box>
                    <Box>
                        <Animated.Image
                            source={require('../../../assets/img/challenge_avatar_center.png')}
                            entering={ enteringAnimationCenter }
                            //style = {{zIndex : 1}}
                        />
                    </Box>
                    <Box mr={'2'}>
                        <Animated.Image
                            source={require('../../../assets/img/challenge_avatar_right.png')}
                            entering={ enteringAnimationRight }
                            //style = {{zIndex : 1}}
                        />
                    </Box>
                    
                </HStack>
            }
            
          </Box>
        </Box>
      </Box>
    
  );
}