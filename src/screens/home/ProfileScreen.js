import React, { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
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
  Center,
  WarningOutlineIcon,
  ScrollView,
  useTypeahead,
  Spinner,
} from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";

import { login } from '../../redux/actions/authAction';
import { BASE_URL } from "../../config";

const rankingData = [
  {
    teamname : 'E. Operaciones',
    score : '16.000',
    cup_url : require('../../../assets/img/gold_cup.png'),
    bg : 'purple.50:alpha.80',
    color: 'white'
  },
  {
    teamname : 'Nombre equipo',
    score : '10.000',
    cup_url : require('../../../assets/img/silver_cup.png'),
    bg : 'purple.50:alpha.20',
    color: 'purple.50'
  },
  {
    teamname : 'Nombre equipo',
    score : '9.000',
    cup_url : require('../../../assets/img/copper_cup.png'),
    bg : 'purple.50:alpha.20',
    color: 'purple.50'
  },
]


export default function ProfileScreen({navigation}) {
  const auth = useSelector((store) => store.auth.auth);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [ruth, setRuth] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoadingState] = useState(0);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log(auth)
  // })
  const submit = () => {
    setLoadingState(1);
    var config = {
      method: 'post',
      url: BASE_URL + '/api/auth/updateprofile',
      crossdomain: true,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : {
        id: auth.id,
        firstName: name,
        lastName: surname,
        ruth: ruth,
        department: department
      }
    };

    axios(config)
    .then(function (response) {
      if (response.data.message == 'success') {
        let authInfo = auth;
        authInfo.username = name + " " + surname;
        dispatch(login(authInfo));
      }
      setLoadingState(0);
      setEdit(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoadingState(0);
    });
  }

  // dispatch(branchProfile({branch: groupValue}));

  return (
    <SafeAreaView>
        <VStack h={'full'}>
          <VStack h={'1/2'}>
            <ImageBackground source={require('../../../assets/img/profile_hbg.png')} resizeMode = {'stretch'} style = {{flex: 1, width : '100%', height: '70%' }} >
                <HStack h={'24'} w = {'full'} justifyContent = {'center'} alignItems = {'center'}>
                    <Box w={'1/6'}></Box>
                    <Center w={'4/6'} justifyContent = {'center'} alignItems = {'center'}>
                        <Text fontSize={'2xl'} lineHeight = {'2xl'} fontWeight = {'semibold'} color = {'yellow.50'}>Perfil</Text>
                    </Center>
                    <Box w={'1/6'}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()} style = {{flex: 1, justifyContent: 'center', alignItems: 'flex-end', margin: 20}}>
                        <Image source={require('../../../assets/img/menu_icon.png')} alt = "menu_icon" />
                        </TouchableOpacity>
                    </Box>
                </HStack>
                <Box justifyContent={'center'} alignItems = {'center'}>
                  <Box w={'5/6'} h = {'275px'} bg = {'white'} borderRadius = {'lg'} mt = {'5'} shadow = {'6'}>
                    <VStack mt={'5'}>
                      <HStack justifyContent={'center'} alignItems = {'flex-end'}>
                        <Image source={require('../../../assets/img/profile_avatar.png')} alt = 'p_avatar' />
                        <Image ml={'-10'} source={require('../../../assets/img/camera.png')} />
                      </HStack>
                      <VStack justifyContent={'center'} alignItems = {'center'}>
                        <HStack space={'2'} justifyContent={'center'} alignItems = {'center'}>
                          <Text textAlign={'center'} fontSize={'2xl'} lineHeight = {'xl'} fontWeight = {'semibold'} color = {'purple.50'} >{auth.username}</Text>
                          <TouchableOpacity
                            onPress={() => 
                              setEdit(!edit)
                            }
                          >
                            <Image source={require('../../../assets/img/edit_icon.png')} />
                          </TouchableOpacity>
                        </HStack>
                        <Text fontSize={'sm'} lineHeight = {'2xs'} fontWeight = {'normal'} color = {'purple.50'}>Recursos Humanos</Text>
                      </VStack>
                      <HStack space={'9'} justifyContent={'center'} alignItems = {'center'}>
                        <VStack justifyContent={'center'} alignItems = {'center'}>
                          <Image w={'10'} h = {'10'} source={require('../../../assets/img/star_gold.png')} />
                          <Text textAlign={'center'} fontSize = {'xs'} lineHeight = {'2xs'} fontWeight = {'normal'} color = {'purple.50'}>4 ganadas</Text>
                        </VStack>
                        <VStack justifyContent={'center'} alignItems = {'center'}>
                          <Image w={'10'} h = {'10'} source={require('../../../assets/img/star_silver.png')} />
                          <Text textAlign={'center'} fontSize = {'xs'} lineHeight = {'2xs'} fontWeight = {'normal'} color = {'purple.50'}>4 ganadas</Text>
                        </VStack>
                        <VStack justifyContent={'center'} alignItems = {'center'}>
                          <Image w={'10'} h = {'10'} source={require('../../../assets/img/star_copper.png')} />
                          <Text textAlign={'center'} fontSize = {'xs'} lineHeight = {'2xs'} fontWeight = {'normal'} color = {'purple.50'}>4 ganadas</Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  </Box>
                </Box>
            </ImageBackground>
          </VStack>
          <Box h={'1/2'} w = {'full'} mx = {'10'} my = {'7'}>
            {
              !edit?
                <VStack w={'5/6'} space = {'3'} justifyContent = {'center'}>
                  <Text fontSize={'xl'} lineHeight = {'xl'} fontWeight = {'semibold'} color = {'purple.50'}>Resumen de lugares</Text>
                  <VStack space={'1'} justifyContent={'center'} alignItems = {'center'}>
                    {
                      rankingData.map((post, index) =>  
                        <HStack w = {'full'} h = {'16'} bg = { post.bg } justifyContent = {'space-between'} alignItems = {'center'} borderRadius = {'2xl'}>
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
                </VStack>
                :<VStack w={'5/6'} space = {'1'} justifyContent = {'center'}>
                  <Box h={'8'}>
                    <Text fontSize={'xl'} lineHeight = {'xl'} fontWeight = {'semibold'} color = {'purple.50'}>Modifica tus datos</Text>
                  </Box>
                  <ScrollView h={'4/6'}>
                    <VStack space={'2'} h = {'full'}>
                        <FormControl isRequired>
                            <FormControl.Label _text={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: 'black.50' }}>Nombre</FormControl.Label>
                            <Input type="text" defaultValue={name} onChangeText={newText => setName(newText)} h={'9'}  variant="outline" _light={{ bg: "coolGray.100", _hover: { bg: "white" }, _focus: { bg: "white" } }} placeholder="Ingrese su nombre" />
                        </FormControl>
                        <FormControl isRequired>
                            <FormControl.Label _text={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: 'black.50' }}>Apellido</FormControl.Label>
                            <Input type="text" defaultValue={surname} onChangeText={newText => setSurname(newText)} h={'9'}  variant="outline" _light={{ bg: "coolGray.100", _hover: { bg: "white" }, _focus: { bg: "white" } }} placeholder="Ingrese su apellido" />
                        </FormControl>
                        <FormControl isRequired>
                            <FormControl.Label _text={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: 'black.50' }}>Rut</FormControl.Label>
                            <Input type="text" defaultValue={ruth} onChangeText={newText => setRuth(newText)} h={'9'}  variant="outline" _light={{ bg: "coolGray.100", _hover: { bg: "white" }, _focus: { bg: "white" } }} placeholder="Ingrese su Rut sin puntos ni guión" />
                        </FormControl>
                        <FormControl isInvalid>
                            <HStack space={'2'} alignItems = {'center'}>
                                <FormControl.Label _text={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: 'black.50' }}>Departamento</FormControl.Label>
                                <WarningOutlineIcon size="xs" />
                            </HStack>
                            <Input type="text" defaultValue={department} onChangeText={newText => setDepartment(newText)} h={'9'}  variant="outline" _light={{ bg: "coolGray.100", _hover: { bg: "white" }, _focus: { bg: "white" } }} placeholder="Ingrese su departamento" />
                        </FormControl>
                    </VStack>
                  </ScrollView>
                  <Box h={'12'}>
                    <Button onPress={() => submit()} isDisabled = { !name || !surname || !ruth } variant={'outline'}>
                      {
                        !loading ?
                          <Text>Guardar</Text>
                        :
                          <Spinner accessibilityLabel="Loading posts" size="lg" />
                      }
                    </Button>
                  </Box>
                </VStack>
            }
          </Box>
        </VStack>
    </SafeAreaView>    
  );
}