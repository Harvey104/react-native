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
    Badge,
    Button,
    HStack,
    Center,
    Pressable,
    Image,
    Avatar
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useSelector, useDispatch } from 'react-redux';
import { challenger } from '../../redux/actions/challengerAction';

export default function ManualGameScreen({ navigation }) {

    const [showChallenge, setShowChallenge] = useState(false);

    const dispatch = useDispatch();

    const competitor = useSelector((store) => store.competitor.competitor.competitor);

    const confirmCompetitor = (id) => {
      console.log(id);
      dispatch(challenger(id))
      setShowChallenge(!showChallenge);
    }

    // useEffect(() => {
    //   console.log('ddddddddd', competitor);
    // });

  return(
      <Box flex={1} bg={'gray.50'} safeAreaTop width="100%" alignSelf="center">
        <Modal isOpen={showChallenge} onClose={() => setShowChallenge(false)} size="lg">
          <Modal.Content w={'5/6'}>
              <Modal.Header borderBottomWidth={'0px'}>
                  <Modal.CloseButton />
              </Modal.Header>
              <Modal.Body>
                  <VStack mx = {'5'} justifyContent = {'center'} space = {'12'}>
                    <VStack space={'5'}>
                      <Text textAlign={'center'} fontSize = {'xl'} lineHeight = {'xl'} fontWeight = {'semibold'} color = {'purple.50'}>Inicio de desafío</Text>
                      <Text textAlign={'center'} fontSize = {'md'} lineHeight = {'xs'} fontWeight = {'normal'} color = {'purple.50'}>¿Quieres iniciar un desafío con Mariana Rojas?</Text>
                    </VStack>
                    <HStack justifyContent={'center'} alignItems="center">
                      <Image source={require('../../../assets/img/profile_avatar_left.png')} m = {-1.5} alt = "menu_icon" />
                      <Badge colorScheme={'yellow'} zIndex = {5} m = {-5} variant="solid" borderRadius={'full'} _text = {{ fontSize : 14, color : 'black'}}>V/S</Badge>
                      <Image source={require('../../../assets/img/profile_avatar_right.png')} m = {-1.5} alt = "menu_icon" />
                    </HStack>
                    <HStack justifyContent={'center'} alignItems = {'center'} space = {'3'} mb = {'8'}>
                      <Button width={'1/2'} colorScheme="secondary"
                        onPress={() => setShowChallenge(false)}
                      >
                        No
                      </Button>
                      <Button width={'1/2'} colorScheme="success" onPress={() => {
                         navigation.navigate('QuizVideoScreen');
                         navigation.getParent()?.setOptions({
                             tabBarStyle: { display: 'none' },
                         });
                      }}>
                        Si
                      </Button>
                    </HStack>
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
              <Text fontSize={'2xl'} lineHeight = {'3xl'} fontWeight = {'semibold'} color = {'yellow.50'}>Sobre la aplicación</Text>
            </Center>
            <Box w={'1/6'}>
              <TouchableOpacity onPress={() => navigation.openDrawer()} style = {{flex: 1, justifyContent: 'center', alignItems: 'flex-end', margin: 20}}>
                <Image source={require('../../../assets/img/menu_icon.png')} alt = "menu_icon" />
              </TouchableOpacity>
            </Box>
          </HStack>
          <ImageBackground source={require('../../../assets/img/gray_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
            <Box w={'full'} h = {'24'} justifyContent = {'center'} alignItems = {'center'} bg = {{
              linearGradient: {
                colors: ['#26247E', '#6A67CE'],
                location: [0.1, 0.1],
                start: [0, 0],
                end: [1, 1],
              },
            }}>
              <Text fontSize={'sm'} lineHeight = {'2xs'} fontWeight = {'medium'} color = {'white'} mb = {'1.5'}>Te quedan 3 créditos para usar.</Text>
              <Box bg={'white'} borderRadius="4">
                <Input placeholder="Busca un oponente" w={'5/6'} fontSize="14" bg={'white'} InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} />
              </Box>
            </Box>
            <VStack alignItems = {'center'} space = {'3'} mt = {'3'}>
              {
                competitor.map((person, index) =>
                  <TouchableOpacity style = {{ width : '83.3%', height : 65 }}
                    onPress = {() => confirmCompetitor(person.id) }
                  >
                    <Box w={'full'} h = {'full'} bg = { 'white' } borderRadius = {'2xl'} shadow = {'1'}>
                        <HStack h={'full'} space={'5'} alignItems = {'center'} ml = {'4'}>
                          <Avatar alignSelf="center" size={'md'} source={require('../../../assets/img/avatar_Mariana.png')}>A</Avatar>
                          <Text fontSize={'md'} lineHeight = {'md'} fontWeight = {'medium'} color = {'purple.50'}>{ person.fullname }</Text>
                        </HStack>
                    </Box>
                  </TouchableOpacity>
                )
              }
              
            </VStack>
          </ImageBackground>
        </Box>
      </Box>
    
  );
}
 