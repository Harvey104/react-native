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

import { useSelector, useDispatch } from 'react-redux';
import { setRate } from '../../redux/actions/quizAction';
import { randomQuiz } from '../../redux/actions/quizAction';
import { setChallengeId } from '../../redux/actions/challengeIdAction';
import axios from 'axios';

import { BASE_URL } from '../../config';

export default function NotificationScreen({ navigation }) {

    const [ buttonSwitch, setButtonSwitch ] = useState(true);
    const [showDetail, setShowDetail] = useState(false);
    const [receivedChallengeList, setReceivedChallengeList] = useState([]);
    const [finishedChallengeList, setFinishedChallengeList] = useState([]);
    const [callAPI, setCallAPI] = useState(false);

    const dispatch = useDispatch();

    const auth = useSelector((store) => store.auth.auth);

    const wholeList = async (callAPI) => {
        
        var config = {
            method: 'get',
            url: BASE_URL + '/api/game/challenge/whole_list',
            //crossdomain: true,
            headers: {
                'Content-Type': 'application/json', 
                'x-access-token': auth.accessToken
            },
        };
        
        axios(config)
            .then(function (response) {
                setReceivedChallengeList(response.data.receivedChallengeList);
                setFinishedChallengeList(response.data.finishedChallengeList);
                setCallAPI(!callAPI);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const getFiveQuizList = async (topicId) => {
        var data = JSON.stringify({
            "topicId": topicId
        });

        var config = {
            method: 'post',
            url: BASE_URL + '/api/game/user_quiz/list',
            //crossdomain: true,
            headers: {
                'Content-Type': 'application/json', 
                'x-access-token': auth.accessToken
            },
            data: data
        };
        
        axios(config)
            .then(function (response) {
                dispatch(randomQuiz(response.data.list));
                //console.log(response.data.list)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const initialGame = (challenge) => {
        dispatch(setRate(challenge.rate));
        dispatch(setChallengeId(challenge.challengeId));
        getFiveQuizList(challenge.topicId);
        console.log(challenge);
    }

    useEffect(() => {
        if(!callAPI){
            wholeList(callAPI);
        }
    });

  return(
      <Box flex={1} bg={'gray.50'} safeAreaTop width="100%" alignSelf="center">

        <Modal isOpen={showDetail} onClose={() => setShowDetail(false)} size="lg">
            <Modal.Content w={'5/6'}>
                <Modal.Header borderBottomWidth={'0px'}>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <VStack space={8} mx = {'5'}>
                        <VStack justifyContent={'center'} alignItems = {'center'} borderBottomWidth = {'1px'} borderBottomColor = {'#C4C4C4'}>
                            <Image source={require('../../../assets/img/gold_star.png')} alt = {'star'} />
                            <Text fontSize={'xl'} lineHeight = {'xl'} fontWeight = {'semibold'} color = {'gray.300'}>¡ VICTORIA !</Text>
                            <Text fontSize={'xs'} lineHeight = {'2xs'} fontWeight = {'normal'} color = {'gray.300'} mb = {'5'}>Desafío Doble Finalizado</Text>
                        </VStack>
                        <HStack justifyContent="space-between" alignItems={'center'} borderBottomWidth = {'1px'} borderBottomColor = {'#C4C4C4'}>
                            <Box justifyContent={'flex-start'} alignItems = {'flex-start'} mb = {'4'}>
                                <Text fontSize={'xs'} lineHeight = {'2xs'} fontWeight={'normal'} color = {'gray.300'}>Tú Posición:</Text>
                            </Box>
                            <Text fontSize={'md'} lineHeight = {'xs'} fontWeight = {'semibold'} color = {'gray.300'}>1° Lugar</Text>
                        </HStack>
                        <HStack justifyContent="space-between" alignItems={'center'} borderBottomWidth = {'1px'} borderBottomColor = {'#C4C4C4'}>
                            <Box justifyContent={'flex-start'} alignItems = {'flex-start'} mb = {'4'}>
                                <Text fontSize={'xs'} lineHeight = {'2xs'} fontWeight={'normal'} color = {'gray.300'}>Rival: </Text>
                            </Box>
                            <Text fontSize={'md'} lineHeight = {'xs'} fontWeight = {'semibold'} color = {'gray.300'}>Mauricio Rodríguez</Text>
                        </HStack>
                        <HStack justifyContent="space-between" alignItems={'center'} borderBottomWidth = {'1px'} borderBottomColor = {'#C4C4C4'}>
                            <Box justifyContent={'flex-start'} alignItems = {'flex-start'} mb = {'4'}>
                                <Text fontSize={'xs'} lineHeight = {'2xs'} fontWeight={'normal'} color = {'gray.300'}>Tú Puntaje:</Text>
                            </Box>
                            <Text fontSize={'md'} lineHeight = {'xs'} fontWeight = {'semibold'} color = {'gray.300'}>850 puntos</Text>
                        </HStack>
                        <Button w={'full'} mt="5" borderRadius = {'md'} borderColor = {'#898A8D'} borderWidth = {'1px'} bg = {'#FFFFFF'} onPress={() => setShowDetail(false)} >
                            <Text color={'#BDBDBD'}>Volver</Text>
                        </Button>
                    </VStack>
                </Modal.Body>
            </Modal.Content>
        </Modal>

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
              <Text fontSize={'2xl'} lineHeight = {'3xl'} fontWeight = {'semibold'} color = {'yellow.50'}>Notificaciones</Text>
            </Center>
            <Box w={'1/6'}>
              <TouchableOpacity onPress={() => navigation.openDrawer()} style = {{flex: 1, justifyContent: 'center', alignItems: 'flex-end', margin: 20}}>
                <Image source={require('../../../assets/img/menu_icon.png')} alt = "menu_icon" />
              </TouchableOpacity>
            </Box>
          </HStack>
          <ImageBackground source={require('../../../assets/img/gray_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
            <VStack space={'8'} justifyContent={'center'} alignItems = {'center'} mt = {'8'}>
                <HStack space={'5'} w={'5/6'} h = {'12'} justifyContent={'center'} alignItems = {'center'} borderRadius = {'md'} bg={'purple.50:alpha.10'} >
                    <Center w={'2/5'} h = {'10'} my = {'1'} borderRadius = {'md'} borderWidth = {'0'} bg={ buttonSwitch ?  'white' : 'purple.50:alpha.10' } shadow = { buttonSwitch ? '3' : '0'}>
                        <Text fontSize={'sm'} lineHeight = {'xs'} fontWeight = {'semibold'} color = { buttonSwitch ?  'purple.50' : 'gray.100' } onPress = {
                            () => {
                                setButtonSwitch(!buttonSwitch);
                            }
                        }>Desafíos pendientes</Text>
                    </Center>
                    <Center w={'2/5'} h = {'10'} my = {'1'} borderRadius = {'md'} bg = { buttonSwitch ? 'purple.50:alpha.10' : 'white'} shadow = { buttonSwitch ? '0' : '3'} >
                        <Text fontSize={'sm'} lineHeight = {'xs'} fontWeight = {'semibold'} color = { buttonSwitch ? 'gray.100' : 'purple.50' } onPress = {
                            () => {
                                setButtonSwitch(!buttonSwitch);
                            }
                        }>Desafíos finalizados</Text>
                    </Center>
                </HStack>
                <VStack w={'5/6'} space = {'2'}>
                    {
                        buttonSwitch?
                        receivedChallengeList.map((challenge, index) =>
                            <Box bg = {'white'} borderRadius = {'md'}>
                                <HStack justifyContent = {'space-between'} m = {'3'} alignItems = {'center'}>
                                    <Image source={require('../../../assets/img/notification_img_1.png')} alt = {'challenge_img_' + index}/>
                                    <VStack justifyContent={'center'}>
                                        {
                                            challenge.rate.win == 100 ?
                                                <Text fontSize={'md'} lineHeight = {'lg'} fontWeight = {'semibold'} color={ 'gray.200' }>Desafío Simple</Text>:
                                                <>
                                                    {
                                                        challenge.rate.win == 200 ? 
                                                        <Text fontSize={'md'} lineHeight = {'lg'} fontWeight = {'semibold'} color={ 'gray.200' }>Desafío Doble</Text>:
                                                        <Text fontSize={'md'} lineHeight = {'lg'} fontWeight = {'semibold'} color={ 'gray.200' }>Desafío Triple</Text>
                                                    }
                                                </>
                                        }
                                        <Text fontSize={'xs'} lineHeight = {'2xs'} fontWeight = {'normal'} color={'gray.300'}>{ 'Rival: ' + challenge.player1_name }</Text>
                                    </VStack>
                                    <TouchableOpacity
                                        onPress={() => {
                                            initialGame(challenge);
                                            navigation.navigate('GameScreen');
                                            navigation.getParent()?.setOptions({
                                                tabBarStyle: { display: 'none'},
                                            });
                                        }}
                                    >
                                        <Center w={'16'} h = {'6'} bg = {'purple.50'} borderRadius = {'md'}>
                                        <Text fontSize={'xs'} lineHeight = {'2xs'} fontWeight = {'normal'} color = {'white'}>Aceptar</Text>
                                        </Center>
                                    </TouchableOpacity>
                                </HStack>
                            </Box>
                        )
                        :finishedChallengeList.map((challenge, index) =>
                            <Box bg = {'#FFF5F5'} borderRadius = {'md'}>
                                <HStack justifyContent = {'space-between'} m = {'3'}>
                                    <Image source={require('../../../assets/img/notification_img_1.png')} alt = {'challenge_img_' + index}/>
                                    <VStack justifyContent={'center'}>
                                        {
                                            challenge.rate.win == 100 ?
                                                <Text fontSize={'md'} lineHeight = {'lg'} fontWeight = {'semibold'} color={ 'gray.200' }>Desafío Simple</Text>:
                                                <>
                                                    {
                                                        challenge.rate.win == 200 ? 
                                                        <Text fontSize={'md'} lineHeight = {'lg'} fontWeight = {'semibold'} color={ 'gray.200' }>Desafío Doble</Text>:
                                                        <Text fontSize={'md'} lineHeight = {'lg'} fontWeight = {'semibold'} color={ 'gray.200' }>Desafío Triple</Text>
                                                    }
                                                </>
                                        }
                                        <Text fontSize={'xs'} lineHeight = {'2xs'} fontWeight = {'normal'} color={'gray.300'}>{ 'Rival: ' + challenge.player1_name }</Text>
                                    </VStack>
                                    <Box justifyContent={'flex-end'}>
                                        <TouchableOpacity onPress={() => setShowDetail(true)}>
                                            <Center w={'16'} h = {'6'} bg = {'purple.50'} borderRadius = {'md'}>
                                                <Text fontSize={'xs'} lineHeight = {'2xs'} fontWeight = {'normal'} color = {'white'}>Detalles</Text>
                                            </Center>
                                        </TouchableOpacity>
                                    </Box>
                                </HStack>
                            </Box>
                        )
                    }
                </VStack>
            </VStack>
          </ImageBackground>
        </Box>
      </Box>
    
  );
}
