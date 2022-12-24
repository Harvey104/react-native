import React, { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
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
  Button
} from "native-base";

export default function RegisterSuccessScreen({navigation}) {

    return (
        <SafeAreaView>
            <ImageBackground source={require('../../../assets/img/purple_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
            <Box h={'full'} w = {'full'} justifyContent = {'center'} alignItems = {'center'}>
                <Box w={'5/6'} h = {'5/6'} bg = {'white'} borderRadius = {'2xl'}>
                <VStack space={'2'} m = {'10'} justifyContent = {'center'} alignItems = {'center'}>
                    <Image source={require('../../../assets/img/Beewise_Bee1.png')} alt = "beewise_bee1" />
                    <Text textAlign={ 'center' } fontSize = {'2xl'} lineHeight = {'4xl'} fontWeight = {'semibold'} color = {'purple.50'}>Revisa tu email</Text>
                    <Text textAlign={'center'} fontSize = {'md'} lineHeight = {'lg'} fontWeight = {'normal'} color = {'purple.100'}>carlos.venegas@blanco.cl para validar tu cuenta</Text>
                    <Button w={'full'} mt="5" borderRadius = {'md'} bg = {'yellow.50'} onPress = {() => {
                        navigation.navigate('IntroSliderScreen');
                    }} >
                        <Text color={'black.50'}>Revisar email</Text>
                    </Button>
                    
                </VStack>
                </Box>
            </Box>
            </ImageBackground>
        </SafeAreaView>    
    );
}