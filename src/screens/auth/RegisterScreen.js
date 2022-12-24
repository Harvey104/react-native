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
  Spinner
} from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { emailProfile } from "../../redux/actions/profileAction";

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

export default function RegisterScreen({navigation}) {

  const [email, setEmail] = useState('');
  const [show, setShow]= useState(false);
  const [pw, setPw] = useState('');

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [error, setError] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(0);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (newText) => {
    if (!isValidEmail(newText)) {
      setError('Email is invalid');
    } else {
      setError(null);
    }
    setEmail(newText)
  };

  const dispatch = useDispatch();

  const userRegister = async () => {
    setRegisterLoading(1);
    var data = JSON.stringify({
      "inviteCode": value,
      "email": email,
      "password": pw,
    });

    var config = {
      method: 'post',
      url: BASE_URL + '/api/auth/signup',
      crossdomain: true,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      dispatch(emailProfile({email: email}));
      setRegisterLoading(0);
      navigation.navigate('RegisterSuccessScreen');
    })
    .catch(function (error) {
      setRegisterLoading(0);
      console.log(error);
    });

  };



  return (
    <Box safeArea w={'full'} h={'full'} justifyContent = {'center'} alignItems = {'center'}>
      <ImageBackground source={require('../../../assets/img/yellow_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
        <VStack h={'full'} alignItems = {'center'}>
          <Box h={'1/5'} justifyContent = {'center'}>
            <Image source={require('../../../assets/img/multi_logo.png')} alt = 'multi_logo'/>
          </Box>
          <Box h={'4/5'} w = {'full'} justifyContent = {'flex-end'}>
            <Box h={'full'} bg={'white'} borderTopRadius = {'2xl'}>
              <VStack h={'full'} my = {'5'} mx = {'10'} space = {'3'}>
                <Box>
                  <Text fontSize={'2xl'} lineHeight = {'lg'} fontFamily = {'Poppins-SemiBold'} color = {'black.50'}>Registro</Text>
                  <Text fontSize={'md'} lineHeight = {'sm'} fontFamily = {'Inter-Regular'} color = {'#727D91'}>Para registrarse ingrese sus datos.</Text>
                </Box>
                <FormControl>
                    <FormControl.Label _text={{ fontSize: "md", lineHeight: "2xl", fontFamily: 'Poppins-SemiBold', color: 'black.50' }}>Correo</FormControl.Label>
                    <Input
                      type="email"
                      defaultValue={email}
                      onChangeText={newText => handleChange(newText)}
                      size = {'md'}
                      variant="filled"
                      _light={{
                        bg: "coolGray.100",
                        _hover: { bg: "white" },
                        _focus: { bg: "white" }
                      }}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      returnKeyType="next"
                      placeholder="Ingrese su correo"
                    />
                    {/* {error && <Text style={{color: 'red'}}>{error}</Text>} */}
                </FormControl>
                <FormControl>
                  <FormControl.Label _text={{ fontSize: "md", lineHeight: "2xl", fontFamily: 'Poppins-SemiBold', color: 'black.50' }}>Contraseña</FormControl.Label>
                  <Input 
                      type={show ? "text" : "password"}
                      defaultValue = {pw}
                      onChangeText={newText => setPw(newText)}
                      variant="filled"
                      _light={{ bg: "coolGray.100", _hover: { bg: "white" }, _focus: { bg: "white" } }}
                      InputRightElement={<Pressable onPress={() => setShow(!show)}><Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} mr="2" color="muted.400" /></Pressable>}
                      size = {'md'}
                      placeholder="Ingrese su clave"
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label _text={{ fontSize: "md", lineHeight: "2xl", fontFamily: 'Poppins-SemiBold', color: 'black.50' }} >Ingrese Código Empresa </FormControl.Label>
                  <CodeField
                    ref={ref}
                    {...props}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    keyboardType="text-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                      <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}
                      >
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    )}
                  />
                </FormControl>
                <Button mt={'1'} borderRadius = {'md'} h = {12} isDisabled = { !email || !pw || !value || error } bg = {'purple.50'} color = {'white'} onPress = {() => {
                  userRegister();
                  //navigation.navigate('RegisterSuccessScreen');
                }}>
                  {
                    !registerLoading ?
                      "Registrarse"
                    :
                      <Spinner accessibilityLabel="Loading posts" size="lg" />
                  }
                </Button>
              </VStack>
            </Box>
          </Box>
        </VStack>
      </ImageBackground>
    </Box>    
  );
}