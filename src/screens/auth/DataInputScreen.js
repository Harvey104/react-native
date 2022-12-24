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
} from "native-base";

import { useSelector, useDispatch } from 'react-redux';
import { baseProfile } from "../../redux/actions/profileAction"; 

export default function DataInputScreen({navigation}) {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [ruth, setRuth] = useState('');
    const [department, setDepartment] = useState('');

    const dispatch = useDispatch();

    const submit = () => {
        var inputData = {
            firstName: name,
            lastName: surname,
            ruth: ruth,
            department: department
        }
        dispatch(baseProfile(inputData));
    }

    return (
        <SafeAreaView>
            <ImageBackground source={require('../../../assets/img/yellow_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
            <Box h={'full'} w = {'full'} justifyContent = {'center'} alignItems = {'center'}>
                <Box w={'5/6'} h = {'5/6'} bg = {'white'} borderRadius = {'2xl'}>
                    <VStack m = {'8'}>
                        <VStack space={'3'} h = {'2/3'}>
                            <Box>
                                <Text textAlign={ 'center' } fontSize = {'2xl'} fontWeight = {'semibold'} color = {'purple.50'}>Completa tus datos</Text>
                                <Text textAlign={'center'} fontSize = {'md'} fontWeight = {'normal'} color = {'purple.100'}>Ya te queda muy poco para poder jugar</Text>
                            </Box>
                            <FormControl isRequired>
                                <FormControl.Label _text={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: 'black.50' }}>Nombre</FormControl.Label>
                                <Input type="text" defaultValue={name} onChangeText={newText => setName(newText)} h={'9'}  variant="filled" _light={{ bg: "coolGray.100", _hover: { bg: "white" }, _focus: { bg: "white" } }} placeholder="Ingrese su nombre" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label _text={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: 'black.50' }}>Apellido</FormControl.Label>
                                <Input type="text" defaultValue={surname} onChangeText={newText => setSurname(newText)} h={'9'}  variant="filled" _light={{ bg: "coolGray.100", _hover: { bg: "white" }, _focus: { bg: "white" } }} placeholder="Ingrese su apellido" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label _text={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: 'black.50' }}>Rut</FormControl.Label>
                                <Input type="text" defaultValue={ruth} onChangeText={newText => setRuth(newText)} h={'9'}  variant="filled" _light={{ bg: "coolGray.100", _hover: { bg: "white" }, _focus: { bg: "white" } }} placeholder="Ingrese su Rut sin puntos ni guión" />
                            </FormControl>
                            <FormControl isInvalid>
                                <HStack space={'2'} alignItems = {'center'}>
                                    <FormControl.Label _text={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: 'black.50' }}>Departamento</FormControl.Label>
                                    <WarningOutlineIcon size="xs" />
                                </HStack>
                                <Input type="text" defaultValue={department} onChangeText={newText => setDepartment(newText)} h={'9'}  variant="filled" _light={{ bg: "coolGray.100", _hover: { bg: "white" }, _focus: { bg: "white" } }} placeholder="Ingrese su departamento" />
                            </FormControl>
                        </VStack>
                        <Box h = {'1/3'} justifyContent = {'flex-end'} >
                            <Button w={'full'} mt="5" borderRadius = {'md'} bg = {'purple.50'} color = {'white'} onPress = {() => {
                                submit();
                                navigation.navigate('DataFirstScreen');
                            }} >
                                Continuar
                            </Button>
                            <Button w={'full'} mt="5" borderRadius = {'md'} borderColor = {'#898A8D'} borderWidth = {'1px'} bg = {'#FFFFFF'} 
                                onPress={() => {navigation.navigate('IntroSliderScreen');}}
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