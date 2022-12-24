import React, { useState, useEffect } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
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
  Progress,
  Badge
} from "native-base";
import ImageSequence from 'react-native-image-sequence-2';
import CircularProgress from 'react-native-circular-progress-indicator';

import { BASE_URL } from "../../config";


const images = [
    require('../../../assets/img/splash_win_first.png'),
    require('../../../assets/img/splash_win_second.png'),
];

import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';

import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    Keyframe
} from 'react-native-reanimated';

export default function GameScreen({navigation}) {

    const [splash, setSplash] = useState(false);
    const [endSplash, setEndSplash] = useState(1);
    const [win, setWin] = useState(false);
    const [index, setIndex] = useState(true);
    const [models, setModels] = useState([
        "firstAnswer",
        "secondAnswer",
        "thirdAnswer",
        "fourthAnswer",
    ]);
    const [totalScore, setTotalScore] = useState(0);
    const [accuracy, setAccuracy] = useState(false);
    const [hits, setHits] = useState([]);

    const shuffleArray = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
        
            // Generate random number
            var j = Math.floor(Math.random() * (i + 1));
                        
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
            
        return array;
    }

    const cccc = () => {
        setModels(shuffleArray(models));
    }

    const score = (accuracyValue, quizId) => {
        if(accuracyValue == true){
            setTotalScore(totalScore + rate.win);
            setHits([
                ...hits,
                {id: quizId, value: 1}
            ])
            //alert(totalScore);
        }
        else{
            setTotalScore(totalScore - rate.lose);
            setHits([
                ...hits,
                {id: quizId, value: 0}
            ])
        }
        setAccuracy(accuracyValue);
    }

    const centerIndex = Math.round(images.length / 2);

    const quiz = useSelector((store) => store.quiz.quiz);
    const rate = useSelector((store) => store.quiz.rate);
    

    const next = () => {
        setTimeout(() => {
            setIndex(!index);
        }, 1000);
    }

    const height = Dimensions.get('screen').height;
    const width = Dimensions.get('screen').width;

    const enteringAnimation = new Keyframe({
        0: {
          originX: width/2,
          //originY: height/2,
          zIndex : 1,
          transform: [{ rotate: '0deg' }],
          //,
          
        },
        // 1: {
        //     originX: width/2,
        //     originY: height/2,
        //     //zIndex : 0,
        //     transform: [{ rotate: '10deg' }],
        //     //,
            
        // },
        100: {
          originX: width/2,
          //originY: height/2,
          zIndex : 1,
          transform: [{ rotate: '90deg' }],
          easing: Easing.quad,
        }
        
    }).duration(2000);

    useEffect(() => {
        // console.log(quiz)
        next();
    });

    const competition = useSelector((store) => store.competition.competition.competition);
    const challenger = useSelector((store) => store.challenger.challenger);
    const auth = useSelector((store) => store.auth.auth);
    const updateId = useSelector((store) => store.challengeId.challengeId);

    const scoreSubmit = (myScore) => {
        console.log(challenger);
        var data = JSON.stringify({
            "player2": challenger.challenger,
            "competitionId": competition.id,
            "player1Score": myScore,
            "rate": rate
        });
        console.log(data);
    
        var config = {
            method: 'post',
            url: BASE_URL + '/api/game/challenger/add',
            //crossdomain: true,
            headers: {
              'Content-Type': 'application/json', 
              'x-access-token': auth.accessToken
            },
            data: data
        };
      
        axios(config)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
    }

    const scoreUpdate = (myScore) => {
        console.log(challenger);
        var data = JSON.stringify({
            "player2Score": myScore,
            "challengeId": updateId.challengeId
        });
        console.log(data);
    
        var config = {
            method: 'post',
            url: BASE_URL + '/api/game/challenge/complete',
            //crossdomain: true,
            headers: {
              'Content-Type': 'application/json', 
              'x-access-token': auth.accessToken
            },
            data: data
        };
      
        axios(config)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
    }

  return (
    <SafeAreaView>
      <ImageBackground source={require('../../../assets/img/purple_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
        {
            !splash?
            <VStack h={'full'} w = {'full'} alignItems = {'center'}>
                <Box w={'full'} h = {'20'} mb = {'4'} justifyContent = {'flex-end'}>
                    <Progress bg={'white:alpha.20'} _filledTrack={{ bg: "yellow.50" }} value={ endSplash * 20 }/>
                </Box>
                <Box w={'5/6'} h = {'1/4'} justifyContent = {'center'}>
                <VStack w={'full'} h = {'177px'} bg = {'white'} borderRadius = {'24px'} shadow = {'2'}>
                    <HStack m={'5'} justifyContent={'space-between'} alignItems = {'center'}>
                        <Text alignItems={'center'} fontSize = {'xl'} lineHeight = {'xl'} fontWeight = {'semibold'} color = {'purple.50'}>{'Pregunta ' + endSplash + ':'}</Text>
                        <Badge colorScheme={'warning'} rounded="full" variant="solid" _text={{fontSize: 14, color: '#000000' }}>
                            { endSplash + '/5' }
                        </Badge>
                    </HStack>
                    <Text textAlign={'center'} mx = {'12'} fontSize={'md'} lineHeight = {'xs'} fontWeight = {'medium'} color = {'purple.50'}>{quiz[endSplash-1].question}</Text>
                </VStack>
                </Box>
                <VStack w={'5/6'} space = {'4'} mt = {'3'}>
                {
                    models.map((model, index) =>
                        <Button
                            w={'full'}
                            h = {'16'}
                            bg = {'white'}
                            borderRadius = {'24px'}
                            justifyContent = {'center'}
                            shadow = {'2'}
                            // variant={"subtle"}
                            _pressed={{
                                bg : quiz[endSplash-1][model + 'Accuracy'] ? '#27AE60' : '#EB5757'
                            }}

                            onPress={() =>{
                                setSplash(!splash);
                                setEndSplash(endSplash + 1);
                                score(quiz[endSplash-1][model + 'Accuracy'], quiz[endSplash-1].id);
                            }}
                        >
                            <Text textAlign={'center'} fontSize = {'md'} lineHeight = {'xs'} fontWeight = {'medium'} color = {'purple.50'}>{ quiz[endSplash-1][model] }</Text>
                        </Button>
                        
                    )
                }
                </VStack>
                <Box h={'1/4'} justifyContent = {'center'}>
                <CircularProgress
                    value={0}
                    maxValue={5}
                    initialValue={5}
                    valuePrefix={'00:0'}
                    inActiveStrokeOpacity={0}
                    activeStrokeColor={'#FFB900'}
                    progressValueColor={'#FFFFFF'}
                    activeStrokeWidth={10}
                    inActiveStrokeWidth={10}
                    duration={5000}
                    onAnimationComplete={() => {
                        setSplash(!splash);
                        setEndSplash(endSplash + 1);
                    }}
                />  
                </Box>
            </VStack>:
            <>
                {
                    endSplash < quiz.length+1 ?
                    <>
                        {
                            accuracy
                            ?
                                <VStack>
                                    <Box h={'1/2'} justifyContent = {'flex-end'} alignItems = {'center'}>
                                        <ImageSequence
                                            images={images}
                                            startFrameIndex={centerIndex}
                                            framesPerSecond={1}
                                            style={{width: 238, height: 240}}
                                        />
                                    </Box>
                                    <VStack h={'1/2'} space = {'8'} alignItems = {'center'}>
                                        <VStack  alignItems = {'center'}>
                                            <Text fontSize={'32px'} lineHeight = {'3xl'} fontWeight = {'semibold'} color = {'white'}>¡Super!</Text>
                                            <Text fontSize={'md'} lineHeight = {'xs'} fontWeight = {'medium'} color = {'white'}>Vamos por la siguiente pregunta...</Text>
                                        </VStack>
                                        <Badge h={'32px'} colorScheme="success" borderRadius={'lg'} alignSelf="center" variant={"solid"} _text = {{ fontSize: 'md', lineHeight : 'xs'}}>
                                            { 'Puntaje: ' + rate.win + ' puntos'}
                                        </Badge>
                                        <Button w={'5/6'} borderRadius = {'md'} variant = {'outline'} _text = {{ color: '#FFFFFF', fontSize: 'lg', lineHeight: 'xl' }} onPress = {() => {
                                            setSplash(!splash);
                                            cccc();
                                        }}>
                                            Continuar
                                        </Button>
                                    </VStack>
                                </VStack>
                            :
                                <VStack>
                                    <Box h={'1/2'} justifyContent = {'flex-end'} alignItems = {'center'}>
                                        <Image source={require('../../../assets/img/round_uncorrect.png')} alt = {'bg'} />
                                        <Animated.Image
                                            source={require('../../../assets/img/broken_cup.png')}
                                            entering={ enteringAnimation }
                                            style = {{ position: 'absolute' }}
                                        />
                                    </Box>
                                    <VStack h={'1/2'} space = {'8'} alignItems = {'center'}>
                                        <VStack  alignItems = {'center'}>
                                            <Text fontFamily = {'Poppins-SemiBold'} fontSize={'32px'} lineHeight = {'3xl'} color = {'white'}>¡Vamos tú puedes!</Text>
                                            <Text textAlign = {'center'} fontFamily = {'Inter-Medium'} fontSize={'md'} lineHeight = {'xs'} color = {'white'}>Queda poco para terminar la ronda de{'\n'}preguntas</Text>
                                        </VStack>
                                        <Badge h={'32px'} colorScheme="success" borderRadius={'lg'} alignSelf="center" variant={"solid"} _text = {{ fontSize: 'md', lineHeight : 'xs'}}>
                                            { 'Puntaje: ' + rate.lose + ' puntos'}
                                        </Badge>
                                        <Button w={'5/6'} borderRadius = {'md'} variant = {'outline'} _text = {{ color: '#FFFFFF', fontSize: 'lg', lineHeight: 'xl' }} onPress = {() => {
                                            setSplash(!splash);
                                            cccc();
                                        }}>
                                            Continuar
                                        </Button>
                                    </VStack>
                                </VStack>
                        }
                    </>
                    :<>
                        {
                            totalScore > 0
                            ?
                                <VStack>
                                    <Box h={'1/2'} justifyContent = {'flex-end'} alignItems = {'center'}>
                                        <Image source={require('../../../assets/img/splash_win_final.png')} alt = 'final' />
                                    </Box>
                                    <VStack h={'1/2'} space = {'8'} alignItems = {'center'}>
                                        <VStack space={'3'} alignItems = {'center'}>
                                            <Text fontSize={'32px'} fontWeight = {'semibold'} color = {'white'}>Ganaste tu desafío</Text>
                                            <Badge w={'1/3'} colorScheme="success" borderRadius={'lg'} alignSelf="center" variant={"solid"} _text = {{ fontFamily: 'Inter-SemiBold', fontSize: 'xl', lineHeight : 'lg'}}>
                                                {totalScore + ' puntos'}
                                            </Badge>
                                            <Text fontSize={'md'} lineHeight = {'xs'} fontWeight = {'medium'} color = {'white'}>¡Ahora a esperar el turno de @usuario!</Text>
                                        </VStack>
                                        <Button w={'5/6'} borderRadius = {'md'} variant = {'outline'} _text = {{ color: '#FFFFFF', fontSize: 'lg', lineHeight: 'xl' }} onPress = {() => {
                                            {
                                                !updateId ?
                                                scoreSubmit(totalScore)
                                                :scoreUpdate(totalScore)
                                            }
                                            navigation.navigate('HomeScreen');
                                            navigation.getParent()?.setOptions({
                                                tabBarStyle: { display: 'flex', height: 84 },
                                            });
                                        }}>
                                            Volver al inicio
                                        </Button>
                                    </VStack>
                                </VStack>
                            :
                                <VStack>
                                    <Box h={'1/2'} justifyContent = {'flex-end'} alignItems = {'center'}>
                                        <Image source={require('../../../assets/img/splash_lost_final.png')} alt = 'final' />
                                    </Box>
                                    <VStack h={'1/2'} space = {'8'} alignItems = {'center'}>
                                        <VStack space={'3'} alignItems = {'center'}>
                                            <Text textAlign={'center'} fontFamily={'Poppins-SemiBold'} fontSize={'32px'} color = {'white'}>Terminó tu desafío</Text>
                                            <Badge w={'1/3'} colorScheme="success" borderRadius={'lg'} alignSelf="center" variant={"solid"} _text = {{ fontFamily: 'Inter-SemiBold', fontSize: 'xl', lineHeight : 'lg'}}>
                                                {totalScore + ' puntos'}
                                            </Badge>
                                            <Text textAlign={'center'} fontFamily={'Inter-Medium'} fontSize={'md'} lineHeight = {'xs'} color = {'white'}>¡Ahora a esperar el turno de{'\n'}@usuario!</Text>
                                        </VStack>
                                        <Button w={'5/6'} borderRadius = {'md'} variant = {'outline'} _text = {{ color: '#FFFFFF', fontSize: 'lg', lineHeight: 'xl' }} onPress = {() => {
                                            {
                                                !updateId ?
                                                scoreSubmit(totalScore)
                                                :scoreUpdate(totalScore)
                                            }
                                            navigation.navigate('HomeScreen');
                                            navigation.getParent()?.setOptions({
                                                tabBarStyle: { display: 'flex', height: 84 },
                                            });
                                        }}>
                                            Volver al inicio
                                        </Button>
                                    </VStack>
                                </VStack>
                        }
                    </>
                }
            </>
        }
      </ImageBackground>
    </SafeAreaView>    
  );
}