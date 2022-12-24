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

import axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { randomQuiz } from "../../redux/actions/quizAction";

import { getQuiz } from "../../utils/server";

export default function GameIntroduceScreen({navigation}) {

  const auth = useSelector((store) => store.auth.auth);
  const quiz = useSelector((store) => store.quiz.quiz);

  const dispatch = useDispatch();

  const initialQuiz = () => {
    getQuiz(auth.accessToken)
      .then((res) => {
        dispatch(randomQuiz(res));
      })
      .catch((error) => {
        console.log(error)
    });
  }

  return (
    <SafeAreaView>
      <ImageBackground source={require('../../../assets/img/purple_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
        <Box h={'full'} w = {'full'} justifyContent = {'center'} alignItems = {'center'}>
          <Box w={'5/6'} h = {'5/6'} bg = {'white'} borderRadius = {'2xl'}>
            <VStack justifyContent={'center'} m = {'10'} alignContent = {'center'}>
              <Box h={'1/2'} justifyContent = {'flex-end'} alignItems = {'center'}>
                <Image source={require('../../../assets/img/Beewise_Bee1.png')} alt = "beewise_bee1" />
              </Box>
              <VStack h={'1/2'} space = {'3'} justifyContent = {'center'}>
                <Text textAlign={'center'} fontSize={'xl'} lineHeight = {'xl'} fontWeight = {'semibold'} color = {'purple.50'}>El desafío está por comenzar</Text>
                <Text textAlign={'left'} fontSize = {'sm'} lineHeight = {'2xs'} fontWeight = {'normal'} color = {'purple.50'}>A continuación empezá la ronda de preguntas, una vez iniciado, no podrás devolverte a esta sección.</Text>
                <Button w={'full'} borderRadius = {'md'} bg = {'yellow.50'} _text = {{ color: '#000000', fontSize: 'lg', lineHeight: 'xl' }} onPress = {() => {
                    navigation.navigate('GameScreen');
                    navigation.getParent()?.setOptions({
                      tabBarStyle: { display: 'none'},
                    });
                    //initialQuiz();
                }}>
                  Iniciar
                </Button>
                <Button w={'full'} borderRadius = {'md'} variant = {'outline'} _text = {{ color: '#8684D6', fontSize: 'lg', lineHeight: 'xl' }} onPress = {() => {
                    navigation.navigate('RandomGameScreen');
                    navigation.getParent()?.setOptions({
                      tabBarStyle: { display: 'flex', height: 84 },
                    });
                }}>
                  Volver
                </Button>
              </VStack>
            </VStack>
          </Box>
        </Box>
      </ImageBackground>
    </SafeAreaView>    
  );
}