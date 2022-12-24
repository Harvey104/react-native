import React, { useState, useEffect } from "react";
import { ImageBackground, SafeAreaView, View } from "react-native";
import {
  Box,
  Text,
  VStack,
  Image,
  FormControl,
  Input,
  Pressable,
  Icon,
  HStack,
  Button,
  WarningOutlineIcon,
  Radio
} from "native-base";

import { useSelector, useDispatch } from 'react-redux';
import { branchProfile } from "../../redux/actions/profileAction";

export default function DataFirstScreen({navigation}) {

    const [groupValue, setGroupValue] = React.useState("");

    const dispatch = useDispatch();

    const submit = () => {
        dispatch(branchProfile({branch: groupValue}));
    }


    return (
        <SafeAreaView>
            <ImageBackground source={require('../../../assets/img/yellow_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
            <Box h={'full'} w = {'full'} justifyContent = {'center'} alignItems = {'center'}>
                <Box w={'5/6'} h = {'5/6'} bg = {'white'} borderRadius = {'2xl'}>
                    <VStack m = {'8'}>
                        <VStack space={'5'} h = {'2/3'}>
                            <Box>
                                <Text textAlign={ 'center' } fontSize = {'2xl'} fontWeight = {'semibold'} color = {'purple.50'}>Sobre ti</Text>
                                <Text textAlign={'center'} fontSize = {'md'} fontWeight = {'normal'} color = {'purple.100'}>Ya te queda muy poco para poder jugar</Text>
                            </Box>
                            <Text fontSize={'md'} lineHeight = {'lg'} fontWeight = {'semibold'} color = {'black.50'}>¿ En que sucursal trabajas?</Text>
                            <Radio.Group name="exampleGroup" accessibilityLabel="select prize" defaultValue={groupValue} onChange={value => {
                                setGroupValue(value || "");
                            }}>
                                <HStack w={'full'} h = {'16'} justifyContent = {'space-between'} alignItems = {'center'} borderTopWidth = {'1px'} borderTopColor = {'#D9D9D9'}>
                                    <Text fontSize = {'md'} lineHeight = {'xs'} fontWeight = {'normal'} color = {'#ABB4C5'}>
                                        Mall Arauco Maipú
                                    </Text>
                                    <Radio value="Mall Arauco Maipú" my="1" />
                                </HStack>
                                <HStack w={'full'} h = {'16'} justifyContent = {'space-between'} alignItems = {'center'} borderTopWidth = {'1px'} borderTopColor = {'#D9D9D9'}>
                                    <Text fontSize = {'md'} lineHeight = {'xs'} fontWeight = {'normal'} color = {'#ABB4C5'}>
                                        Costanera center
                                    </Text>
                                    <Radio value="Costanera center" my="1" />
                                </HStack>
                                <HStack w={'full'} h = {'16'} justifyContent = {'space-between'} alignItems = {'center'} borderTopWidth = {'1px'} borderTopColor = {'#D9D9D9'}>
                                    <Text fontSize = {'md'} lineHeight = {'xs'} fontWeight = {'normal'} color = {'#ABB4C5'}>
                                        Huérfanos
                                    </Text>
                                    <Radio value="Huérfanos" my="1" />
                                </HStack>
                                <HStack w={'full'} h = {'16'} justifyContent = {'space-between'} alignItems = {'center'} borderTopWidth = {'1px'} borderTopColor = {'#D9D9D9'}>
                                    <Text fontSize = {'md'} lineHeight = {'xs'} fontWeight = {'normal'} color = {'#ABB4C5'}>
                                        Mall Sport
                                    </Text>
                                    <Radio value="Mall Sport" my="1" />
                                </HStack>
                                <HStack w={'full'} h = {'16'} justifyContent = {'space-between'} alignItems = {'center'} borderTopWidth = {'1px'} borderBottomWidth = {'1px'} borderColor = {'#D9D9D9'}>
                                    <Text fontSize = {'md'} lineHeight = {'xs'} fontWeight = {'normal'} color = {'#ABB4C5'}>
                                        Estación Central
                                    </Text>
                                    <Radio value="Estación Central" my="1" />
                                </HStack>
                            </Radio.Group>
                        </VStack>
                        <Box h = {'1/3'} justifyContent = {'flex-end'} >
                            <Button w={'full'} mt="5" borderRadius = {'md'} bg = {'purple.50'} color = {'white'} onPress = {() => {
                                submit();
                                navigation.navigate('DataThirdScreen');
                            }} >
                                Continuar
                            </Button>
                            <Button w={'full'} mt="5" borderRadius = {'md'} borderColor = {'#898A8D'} borderWidth = {'1px'} bg = {'#FFFFFF'} 
                                onPress={() => {navigation.navigate('DataInputScreen');}}
                            >
                                <Text color={'#BDBDBD'}>Volver</Text>
                            </Button>
                        </Box>
                        
                    </VStack>
                </Box>
            </Box>
            </ImageBackground>
        </SafeAreaView>    
    );
}