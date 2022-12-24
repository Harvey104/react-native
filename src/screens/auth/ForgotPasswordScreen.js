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
  Button,
  useSafeArea,
  Spinner,
} from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import newOTP from 'otp-generators';
import axios from "axios";
import { BASE_URL } from "../../config";

const styles = StyleSheet.create({
  cell: {
    width: 54,
    height: 51,
    lineHeight: 40,
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#F8F8FD'
  },
  focusCell: {
    borderColor: '#000',
  },
});

const CELL_COUNT = 5;

export default function ForgotPasswordScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [show, setShow]= useState(false);
  const [pw, setPw] = useState('');
  const [submitLoading, setSubmitLoading] = useState(0);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const sendSMS = (sendData) => {
    var config = {
      method: 'post',
      url: BASE_URL + '/api/auth/sendmail',
      crossdomain: true,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : sendData
    };

    axios(config)
    .then(function (response) {
      setSubmitLoading(0);
      navigation.navigate('EmailVerifyScreen', {email: email});
    })
    .catch(function (error) {
      setSubmitLoading(0);
      navigation.navigate('EmailVerifyScreen', {email: email});
      console.log(error);
    });
  }

  const updateInvite = () => {
    setSubmitLoading(1);
    const OTP = newOTP.generate(5, { alphabets: true, upperCase: true, specialChar: false });
    const sendData = {
      toAddress: email,
      text: OTP
    };

    var config = {
      method: 'post',
      url: BASE_URL + '/api/auth/updateInvite',
      crossdomain: true,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : sendData
    };

    axios(config)
    .then(function (response) {
      sendSMS(sendData);
    })
    .catch(function (error) {
      console.log(error);
      setSubmitLoading(0);
    });
  }

  const sendEmail = () => {
    updateInvite();
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
              <VStack my = {'5'} mx = {'10'} space = {'10'}>
                <Box>
                  <Text fontSize={'2xl'} lineHeight = {'lg'} fontWeight = {'semibold'} color = {'black.50'}>Recuperar contraseña</Text>
                  <Text fontSize={'md'} lineHeight = {'sm'} fontWeight = {'normal'} color = {'#727D91'}>Ingrese sus datos para recuperar contraseña</Text>
                </Box>
                <FormControl>
                    <FormControl.Label _text={{ fontSize: "md", lineHeight: "2xl", fontWeight: "semibold", color: 'black.50' }}>Correo</FormControl.Label>
                    <Input type="text" defaultValue={email} onChangeText={newText => setEmail(newText)} h={'9'}  variant="filled" _light={{ bg: "coolGray.100", _hover: { bg: "white" }, _focus: { bg: "white" } }} placeholder="Ingresa tu región" />
                </FormControl>
                <Button mt={'1'} borderRadius = {'md'} h = {12} isDisabled = { !email } bg = {'purple.50'} color = {'white'} onPress = {() => {
                    sendEmail();
                }} >
                  {
                    !submitLoading ?
                      "Recuperar contraseña"
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