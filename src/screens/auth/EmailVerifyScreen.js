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

export default function EmailVerifyScreen({route, navigation}) {
  const { email } = route.params;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [submitLoading, setSubmitLoading] = useState(0);

  const confirm = () => {
    setSubmitLoading(1);
    var config = {
      method: 'post',
      url: BASE_URL + '/api/auth/confirmInvite',
      crossdomain: true,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : {
        code: value,
        email: email
      }
    };

    axios(config)
    .then(function (response) {
      setSubmitLoading(0);
      if (response.data.message == 'success') {
        navigation.navigate('ResetPasswordScreen', {email: email})
      }
    })
    .catch(function (error) {
      console.log(error);
      setSubmitLoading(0);
    });
  }

  return (
    <SafeAreaView>
      <ImageBackground source={require('../../../assets/img/purple_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
        <Box h={'full'} w = {'full'} justifyContent = {'center'} alignItems = {'center'}>
          <Box w={'5/6'} h = {'5/6'} bg = {'white'} borderRadius = {'2xl'}>
            <VStack space={'2'} m = {'10'} justifyContent = {'center'} alignItems = {'center'}>
              <Image source={require('../../../assets/img/Beewise_Bee1.png')} alt = "beewise_bee1" />
              <FormControl>
                <CodeField
                  ref={ref}
                  {...props}
                  // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({index, symbol, isFocused}) => (
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />
              </FormControl>
              
              <Text textAlign={ 'center' } fontSize = {'2xl'} lineHeight = {'4xl'} fontWeight = {'semibold'} color = {'purple.50'}>Revisa tu email</Text>
              
              <Text textAlign={'center'} fontSize = {'md'} lineHeight = {'lg'} fontWeight = {'normal'} color = {'purple.100'}>Hemos enviado tu nueva contraseña a{'\n'}carlos.venegas@blanco.cl y anota el{'\n'}código.</Text>

              <Button w={'full'} mt="2" borderRadius = {'md'} h = {12} isDisabled = { !value } bg = {'yellow.50'} color = {'black.100'} onPress = {() => {
                confirm()
              }} >
                {
                  !submitLoading ?
                    "Siguiente"
                  :
                    <Spinner accessibilityLabel="Loading posts" size="lg" />
                }
              </Button>
            </VStack>
          </Box>
        </Box>
      </ImageBackground>
    </SafeAreaView>    
  );
}