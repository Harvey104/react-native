import React, { useState, useCallback, useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";
import {
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
  Modal,
  ScrollView
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from 'react-native-snap-carousel';

import { useNavigation } from "@react-navigation/native";

import axios from 'axios';

import { setCompetition } from '../../redux/actions/competitionAction';
import { useSelector, useDispatch } from 'react-redux';

import { BASE_URL } from '../../config';

const challenges = {
  active : "Activos",
  finished : "Finalizados",
  toStart : "Por Comenzar"
}


export default function HomeScreen() {
  let challengeActive = [];
  let challengeFinished = [];
  let challengeToStart = [];
  
  const navigation = useNavigation();

  const [selected, setSelected] = useState(1);
  const [tabMode, setTabMode] = useState('team');

  const [showType, setShowType] = useState(false);
  const [showFinished, setShowFinished] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState(challengeActive);
  const [challengeType, setChallengType] = useState(challenges.active);
  const [ranking, setRanking] = useState([]);
  const ref = useRef(null);

  const action = (type) =>{
    if(type === 2){
      setShowFinished(!showFinished);
    }
    else{
      console.log('');
    }
  }

  const dispatch = useDispatch();

  const auth = useSelector((store) => store.auth.auth);

  const getCompetition = () => {
    var config = {
      method: 'get',
      url: BASE_URL + '/api/game/competition/list',
      //crossdomain: true,
      headers: { 
        'x-access-token': auth.accessToken
      }
    };

    axios(config)
      .then(function (response) {
        response.data.competitions.map((competition, index) => {
          if (new Date(competition.startDate) <= new Date() && new Date(competition.endDate) >= new Date()) {
            challengeActive.push({
              id: competition.id,
              clientId: competition.clientId,
              topicId: competition.topicId,
              competitionName: competition.competitionName,
              teamNumber: competition.teamNumber,
              title: competition.competitionName,
              state: 1,
              notification : 'Finaliza'+ ': ' + competition.endDate,
              color: {
                first : '#A442F7',
                second : '#4395E1'
              }
            })
          }
          if (new Date(competition.endDate) < new Date()) {
            challengeFinished.push({
              id: competition.id,
              clientId: competition.clientId,
              topicId: competition.topicId,
              competitionName: competition.competitionName,
              title: competition.competitionName,
              state: 2,
              notification : 'Finalizado' + ': ' + competition.endDate,
              color: {
                first : '#A442F7',
                second : '#4395E1'
              }
            })
          }
          if (new Date(competition.startDate) > new Date()) {
            challengeToStart.push({
              id: competition.id,
              clientId: competition.clientId,
              topicId: competition.topicId,
              competitionName: competition.competitionName,
              title: competition.competitionName,
              state: 3,
              notification : 'Pro comenzar' + ': ' + competition.endDate,
              color: {
                first : '#A442F7',
                second : '#4395E1'
              }
            })
          }
        })
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const initialGame = (competition) => {
    dispatch(setCompetition(competition));
    navigation.navigate("EnterScreen")
  }

  const makeRankingForm = (data) => {
    let rankData = []
    data.map((item, index) => {
      let cupUrl = ''
      let bg = 'purple.50:alpha.20'
      let color = 'purple.50'
      if (index == 0) {
        cupUrl = require('../../../assets/img/gold_cup.png')
        bg = 'purple.50:alpha.80'
        color = 'white'
      }
      if (index == 1) 
        cupUrl = require('../../../assets/img/silver_cup.png')
      
      if (index == 2) 
        cupUrl = require('../../../assets/img/copper_cup.png')

      let teamName = ''
      let score = ''
      if (tabMode == 'team') {
        teamName = item.competition.competitionName + " " + item.teamName
        score = item.score
      } else {
        teamName = item.firstName + " " + item.lastName
        score = item.score
      }

      rankData.push({
        teamname: teamName,
        score: score,
        cup_url: cupUrl,
        bg: bg,
        color: color
      })
    })
    
    return rankData
  }

  const getRankingData = () => {
    let url = BASE_URL + '/api/game/team_ranking';
    if (tabMode == 'personal') 
      url = BASE_URL + '/api/game/player_ranking';

    var config = {
      method: 'get',
      url: url,
      crossdomain: true,
      headers: { 
        'x-access-token': auth.accessToken
      }
    };

    axios(config)
      .then(function (res) {
        const resData = res.data.list
        setRanking(makeRankingForm(resData))
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  useEffect(() => {
    if(!challengeActive.length && !challengeFinished.length && !challengeToStart.length){
      getCompetition();
    }
    if (!ranking.length) 
      getRankingData()
  });

  useEffect(() => {
    setRanking([])
  }, [tabMode]);

  const renderItem = useCallback(({ item, index }) => (
    <Box bg={'gray.50'} h = {'48'} w = {'full'} marginY = {'1'} shadow = {'4'} borderRadius = {'lg'}>
      <TouchableOpacity
        onPress={() =>{
          item.state === 1 ? initialGame(item) : action(item.state)
          console.log(item.state)
        }}
      >
        <VStack>
          <Box w={'full'} h = {'4/5'} borderTopRadius = {'lg'} bg={{
            linearGradient: {
              colors: [item.color.first, item.color.second],
              location: [0.1, 0.1],
              start: [0, 1],
              end: [1, 1],
            },
          }}>
            <HStack justifyContent={'space-between'} margin = {'5'}>
              <VStack space={'3'}>
                <Text fontSize={'lg'} lineHeight = {'xl'} fontWeight = {'semibold'} color = {'white'}>{ item.title }</Text>
                <Box>
                  <Text fontSize={'md'} lineHeight = {'xs'} fontWeight = {'semibold'} color = {'white'}>Equipo Operaciones</Text>
                  <Text fontSize={'sm'} lineHeight = {'xs'} fontWeight = {'normal'} color = {'white'}>Puntaje: 16.000</Text>
                  <Text fontSize={'xs'} lineHeight = {'xs'} fontWeight = {'normal'} color = {'white'}>Puesto de equipo: 1</Text>
                </Box>
              </VStack>
              <HStack>
                <Image source={require('../../../assets/img/star.png')} alt = 'star' />
                <Text fontWeight = {'extrabold'} color = {'white'}>1</Text>
              </HStack>
            </HStack>
          </Box>
          <Box w={'full'} h = {'1/5'} borderBottomRadius = {'lg'} bg = {'gray.50'} justifyContent = {'center'} alignItems = {'flex-end'}>
            <Text marginRight={'5'} fontSize={'xs'} lineHeight = {'2xl'} fontWeight = {'semibold'} color = {'purple.50'}>{ item.notification }</Text>
          </Box>
        </VStack>
      </TouchableOpacity>
    </Box>
  ), []);

  return(
      <Box flex={1} bg={'gray.50'} safeAreaTop width="100%" alignSelf="center">
        <Modal isOpen={showType} onClose={() => setShowType(false)} size="lg">
          <Modal.Content w={'5/6'}>
              <Modal.Header borderBottomWidth={'0px'}>
                  <Modal.CloseButton />
              </Modal.Header>
              <Modal.Body>
                  <VStack space={8} mx = {'5'}>
                      <VStack justifyContent={'center'} alignItems = {'center'}>
                          <Image source={require('../../../assets/img/diamond.png')} alt = {'diamond'} />
                          <Text fontSize={'lg'} lineHeight = {'xl'} fontWeight = {'semibold'} color = {'purple.50'}>¿Qué Desafíos quieres ver?</Text>
                      </VStack>
                      <Button size={"md"} variant = { challengeType === challenges.active ? 'solid' : 'outline' } borderColor = {'purple.50'} borderRadius = {'md'}
                        onPress = {() => {
                          setChallengType(challenges.active);
                          setCarouselItems(challengeActive);
                          setShowType(false);
                        }}
                      >
                        <Text fontSize={'lg'} lineHeight = {'xl'} fontWeight = {'normal'} color = { challengeType === challenges.active ? 'white' : 'purple.50' }>Activos</Text>
                      </Button>
                      <Button size={"md"} variant = { challengeType === challenges.finished ? 'solid' : 'outline' } borderColor = {'purple.50'} borderRadius = {'md'}
                        onPress = {() => {
                          setChallengType(challenges.finished);
                          setCarouselItems(challengeFinished);
                          setShowType(false);
                        }}
                      >
                        <Text fontSize={'lg'} lineHeight = {'xl'} fontWeight = {'normal'} color = { challengeType === challenges.finished ? 'white' : 'purple.50' }>Finalizados</Text>
                      </Button>
                      <Button size={"md"} variant = { challengeType === challenges.toStart ? 'solid' : 'outline' } borderColor = {'purple.50'} borderRadius = {'md'}
                        onPress = {() => {
                          setChallengType(challenges.toStart);
                          setCarouselItems(challengeToStart);
                          setShowType(false);
                        }}
                      >
                        <Text fontSize={'lg'} lineHeight = {'xl'} fontWeight = {'normal'} color = { challengeType === challenges.toStart ? 'white' : 'purple.50' }>Por Comenzar</Text>
                      </Button>
                  </VStack>
              </Modal.Body>
          </Modal.Content>
        </Modal>
        <Modal isOpen={showFinished} onClose={() => setShowFinished(false)} size="lg">
          <Modal.Content w={'5/6'} h = {'3/5'}>
              <Modal.Header borderBottomWidth={'0px'}>
                  <Modal.CloseButton />
              </Modal.Header>
              <Modal.Body>
              <VStack space={8} mx = {'5'}>
                      <VStack justifyContent={'center'} alignItems = {'center'}>
                          <Image mb={'5'} source={require('../../../assets/img/diamond.png')} alt = {'diamond'} />
                          <Text fontSize={'lg'} lineHeight = {'xl'} fontWeight = {'semibold'} color = {'purple.50'}>Respuestas de tu desafío</Text>
                      </VStack>
                      <VStack>
                        <Text>Pregunta 1:</Text>
                        <Text>¿Qué es el...?</Text>
                        <Text>Respuesta: Correcta.</Text>
                      </VStack>
                      <VStack>
                        <Text>Pregunta 2:</Text>
                        <Text>¿Qué es el...?</Text>
                        <Text>Respuesta: Correcta.</Text>
                      </VStack>
                  </VStack>
              </Modal.Body>
          </Modal.Content>
        </Modal>
        <Box flex={1} h={'full'}>
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
              <Image source={require('../../../assets/img/charactor_logo.png')} alt = "logo" />
            </Center>
            <Box w={'1/6'}>
              <TouchableOpacity onPress={() => navigation.openDrawer()} style = {{flex: 1, justifyContent: 'center', alignItems: 'flex-end', margin: 20}}>
                <Image source={require('../../../assets/img/menu_icon.png')} alt = "menu_icon" />
              </TouchableOpacity>
            </Box>
          </HStack>
          <VStack space={'3'}>
            <Box bg={'white'} w = {'3/5'} h = {'12'} mx = {'10'} mt = {'4'} borderRadius = {'3'} justifyContent = {'center'} shadow = {'2'}>
              <TouchableOpacity
                onPress={() => {
                  setShowType(!showType);
                  
                }}
              >
                <HStack alignItems = {'center'} justifyContent = {'space-between'} mx = {'3'}>
                    <Text color={'purple.50'} fontSize = {'lg'} lineHeight = {'xl'}>{'Desafíos ' + challengeType}</Text>
                    <Icon mb="1" as={<MaterialCommunityIcons name={'chevron-down'} />} color={'purple.50'} size="md" />
                </HStack>
              </TouchableOpacity>
            </Box>
            <Box >
              <SafeAreaView>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Carousel
                    layout="default"
                    ref={ref}
                    data={carouselItems}
                    sliderWidth={ Dimensions.get('screen').width }
                    itemWidth={ Dimensions.get('screen').width - 80 }
                    renderItem={renderItem}
                    onSnapToItem={(index) => setActiveIndex(index)}
                  />
                </View>
              </SafeAreaView>
            </Box>
            <Box>
              <VStack space={'1'}>
                <Text  ml={'10'} fontSize = {'xl'} lineHeight = {'sm'} fontWeight={'semibold'} color={'purple.50'}>Ranking</Text>
                <Box alignItems={'center'}>
                  <HStack h = {'10'} w = {'5/6'} justifyContent = {'center'} alignItems = {'center'} bg = {'purple.50:alpha.10'} borderRadius = {'lg'} >
                    {
                      tabMode == 'team' ? 
                        <>
                          <Text 
                            w={'1/2'} 
                            textAlign = {'center'} 
                            fontSize = {'sm'} 
                            lineHeight = {'2xs'} 
                            fontWeight = {'semibold'} 
                            color = {'gray.100'} 
                            onPress = {() => setTabMode("personal")}
                          >Personal</Text>
                          <Box w={'1/2'} h = {'5/6'} justifyContent = {'center'} alignItems = {'center'} bg = {'white'} borderRadius = {'md'} shadow = {'3'}>
                            <Text textAlign={'center'} fontSize = {'sm'} lineHeight = {'2xs'} fontWeight = {'semibold'} color = {'purple.50'}>Equipo</Text>
                          </Box>
                        </>
                        :
                        <>
                          <Box w={'1/2'} h = {'5/6'} justifyContent = {'center'} alignItems = {'center'} bg = {'white'} borderRadius = {'md'} shadow = {'3'}>
                            <Text textAlign={'center'} fontSize = {'sm'} lineHeight = {'2xs'} fontWeight = {'semibold'} color = {'purple.50'}>Personal</Text>
                          </Box>
                          <Text 
                            w={'1/2'} 
                            textAlign = {'center'} 
                            fontSize = {'sm'} 
                            lineHeight = {'2xs'} 
                            fontWeight = {'semibold'} 
                            color = {'gray.100'} 
                            onPress = {() => setTabMode("team")}
                          >Equipo</Text>
                        </>
                    }
                  </HStack>
                </Box>
              </VStack>
            </Box>
            <VStack>
              <ScrollView h={'2/5'}>
                <VStack space={'3'} justifyContent={'center'} alignItems = {'center'}>
                  {
                    ranking.map((post, index) =>  
                      <HStack w = {'5/6'} h = {'16'} bg = { post.bg } justifyContent = {'space-between'} alignItems = {'center'} borderRadius = {'2xl'}>
                        <HStack w={'1/6'} alignItems = {'center'} ml = {'5'}>
                          <Text color={ post.color }>{ index + 1 }</Text>
                          <Image source={post.cup_url} alt = 'cup' />
                        </HStack>
                        <Text w={'3/6'} textAlign = {'center'} color={ post.color }>{ post.teamname }</Text>
                        <Text w={'2/6'} textAlign = {'center'} color={ post.color }>{ post.score }</Text>
                      </HStack>
                    )
                  }
                </VStack>
              </ScrollView>
            </VStack>
          </VStack>
        </Box>
      </Box>
  );
}
