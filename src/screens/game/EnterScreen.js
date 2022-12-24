import React, { useState, useCallback, useRef, useEffect } from 'react';
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
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setRate } from '../../redux/actions/quizAction';
import { setCompetitor } from '../../redux/actions/competitorAction'; 
import { randomQuiz } from '../../redux/actions/quizAction';
import { BASE_URL } from '../../config';

const quizeType = [
    {
        rate : 'Simple',
        success : 'Ganas 100 puntos',
        failure : 'Pierdes 50 puntos',
        score : {
          win : 100,
          lose: 50
        }
    },
    {
        rate : 'Doble',
        success : 'Ganas 200 puntos',
        failure : 'Pierdes 150 puntos',
        score : {
          win : 200,
          lose: 150
        }
    },
    {
        rate : 'Simple',
        success : 'Ganas 500 puntos',
        failure : 'Pierdes 500 puntos',
        score : {
          win : 500,
          lose: 500
        }
    }
]

export default function EnterScreen({ navigation }) {

    const [ buttonSwitch, setButtonSwitch ] = useState(true);
    const [showDetail, setShowDetail] = useState(false);
    const [selectionType, setSelectionType] = useState(0);

    const dispatch = useDispatch();
    const competition = useSelector((store) => store.competition.competition.competition);
    const auth = useSelector((store) => store.auth.auth);

    const setRateAction = (rate) => {
      dispatch(setRate(quizeType[rate].score));
    }

    const getCompetition = () => {

      var data = JSON.stringify({
        "competitionId": competition.id,
        "teamNumber": competition.teamNumber,
        "topicId": competition.topicId
      });

      var config = {
        method: 'post',
        url: BASE_URL + '/api/game/challenger/list',
        //crossdomain: true,
        headers: {
          'Content-Type': 'application/json', 
          'x-access-token': auth.accessToken
        },
        data: data
      };
  
      axios(config)
        .then(function (response) {
          dispatch(setCompetitor(response.data.challengers));
          dispatch(randomQuiz(response.data.quiz));
          console.log(response.data.quiz);
        })
        .catch(function (error) {
          console.log(error);
        });
  
    }
    useEffect(() => {
      getCompetition();
    });

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
            <VStack justifyContent={'center'} alignItems = {'center'} space = {'3'}>
              <VStack>
                <Text textAlign={'center'} fontSize = {'xl'} lineHeight = {'xl'} fontWeight = {'semibold'} color = {'purple.50'}>¿Quieres iniciar un desafío?</Text>
                <Text textAlign={'center'} fontSize = {'sm'} lineHeight = {'xs'} fontWeight = {'normal'} color = {'primary.100'}>Puntos que obtienes por cada respuesta{'\n'}correcta o incorrecta </Text>
              </VStack>
              {
                quizeType.map((data, index) =>
                    <TouchableOpacity style = {{ width : '83.3%', height : 141 }}
                        onPress = {() => setSelectionType(index + 1)}
                    >
                        <Box w={'full'} h = {'full'} bg = { selectionType == 0 || selectionType == (index + 1) ? 'purple.50:alpha.80' : 'gray.200:alpha.25'} borderRadius = {'2xl'} shadow = {'1'}>
                            <HStack h={'full'} space={'5'} alignItems = {'center'} ml = {'4'}>
                                <Image source={require('../../../assets/img/quiz_img.png')} alt = {'quiz_img'} />
                                <VStack space={'1.5'} justifyContent={'center'}>
                                    <Text fontSize={'xl'} lineHeight = {'xl'} fontWeight = {'semibold'} color = {'white'} >{ data.rate }</Text>
                                    <HStack space={'2.5'} alignItems={'center'}>
                                        <Image source={require('../../../assets/img/icon_check.png')} alt = {'sucess'} />
                                        <Text fontSize={'sm'} lineHeight = {'2xs'} fontWeight = {'normal'} color = {'white'}>{ data.success }</Text>
                                    </HStack>
                                    <HStack space={'2.5'} alignItems={'center'}>
                                        <Image source={require('../../../assets/img/icon_cancel.png')} alt = {'failure'} />
                                        <Text fontSize={'sm'} lineHeight = {'2xs'} fontWeight = {'normal'} color = {'white'}>{ data.failure }</Text>
                                    </HStack>
                                </VStack>
                            </HStack>
                        </Box>
                    </TouchableOpacity>
                )
              }
              {
                selectionType ? 
                    <VStack w={'5/6'} space = {'3'} mt = {'3'}>
                        <Text fontSize={'md'} lineHeight = {'xs'} fontWeight = {'medium'} color = {'purple.50'} textAlign = {'center'}>Selecciona un oponente</Text>
                        <HStack justifyContent={'space-between'} alignItems = {'center'}>
                            <Button w={'2/5'} h = {'9'} bg = {'purple.50'} justifyContent = {'center'} onPress = { () => {
                              setRateAction(selectionType-1);
                              navigation.navigate('ManualGameScreen')
                            }}>
                                <Text fontSize={'sm'} lineHeight = {'2xs'} fontWeight = {'semibold'} color = {'white'}>Manual</Text>
                            </Button>
                            <Button w={'2/5'} h = {'9'} bg = {'purple.50'} justifyContent = {'center'} onPress = { () => {
                              setRateAction(selectionType-1);
                              navigation.navigate('RandomGameScreen');
                            }}>
                                <Text fontSize={'sm'} lineHeight = {'2xs'} fontWeight = {'semibold'} color = {'white'}>Azar</Text>
                            </Button>
                        </HStack>
                    </VStack>
                    : <></>
              }
            </VStack>
          </ImageBackground>
        </Box>
      </Box>
    
  );
}
 