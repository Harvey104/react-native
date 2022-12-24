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

export default function ResetPasswordSuccessScreen({navigation}) {

  return (
    <SafeAreaView>
      <ImageBackground source={require('../../../assets/img/purple_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
        <Box h={'full'} w = {'full'} justifyContent = {'center'} alignItems = {'center'}>
          <Box w={'5/6'} h = {'5/6'} bg = {'white'} borderRadius = {'2xl'}>
            <VStack space={'2'} m = {'10'} justifyContent = {'center'} alignItems = {'center'}>
              <Image source={require('../../../assets/img/Beewise_Bee1.png')} alt = "beewise_bee1" />
              <Text textAlign={ 'center' } fontSize = {'2xl'} lineHeight = {'4xl'} fontWeight = {'semibold'} color = {'purple.50'}>Revisa tu email</Text>
              <Text textAlign={'center'} fontSize = {'md'} lineHeight = {'lg'} fontWeight = {'normal'} color = {'purple.100'}>a carlos.venegas@blanco.cl para que{'\n'}puedas verificar tu cuenta</Text>
              <Button w={'full'} mt="5" borderRadius = {'md'} bg = {'yellow.50'} color = {'black.100'} onPress = {() => {
                  navigation.navigate('LoginScreen');
              }} >
                  Revisar email
              </Button>
              
            </VStack>
          </Box>
        </Box>
      </ImageBackground>
    </SafeAreaView>    
  );
}