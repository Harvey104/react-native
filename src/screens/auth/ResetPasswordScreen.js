import React, { useState } from "react";
import { ImageBackground, SafeAreaView, TouchableOpacity } from "react-native";
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
  Spinner
} from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import { BASE_URL } from "../../config";

export default function ResetPasswordScreen({ route, navigation }) {
  const { email } = route.params;
  const [show, setShow]= useState(false);
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [submitLoading, setSubmitLoading] = useState(0);
  
  const reset = () => {
    setSubmitLoading(1);
    var config = {
      method: 'post',
      url: BASE_URL + '/api/auth/resetPassword',
      crossdomain: true,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : {
        email: email,
        password: newPw
      }
    };

    axios(config)
    .then(function (response) {
      setSubmitLoading(0);
      if (response.data.message == 'success') {
        navigation.navigate('ResetPasswordSuccessScreen')
      }
    })
    .catch(function (error) {
      console.log(error);
      setSubmitLoading(0);
    });
  }

  return (
    <SafeAreaView>
      <ImageBackground source={require('../../../assets/img/yellow_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
        <VStack h={'full'} alignItems = {'center'}>
          <Box h={'1/5'} justifyContent = {'center'}>
            <Image source={require('../../../assets/img/multi_logo.png')} alt = 'multi_logo'/>
          </Box>
          <Box h={'4/5'} w = {'full'} justifyContent = {'flex-end'}>
            <Box h={'full'} bg={'white'} borderTopRadius = {'2xl'}>
              <VStack space = {'8'} my = {'5'} mx = {'10'}>
                <Box>
                  <Text fontSize={'2xl'} lineHeight = {'lg'} fontWeight = {'semibold'} color = {'black.50'}>Cambiar contraseña</Text>
                  <Text fontSize={'md'} lineHeight = {'sm'} fontWeight = {'normal'} color = {'#727D91'}>Ingrese sus datos para cambiar contraseña</Text>
                </Box>
                <FormControl>
                    <FormControl.Label _text={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: 'black.50' }}>Nueva contraseña</FormControl.Label>
                    <Input 
                        type={show ? "text" : "password"}
                        defaultValue = {newPw}
                        onChangeText={newText => setNewPw(newText)}
                        variant="filled"
                        _light={{ bg: "coolGray.100", _hover: { bg: "white" }, _focus: { bg: "white" } }}
                        InputRightElement={<Pressable onPress={() => setShow(!show)}><Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} mr="2" color="muted.400" /></Pressable>}
                        h = {'9'}
                        placeholder="Nueva contraseña"
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label _text={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: 'black.50' }}>Vuelve a escribir la contraseña</FormControl.Label>
                    <Input 
                        type={show ? "text" : "password"}
                        defaultValue = {confirmPw}
                        onChangeText={newText => setConfirmPw(newText)}
                        variant="filled"
                        _light={{ bg: "coolGray.100", _hover: { bg: "white" }, _focus: { bg: "white" } }}
                        InputRightElement={<Pressable onPress={() => setShow(!show)}><Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} mr="2" color="muted.400" /></Pressable>}
                        h = {'9'}
                        placeholder="Vuelve a escribir la contraseña"
                    />
                </FormControl>
                <Button mt={'1'} borderRadius = {'md'} h={12} isDisabled = { !newPw || !confirmPw || newPw != confirmPw } bg = {'purple.50'} color = {'white'} onPress = {() => {
                  reset();
                }} >
                  {
                    !submitLoading ?
                      "Cambiar contraseña"
                    :
                      <Spinner accessibilityLabel="Loading posts" size="lg" />
                  }
                </Button>
              </VStack>
            </Box>
          </Box>
        </VStack>
      </ImageBackground>
    </SafeAreaView>    
  );
}