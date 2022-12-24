import React, { useState, useEffect } from "react";
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

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
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

export default function DataThirdScreen({navigation}) {

  const [region, setRegion] = useState('');
  const [submitLoading, setSubmitLoading] = useState(0);

  const profile = useSelector((store) => store.profile.profile);

  const submit = () => {
      create_profile(profile, region);
  }

  const create_profile = (profile, region) => {
    setSubmitLoading(1);
    var data = JSON.stringify({
      "email": profile.email,
      "branch": profile.branch,
      "country": profile.country,
      "department": profile.department,
      "firstName": profile.firstName,
      "lastName": profile.lastName,
      "ruth": profile.ruth,
      "region": region
    });
    
    
    var config = {
      method: 'post',
      url: BASE_URL + '/api/auth/create_profile',
      crossdomain: true,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setSubmitLoading(0);
      navigation.navigate('LoginScreen');
    })
    .catch(function (error) {
      setSubmitLoading(0);
      console.log(error);
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
              <VStack h={'full'} my = {'5'} mx = {'10'} space = {'1'}>
                <VStack h = {'1/3'} space = {'5'}>
                    <Box>
                        <Text textAlign={ 'center' } fontSize = {'2xl'} fontWeight = {'semibold'} color = {'purple.50'}>Sobre ti</Text>
                        <Text textAlign={'center'} fontSize = {'md'} fontWeight = {'normal'} color = {'purple.100'}>Ya te queda muy poco para poder jugar</Text>
                    </Box>
                    <FormControl>
                        <Text fontSize={'md'} lineHeight = {'lg'} fontWeight = {'semibold'} color = {'black.50'}>¿ En que Región vives?</Text>
                        <Input type="text" defaultValue={region} onChangeText={newText => setRegion(newText)} h={'9'}  variant="filled" _light={{ bg: "coolGray.100", _hover: { bg: "white" }, _focus: { bg: "white" } }} placeholder="Ingresa tu región" />
                    </FormControl>
                </VStack>
                <Button mt={'1'} borderRadius = {'md'} h={12} isDisabled = {!region} bg = {'purple.50'} color = {'white'} onPress = {() => {
                  submit();
                  //navigation.navigate('LoginScreen');
                }} >
                  {
                    !submitLoading ?
                      "Continuar"
                    :
                      <Spinner accessibilityLabel="Loading posts" size="lg" />
                  }
                </Button>
                <Button w={'full'} mt="5" borderRadius = {'md'} borderColor = {'#898A8D'} borderWidth = {'1px'} bg = {'#FFFFFF'} 
                  onPress={() => {navigation.navigate('DataFirstScreen');}}
                >
                    <Text color={'#BDBDBD'}>Volver</Text>
                </Button>
              </VStack>
            </Box>
          </Box>
        </VStack>
      </ImageBackground>
    </SafeAreaView>    
  );
}